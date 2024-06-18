import { create } from "apisauce";
import Qs from "qs";
import apiConfig, { COOKIE_AUTH_TOKEN } from "@/config/apiConfig";
import { getCookie } from "@/utils/cookies";

export const api = create({
  ...apiConfig,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});

export const signInApi = () => {
  if (!api.headers.Authorization) {
    const token = getCookie(COOKIE_AUTH_TOKEN);

    api.setHeaders({
      Authorization: "token " + token,
    });
  }
};
export const setTokenToAPI = (token) => {
  api.setHeaders({
    Authorization: "token " + token,
  });
};

export const signOutApi = () => {
  if (api.headers.Authorization) {
    api.setHeaders({
      Authorization: "",
    });
  }
};
