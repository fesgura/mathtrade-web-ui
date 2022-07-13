import { apiBGG } from "../utils";

const BggElementService = {
  search: (params) => {
    return apiBGG.get("search", params);
  },
  get: (params) => {
    return apiBGG.get("thing", params);
  },
};

export default BggElementService;
