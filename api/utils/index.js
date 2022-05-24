import { create } from "apisauce";
import Qs from "qs";

export const api = create({
  timeout: 60000,
  paramsSerializer: function (params) {
    return Qs.stringify(params, { arrayFormat: "repeat" });
  },
});

export const BGG2_API_URL = "https://www.boardgamegeek.com/xmlapi2/";
export const BGG1_API_URL = "https://www.boardgamegeek.com/xmlapi/";
