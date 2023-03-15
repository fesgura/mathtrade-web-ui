import { api, setAuth } from "../utils";
import endpoints from "api_serv/utils/endpoints";

const UserService = {
  login: (data) => {
    return api.post(endpoints.LOGIN, data);
  },
  create: (data) => {
    return api.post(endpoints.POST_USER, data);
  },
  // PRIVATE
  get: (id) => {
    setAuth();
    return api.get(endpoints.compose("GET_USER", [id]));
  },
  put: (params) => {
    setAuth();
    return api.put(endpoints.compose("PUT_USER", [params.id]), params.data);
  },
  changePassword: (data) => {
    setAuth();
    return api.put(endpoints.PUT_PASSWORD, data);
  },
  forgotPassword: (data) => {
    return api.post(endpoints.FORGOT_PASSWORD, data);
  },
};

export default UserService;
