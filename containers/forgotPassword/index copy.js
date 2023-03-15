import { useCallback } from "react";
import ForgotPasswordView from "views/forgotPassword";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { google_recaptcha_v3_client_key } from "config";

const ForgotPassword = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (formData) => {
      if (!executeRecaptcha) {
        return;
      }
      const token = await executeRecaptcha("forgotPassword");

      formData.recaptcha_token = token;

      delete formData.password2;
    },
    [executeRecaptcha]
  );
  return (
    <ForgotPasswordView
      onSubmit={handleSubmit}
      //loading={true}
      respOnSave={() => {}}
    />
  );
};

const RecaptchaContainer = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={google_recaptcha_v3_client_key}
      language="es"
    >
      <ForgotPassword />
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaContainer;
