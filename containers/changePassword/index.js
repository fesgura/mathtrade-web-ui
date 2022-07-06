import ChangePasswordView from "views/changePassword";
import { useApi, UserService } from "api";
import storage from "utils/storage";

const ChangePassword = () => {
  const [loginUser, , loginLoading, errorLoginApi] = useApi({
    promise: UserService.loginPrivate,
    afterLoad: (data) => {
      console.log(data);
    },
  });
  return (
    <ChangePasswordView
      loginUser={(formData) => {
        const user = storage.getFromStore("user");

        const dataToSend = {
          ...formData,
          username: user.username,
        };
        console.log(dataToSend);
        loginUser(dataToSend);
      }}
      loading={loginLoading}
      errors={errorLoginApi}
    />
  );
};
export default ChangePassword;
