import { create } from "apisauce";
import Qs from "qs";
import storage from "utils/storage";

const apiHost = "https://api.mathtrade.com.ar/";
const apiHostTest = "https://api.mathtrade.com.ar:8000/";

export const api = create({
  timeout: 300000, // 5 minutes
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
  baseURL: apiHost,
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
  },
});

export const setApiTest = () => {
  api.setBaseURL(apiHostTest);
};

export const setAuth = () => {
  if (storage.getFromOptions("isTest")) {
    api.setBaseURL(apiHostTest);
  }

  if (!api.headers.Authorization) {
    const token = storage.getFromStore("token");
    if (token) {
      api.setHeaders({
        Authorization: "token " + token,
      });
    }
  }
};

export const setLogoutAPI = () => {
  delete api.headers["Authorization"];
};
export const getMathtradeId = () => {
  const mathtrade = storage.getFromStore("mathtrade");
  return mathtrade ? mathtrade.data.id : "";
};

export const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});
