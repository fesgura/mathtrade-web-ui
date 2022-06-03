import { useCallback } from "react";
import RegisterView from "views/register";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { google_recaptcha_v3_client_key } from "config";

const RegisterContainer = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = useCallback(
    async (formData) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const token = await executeRecaptcha("signup");

      formData.recaptcha_token = token;
      console.log("formToSend", formData);
    },
    [executeRecaptcha]
  );
  return (
    <RegisterView
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
      <RegisterContainer />
    </GoogleReCaptchaProvider>
  );
};

export default RecaptchaContainer;
