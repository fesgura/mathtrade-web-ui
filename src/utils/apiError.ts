type FieldRule = { field: string; test: (message: string) => boolean; key: string };
type DetailRule = { test: (detail: string) => boolean; key: string };

const FIELD_RULES: FieldRule[] = [
  { field: "item_id", test: (m) => m === "Math item already cloned", key: "error.item.alreadyCloned" },
  { field: "item", test: (m) => m === "Only one new item possible", key: "error.item.draftExists" },
  {
    field: "item_id",
    test: (m) => m.startsWith("Invalid pk") && m.endsWith("object does not exist."),
    key: "error.item.notAvailable",
  },
];

const DETAIL_RULES: DetailRule[] = [
  { test: (d) => d === "No MathElement matches the given query.", key: "error.mathElement.notFound" },
  { test: (d) => d === "You do not have permission to perform this action.", key: "error.mathtrade.geekListClosed" },
];

// Typed errors: the backend sends a "code" next to the detail.
const CODE_KEYS: Record<string, string> = {
  not_member: "error.mathtrade.notMember",
};

export const resolveApiErrorCode = (error: any): string | undefined => {
  const code = error?.data?.code;
  return typeof code === "string" ? CODE_KEYS[code] : undefined;
};

export const resolveApiErrorMessage = (error: any): string | undefined => {
  const data = error?.data;
  if (!data || typeof data !== "object") return undefined;

  const codeKey = resolveApiErrorCode(error);
  if (codeKey) return codeKey;

  if (typeof data.detail === "string") {
    return DETAIL_RULES.find(({ test }) => test(data.detail))?.key || data.detail;
  }

  for (const { field, test, key } of FIELD_RULES) {
    const messages = data[field];
    if (Array.isArray(messages) && messages.some((m: unknown) => typeof m === "string" && test(m))) {
      return key;
    }
  }

  // Fallback: return the first string from any field error array
  for (const key of Object.keys(data)) {
    const messages = data[key];
    if (Array.isArray(messages) && messages.length > 0 && typeof messages[0] === "string") {
      return messages[0];
    }
  }

  return undefined;
};
