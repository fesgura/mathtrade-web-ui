import ChangePasswordView from "views/myAccount/changePassword";
import { useApi, UserService } from "api";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import storage from "utils/storage";

const ChangePassword = ({ setIsOpenModalPassword }) => {
  const [changePassword, d, loading, errorApi] = useApi({
    promise: UserService.changePassword,
    afterLoad: () => {
      storage.clear();
      Router.push(`/${publicRoutes.signin.path}`);
    },
  });
  return (
    <ChangePasswordView
      setIsOpenModalPassword={setIsOpenModalPassword}
      onSubmit={(formData) => {
        changePassword(formData);
      }}
      loading={loading}
      errors={errorApi}
    />
  );
};
export default ChangePassword;
