import { apiBGG } from "../../utils";
import endpoints from "../../utils/endpoints";

const service = {
  getUser: (username) => {
    if (typeof username === "undefined") {
      return;
    }
    return apiBGG.get(
      endpoints.compose("GET_USER", [encodeURIComponent(username)])
    );
  },
};

export default service;
