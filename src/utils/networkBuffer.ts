const BUFFER_CAP = 25;
const BODY_CAP = 2000;

export type NetworkEntry = {
  at: string;
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  requestHeaders?: string;
  requestBody?: string;
  responseBody?: string;
};

let buffer: NetworkEntry[] = [];
let initialized = false;

const SENSITIVE_KEY =
  /^(authorization|cookie|set-cookie|password|passwd|pwd|secret|token|access[_-]?token|refresh[_-]?token|api[_-]?key|apikey|auth|csrf|xsrf|recaptcha|g-recaptcha-response|client[_-]?secret|private[_-]?key|sessionid)$/i;

const push = (entry: NetworkEntry) => {
  buffer.push(entry);
  if (buffer.length > BUFFER_CAP) {
    buffer.shift();
  }
};

const resolveUrl = (input: RequestInfo | URL): string => {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.href;
  return input.url;
};

const truncate = (value: string): string => {
  if (value.length <= BODY_CAP) return value;
  return `${value.slice(0, BODY_CAP)}…[truncated ${value.length} chars]`;
};

const redactDeep = (value: unknown): unknown => {
  if (Array.isArray(value)) return value.map(redactDeep);
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = SENSITIVE_KEY.test(key) ? "[REDACTED]" : redactDeep(child);
    }
    return out;
  }
  if (typeof value === "string") {
    return value
      .replace(/Bearer\s+\S+/gi, "Bearer [REDACTED]")
      .replace(/\b(token|password|secret|api[_-]?key)=([^&\s]+)/gi, "$1=[REDACTED]");
  }
  return value;
};

const sanitizeBody = (raw: string): string => {
  const trimmed = raw.trim();
  if (!trimmed) return "";
  try {
    return truncate(JSON.stringify(redactDeep(JSON.parse(trimmed))));
  } catch {
    return truncate(String(redactDeep(trimmed)));
  }
};

const isTextualContentType = (contentType: string | null | undefined): boolean => {
  if (!contentType) return true;
  return /json|text|xml|javascript|urlencoded|graphql/i.test(contentType);
};

const serializeRequestBody = async (
  body: BodyInit | null | undefined
): Promise<string> => {
  if (body == null) return "";
  if (typeof body === "string") return sanitizeBody(body);
  if (body instanceof URLSearchParams) {
    return sanitizeBody(body.toString());
  }
  if (typeof FormData !== "undefined" && body instanceof FormData) {
    const entries: Record<string, unknown> = {};
    body.forEach((value, key) => {
      if (typeof value === "string") {
        entries[key] = SENSITIVE_KEY.test(key) ? "[REDACTED]" : value;
      } else {
        entries[key] = `[File ${value.name || "blob"} ${value.size}b]`;
      }
    });
    return truncate(JSON.stringify(redactDeep(entries)));
  }
  if (typeof Blob !== "undefined" && body instanceof Blob) {
    if (!isTextualContentType(body.type)) {
      return `[Blob ${body.type || "binary"} ${body.size}b]`;
    }
    try {
      return sanitizeBody(await body.text());
    } catch {
      return `[Blob ${body.size}b]`;
    }
  }
  if (body instanceof ArrayBuffer || ArrayBuffer.isView(body)) {
    const size =
      body instanceof ArrayBuffer ? body.byteLength : body.byteLength;
    return `[Binary ${size}b]`;
  }
  try {
    return sanitizeBody(String(body));
  } catch {
    return "[Unserializable body]";
  }
};

const readResponseBody = async (response: Response): Promise<string> => {
  const contentType = response.headers.get("content-type");
  if (!isTextualContentType(contentType)) {
    return `[${contentType || "binary"} body omitted]`;
  }
  try {
    const text = await response.clone().text();
    return sanitizeBody(text);
  } catch {
    return "[response unread]";
  }
};

const redactHeaders = (headers: Record<string, string>): string => {
  if (!Object.keys(headers).length) return "";
  const redacted: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    redacted[key] = SENSITIVE_KEY.test(key) ? "[REDACTED]" : String(redactDeep(value));
  }
  return truncate(JSON.stringify(redacted));
};

const headersFromFetch = (
  input: RequestInfo | URL,
  init?: RequestInit
): string => {
  const collected: Record<string, string> = {};
  const absorb = (headers: HeadersInit | undefined) => {
    if (!headers) return;
    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        collected[key] = value;
      });
      return;
    }
    if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        collected[key] = value;
      });
      return;
    }
    Object.entries(headers).forEach(([key, value]) => {
      collected[key] = String(value);
    });
  };
  if (input instanceof Request) absorb(input.headers);
  absorb(init?.headers);
  return redactHeaders(collected);
};

