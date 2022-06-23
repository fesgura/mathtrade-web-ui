import { useCallback } from "react";
import PublicEnv from "environments/public";
import LoginView from "views/login";
import { useApi, UserService } from "api";
import storage from "utils/storage";
import Router from "next/router";

const LoginContainer = ({ verifingAuth, onGetCaptcha }) => {
  const [loginUser, , loading, errorApi] = useApi({
    promise: UserService.login,
    afterLoad: (data) => {
      storage.setToStorage(data);
      Router.push("/");
    },
  });

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("sign_in", (recaptcha) => {
        const dataToSend = {
          ...formData,
          recaptcha,
        };
        loginUser(dataToSend);
      });
    },
    [onGetCaptcha, loginUser]
  );

  return verifingAuth ? null : (
    <LoginView
      onSubmit={handleSubmit}
      loading={loading}
      errors={errorApi}
      respOnSave={() => {}}
    />
  );
};

export default () => {
  return <PublicEnv Container={LoginContainer} />;
};
