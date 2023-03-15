import { useCallback, useState } from "react";
import PublicEnv from "environments/public";
import ForgotPasswordView from "views/forgotPassword";
import { useApi, UserService } from "api_serv";
import storage from "utils/storage";
import Router from "next/router";

const ForgotPasswordContainer = ({ verifingAuth, onGetCaptcha }) => {
  const [step, setStep] = useState(0);

  const [forgotPassword, , loading, errorApi] = useApi({
    promise: UserService.forgotPassword,
    afterLoad: (data) => {
      setStep(1);
      // storage.setToStorage(data);
      // Router.push("/");
    },
  });

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("recovery", (recaptcha) => {
        const dataToSend = {
          ...formData,
          recaptcha,
        };
        forgotPassword(dataToSend);
      });
    },
    [onGetCaptcha, forgotPassword]
  );

  return verifingAuth ? null : (
    <ForgotPasswordView
      onSubmit={handleSubmit}
      loading={loading}
      errors={errorApi}
      step={step}
    />
  );
};

export default () => {
  return <PublicEnv Container={ForgotPasswordContainer} />;
};
