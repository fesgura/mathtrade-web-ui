import { api, setAuth } from "../utils";

const ElementService = {
  put: (params) => {
    setAuth();
    return api.put("api/elements/" + params.id + "/", params.data);
  },
  post: (data) => {
    setAuth();
    return api.post("api/elements/", data);
  },
  delete: (id) => {
    setAuth();
    return api.delete("api/elements/" + id + "/");
  },
};

export default ElementService;