const captureFetchRequestBody = async (
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<string> => {
  if (init?.body != null) {
    return serializeRequestBody(init.body);
  }
  if (input instanceof Request) {
    try {
      return sanitizeBody(await input.clone().text());
    } catch {
      return "";
    }
  }
  return "";
};

type XhrMeta = {
  method: string;
  url: string;
  at: string;
  started: number;
  headers: Record<string, string>;
  rawBody?: Document | XMLHttpRequestBodyInit | null;
};

const serializeRequestBodySync = (
  body: Document | XMLHttpRequestBodyInit | null | undefined
): string | null => {
  if (body == null) return "";
  if (typeof body === "string") return sanitizeBody(body);
  if (body instanceof URLSearchParams) return sanitizeBody(body.toString());
  // Document / FormData / Blob need async or special handling
  return null;
};

export const initNetworkBuffer = () => {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const method = (
      init?.method ||
      (input instanceof Request ? input.method : "GET")
    ).toUpperCase();
    const url = resolveUrl(input);
    const at = new Date().toISOString();
    const started = performance.now();
    const requestBodyPromise = captureFetchRequestBody(input, init);

    try {
      const response = await originalFetch(input, init);
      const requestHeaders = headersFromFetch(input, init);
      const [requestBody, responseBody] = await Promise.all([
        requestBodyPromise,
        readResponseBody(response),
      ]);
      push({
        at,
        method,
        url,
        status: response.status,
        durationMs: Math.round(performance.now() - started),
        requestHeaders,
        requestBody,
        responseBody,
      });
      return response;
    } catch (err) {
      const requestBody = await requestBodyPromise.catch(() => "");
      push({
        at,
        method,
        url,
        status: 0,
        durationMs: Math.round(performance.now() - started),
        requestHeaders: headersFromFetch(input, init),
        requestBody,
        responseBody: "[network error]",
      });
      throw err;
    }
  };

  // apisauce/axios (useFetch) goes through XHR, not fetch.
  const xhrProto = XMLHttpRequest.prototype;
  const originalOpen = xhrProto.open;
  const originalSend = xhrProto.send;
  const originalSetRequestHeader = xhrProto.setRequestHeader;

  xhrProto.open = function (
    this: XMLHttpRequest,
    method: string,
    url: string | URL,
    ...rest: unknown[]
  ) {
    (this as XMLHttpRequest & { __bugReport?: XhrMeta }).__bugReport = {
      method: String(method).toUpperCase(),
      url: String(url),
      at: "",
      started: 0,
      headers: {},
    };
    return originalOpen.apply(
      this,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [method, url, ...(rest as any[])] as any
    );
  };

  xhrProto.setRequestHeader = function (
    this: XMLHttpRequest,
    name: string,
    value: string
  ) {
    const meta = (this as XMLHttpRequest & { __bugReport?: XhrMeta }).__bugReport;
    if (meta) {
      meta.headers[name] = value;
    }
    return originalSetRequestHeader.call(this, name, value);
  };

  xhrProto.send = function (
    this: XMLHttpRequest,
    body?: Document | XMLHttpRequestBodyInit | null
  ) {
    const meta = (this as XMLHttpRequest & { __bugReport?: XhrMeta }).__bugReport;
    if (meta) {
      meta.at = new Date().toISOString();
      meta.started = performance.now();
      meta.rawBody = body ?? null;
      this.addEventListener("loadend", () => {
        const contentType = this.getResponseHeader("content-type");
        let responseBody = "";
        if (!isTextualContentType(contentType)) {
          responseBody = `[${contentType || "binary"} body omitted]`;
        } else {
          try {
            responseBody = sanitizeBody(this.responseText || "");
          } catch {
            responseBody = "[response unread]";
          }
        }

        const finish = (requestBody: string) => {
          push({
            at: meta.at,
            method: meta.method,
            url: meta.url,
            status: this.status,
            durationMs: Math.round(performance.now() - meta.started),
            requestHeaders: redactHeaders(meta.headers),
            requestBody,
            responseBody,
          });
        };

        const syncBody = serializeRequestBodySync(meta.rawBody);
        if (syncBody !== null) {
          finish(syncBody);
          return;
        }
        if (typeof FormData !== "undefined" && meta.rawBody instanceof FormData) {
          void serializeRequestBody(meta.rawBody).then(finish);
          return;
        }
        if (typeof Blob !== "undefined" && meta.rawBody instanceof Blob) {
          void serializeRequestBody(meta.rawBody).then(finish);
          return;
        }
        finish("[Unserializable body]");
      });
    }
    return originalSend.call(this, body);
  };
};

export const getNetworkBuffer = (): NetworkEntry[] => [...buffer];

export const formatNetworkBuffer = (): string =>
  getNetworkBuffer()
    .map((entry) => {
      const status = entry.status == null ? "-" : String(entry.status);
      const duration =
        entry.durationMs == null ? "-" : `${entry.durationMs}ms`;
      const lines = [
        `[${entry.at}] ${entry.method} ${status} ${duration} ${entry.url}`,
      ];
      if (entry.requestHeaders) {
        lines.push(`  headers: ${entry.requestHeaders}`);
      }
      if (entry.requestBody) {
        lines.push(`  req: ${entry.requestBody}`);
      }
      if (entry.responseBody) {
        lines.push(`  res: ${entry.responseBody}`);
      }
      return lines.join("\n");
    })
    .join("\n");
