import { useCallback } from "react";
import PublicEnv from "environments/public";
import LoginView from "views/login";
import { useApi, UserService } from "api";

const LoginContainer = ({ verifingAuth, onGetCaptcha }) => {
  // const [getUser, userData, loadingUser, errorApiUser] = useApi({
  //   promise: UserService.get,
  // });

  const [loginUser, , loading, errorApi] = useApi({
    promise: UserService.login,
    afterLoad: (dat) => {
      console.log("dat", dat);
      //  getUser();
    },
  });

  // console.log("userResponse", userResponse);
  // console.log("errorApi", errorApi);
  // console.log("------------");

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("sign_in", (recaptcha) => {
        const dataToSend = {
          ...formData,
          recaptcha,
        };
        // console.log("dataToSend", dataToSend);
        loginUser(dataToSend);
      });
    },
    [onGetCaptcha, loginUser]
  );

  return verifingAuth ? null : (
    <LoginView
      onSubmit={handleSubmit}
      loading={loading || loadingUser}
      errors={errorApi || errorApiUser}
      respOnSave={() => {}}
    />
  );
};

export default () => {
  return <PublicEnv Container={LoginContainer} />;
};
