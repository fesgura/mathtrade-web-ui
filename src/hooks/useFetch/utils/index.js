import endpoints from "../constants/endpoints";
import { api } from "../constants/api";

const composeEndpoint = (endpointName, path, urlParams, mathtradeId) => {
  let url = endpoints[endpointName || ""] || path || "";
  url = url.replace("$[mathtradeId]", mathtradeId);

  if (urlParams && urlParams.length) {
    urlParams.forEach((p, i) => {
      url = url.replace(`$[${i + 1}]`, p);
    });
    // TODO: to use REDUCE ARRAY
  }
  return url;
};

const handlePromise = (promise) =>
  promise
    .then((response) => {
      if (response.ok) return [null, response, response.data];
      // Keep problem/status: resolveApiErrorMessage uses them for network/
      // timeout copy instead of the generic "error.General".
      return [
        {
          error: true,
          data: response.data,
          problem: response.problem,
          status: response.status,
        },
        response,
        response.data,
      ];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

const service = ({ method, pathRequest, params }) => {
  // Default JSON Content-Type makes axios serialize FormData to JSON (files
  // become {}). Clear it so the browser sets multipart with the boundary.
  const config =
    params instanceof FormData
      ? { headers: { "Content-Type": undefined } }
      : undefined;

  switch (method) {
    case "POST":
      return api.post(pathRequest || "", params, config);
    case "PUT":
      return api.put(pathRequest || "", params, config);
    case "DELETE":
      return api.delete(pathRequest || "", params);
    default:
      return api.get(pathRequest || "", params);
  }
};

export const callToAPI = ({
  method,
  endpoint,
  path,
  urlParams,
  params,
  mathtradeId,
}) => {
  const pathRequest = composeEndpoint(endpoint, path, urlParams, mathtradeId);

  return handlePromise(service({ method, pathRequest, params }));
};

// Authenticated file download (useFetch only handles JSON). Opens the file in
// a new tab from a blob URL, since a plain link wouldn't send the auth token.
export const openAuthenticatedFile = async ({
  endpoint,
  urlParams = [],
  mathtradeId = 0,
}) => {
  // Open the tab synchronously (still inside the click) so popup blockers
  // allow it, then point it at the file once downloaded.
  const tab = window.open("", "_blank");
  const pathRequest = composeEndpoint(endpoint, null, urlParams, mathtradeId);
  const response = await api.get(pathRequest, {}, { responseType: "blob" });
  if (!response.ok || !response.data) {
    if (tab) tab.close();
    return false;
  }
  const url = URL.createObjectURL(response.data);
  if (tab) {
    tab.location.href = url;
  } else {
    window.location.href = url;
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
  return true;
};
