import { create } from "apisauce";
import endpoints from "./endpoints";
import xmlParser from "./xmlParser";

const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});

const handlePromise = (promise) =>
  promise
    .then((response) => {
      const responseData = xmlParser(response.data);
      if (response.ok) return [null, response, responseData];
      return [{ error: true, data: response.data }, response, responseData];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

const service = (endpoint, params) => {
  return apiBGG.get(endpoints[endpoint], params);
};

const fetchBGG = (endpoint, params) => {
  return handlePromise(service(endpoint, params));
};

export default fetchBGG;
