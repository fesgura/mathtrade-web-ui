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
      return [{ error: true, data: response.data }, response, response.data];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

const service = ({ method, pathRequest, params }) => {
  switch (method) {
    case "POST":
      return api.post(pathRequest || "", params);
    case "PUT":
      return api.put(pathRequest || "", params);
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
