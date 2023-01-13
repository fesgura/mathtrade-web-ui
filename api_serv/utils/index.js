import { create } from "apisauce";
import Qs from "qs";
import storage from "utils/storage";

const apiHost =
  process.env.NEXT_PUBLIC_API_HOST || "https://api.mathtrade.com.ar/";

export const api = create({
  timeout: 60000,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
  baseURL: apiHost,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
});

export const setAuth = () => {
  if (!api.headers.Authorization) {
    const token = storage.getFromStore("token");
    if (token) {
      api.setHeaders({
        Authorization: "token " + token,
      });
    }
  }
};
export const getMathtradeId = () => {
  const mathtrade = storage.getFromStore("mathtrade");
  return mathtrade ? mathtrade.data.id : "";
};

export const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});
