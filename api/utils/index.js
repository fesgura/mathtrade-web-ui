import { create } from "apisauce";
import Qs from "qs";

export const api = create({
  timeout: 60000,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
  baseURL: "https://mathtrade-back.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers":
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
  },
});

export const apiBGG = create({
  baseURL: "https://www.boardgamegeek.com/xmlapi2/",
});
