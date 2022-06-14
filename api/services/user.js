import { apiPost } from "../utils";

const UserService = {
  create: (data) => {
    return apiPost.post("users", data);
  },
};

export default UserService;
