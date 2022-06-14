import { create } from "apisauce";
import Qs from "qs";

export const api = create({
  timeout: 60000,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
  baseURL: "https://mathtrade-back.herokuapp.com/api/",
  headers: {
    Accept: "application/json",
    Authorization: "Basic bWF0aGFkbWluOk1lZXBsZUxhbmQ=",
  },
});
export const apiPost = create({
  timeout: 60000,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
  baseURL: "https://mathtrade-back.herokuapp.com/api/",
  headers: {
    Accept: "application/x-www-form-urlencoded",
    Authorization: "Basic bWF0aGFkbWluOk1lZXBsZUxhbmQ=",
  },
});

//export const API_URL = "https://mathtrade-back.herokuapp.com/api/";

export const BGG2_API_URL = "https://www.boardgamegeek.com/xmlapi2/";
export const BGG1_API_URL = "https://www.boardgamegeek.com/xmlapi/";
