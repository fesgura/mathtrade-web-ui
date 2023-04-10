import { useCallback, useState } from "react";
import PublicEnv from "environments/public";
import { publicRoutes } from "config/routes";
import LoginView from "views/login";
import { useApi, UserService } from "api_serv";
import storage from "utils/storage";
import Router from "next/router";

const LoginContainer = ({ verifingAuth, onGetCaptcha }) => {
  const [acceptView, setAcceptView] = useState(false);

  const [loginUser, , loading, errorApi] = useApi({
    promise: UserService.login,
    afterLoad: (data, props) => {
      // end temp
      // const data = {
      //   ...d,
      //   user: null,
      // };
      // end temp

      storage.setToStorage(data);
      if (data.user) {
        if (!data.user.terms_acceptance) {
          setAcceptView(true);
        } else {
          Router.push("/");
        }
        //
      } else {
        storage.setToStorage(props);
        Router.push("/" + publicRoutes.changePassword.path);
      }
    },
  });
  const [putUser, , loadingPut, errorApiPut] = useApi({
    promise: UserService.put,
    afterLoad: () => {
      Router.push("/");
    },
  });

  const handleAcceptTerms = useCallback(() => {
    const storeData = storage.get();
    const userData = storeData?.user?.data;
    putUser({
      id: userData.id,
      data: {
        ...userData,
        location: userData.location.id,
        terms_acceptance: true,
      },
    });
  }, []);

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("sign_in", (recaptcha) => {
        const dataToSend = {
          ...formData,
          recaptcha,
        };
        loginUser(dataToSend, { passwordTemporal: formData.password });
      });
    },
    [onGetCaptcha, loginUser]
  );

  return verifingAuth ? null : (
    <LoginView
      onSubmit={handleSubmit}
      loading={loading || loadingPut}
      errors={errorApi || errorApiPut}
      acceptView={acceptView}
      handleAcceptTerms={handleAcceptTerms}
    />
  );
};

export default () => {
  return <PublicEnv Container={LoginContainer} />;
};
