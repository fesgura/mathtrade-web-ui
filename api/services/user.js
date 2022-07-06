import { api, setAuth } from "../utils";

const UserService = {
  login: (data) => {
    return api.post("api-token-auth/", data);
  },
  create: (data) => {
    return api.post("api/users/", data);
  },
  // PRIVATE
  get: (id) => {
    setAuth();
    return api.get("api/users/" + id + "/");
  },
  put: (params) => {
    setAuth();
    return api.put("api/users/" + params.id + "/", params.data);
  },
  changePassword: (data) => {
    setAuth();
    return apiLogged.post("api-auth/login/", data);
  },
};

export default UserService;
