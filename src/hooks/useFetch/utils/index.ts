import endpoints from "../constants/endpoints";
import { api } from "../constants/api";

type ServiceParams = {
  method: string;
  pathRequest?: string;
  params?: any;
  endpoint?: string;
};

const composeEndpoint = (
  endpointName?: string,
  path?: string,
  urlParams?: any[],
  mathtradeId?: string | number
): string => {
  let url = endpoints[endpointName || ""] || path || "";
  url = url.replace("$[mathtradeId]", String(mathtradeId));

  if (urlParams && urlParams.length) {
    urlParams.forEach((p, i) => {
      url = url.replace(`$[${i + 1}]`, p);
    });
    // TODO: to use REDUCE ARRAY
  }
  return url;
};

const handlePromise = (promise: Promise<any>): Promise<any[]> =>
  promise
    .then((response: any) => {
      if (response.ok) return [null, response, response.data];
      return [{ error: true, data: response.data }, response, response.data];
    })
    .catch((error: any) => Promise.resolve([error, { ok: false }, null]));

const service = ({ method, pathRequest, params, endpoint }: ServiceParams): any => {
  const extraConfig = endpoint === "LOGIN" ? { withCredentials: true } : {};
  switch (method) {
    case "POST":
      return api.post(pathRequest || "", params, extraConfig);
    case "PUT":
      return api.put(pathRequest || "", params, extraConfig);
    case "DELETE":
      return api.delete(pathRequest || "", params, extraConfig);
    default:
      return api.get(pathRequest || "", params, extraConfig);
  }
};

type CallToAPIParams = {
  method: string;
  endpoint?: string;
  path?: string;
  urlParams?: any[];
  params?: any;
  mathtradeId?: string | number;
};

export const callToAPI = ({
  method,
  endpoint,
  path,
  urlParams,
  params,
  mathtradeId,
}: CallToAPIParams): Promise<any[]> => {
  const pathRequest = composeEndpoint(endpoint, path, urlParams, mathtradeId);
  return handlePromise(service({ method, pathRequest, params, endpoint }));
};
