import { apiBGG } from "../../utils";
import endpoints from "../../utils/endpoints";

const service = {
  searchElement: (params) => {
    return apiBGG.get(endpoints.SEARCH_ELEMENT, params);
  },
  getElement: (params) => {
    return apiBGG.get(endpoints.GET_ELEMENT, params);
  },
};

export default service;
