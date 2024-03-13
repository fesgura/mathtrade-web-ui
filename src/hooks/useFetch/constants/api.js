import { create } from "apisauce";
import Qs from "qs";
import apiConfig from "@/config/apiConfig";

export const api = create({
  ...apiConfig,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});

export const signInApi = (token) => {
  if (!api.headers.Authorization) {
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
  api.setHeaders({
    Authorization: "",
  });
};
