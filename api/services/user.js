import { api } from "../utils";

const UserService = {
  login: (data) => {
    return api.post("api-token-auth/", data);
  },
  create: (data) => {
    return api.post("api/users/", data);
  },
};

export default UserService;
