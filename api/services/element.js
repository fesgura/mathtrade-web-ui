import { api, setAuth } from "../utils";
import endpoints from "api/utils/endpoints";

const ElementService = {
  put: (params) => {
    setAuth();
    return api.put(endpoints.compose("PUT_ELEMENT", [params.id]), params.data);
  },
  post: (data) => {
    setAuth();
    return api.post(endpoints.POST_ELEMENT, data);
  },
  delete: (id) => {
    setAuth();
    return api.delete(endpoints.compose("DELETE_ELEMENT", [id]));
  },
};

export default ElementService;
