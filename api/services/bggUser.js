import { apiBGG } from "../utils";

const BggUserService = {
  get: (username) => {
    if (typeof username === "undefined") {
      return;
    }
    return apiBGG.get("user?name=" + encodeURIComponent(username));
  },
};

export default BggUserService;
