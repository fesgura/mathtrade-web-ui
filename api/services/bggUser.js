import { api, BGG2_API_URL } from "../utils";

const BggUserService = {
  get: (username) => {
    if (typeof username === "undefined") {
      return;
    }
    return api.get(BGG2_API_URL + "user?name=" + encodeURIComponent(username));
  },
};

export default BggUserService;
