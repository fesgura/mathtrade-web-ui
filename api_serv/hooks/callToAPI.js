import Router from "next/router";
import storage from "utils/storage";
import { setLogoutAPI } from "api_serv/utils";

const callToAPI = (promise) =>
  promise
    .then((response) => {
      if (response.status === 403) {
        storage.clear();
        setLogoutAPI();
        Router.push(`/${publicRoutes.signin.path}`);
      }

      if (response.ok) return [null, response, response.data];
      return [{ error: true, data: response.data }, response, response.data];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

export default callToAPI;
