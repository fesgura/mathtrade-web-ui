import { useCallback } from "react";
import NewPasswordView from "views/newPassword";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { google_recaptcha_v3_client_key } from "config";

const NewPassword = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (formData) => {
      if (!executeRecaptcha) {
        return;
      }
      const token = await executeRecaptcha("newPassword");

      formData.recaptcha_token = token;

      delete formData.password2;
    },
    [executeRecaptcha]
  );
  return (
    <NewPasswordView
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
      <NewPassword />
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaContainer;
