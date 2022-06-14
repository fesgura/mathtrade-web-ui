import { useState, useEffect, useCallback } from "react";
import RegisterView from "views/register";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { google_recaptcha_v3_client_key } from "config";
import { useApi, LocationService, UserService } from "api";

const RegisterContainer = () => {
  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
  });

  const [createUser, userResponse, loadingUser, errorUser] = useApi({
    promise: UserService.create,
  });

  const [dataInitial, set_dataInitial] = useState({});

  console.log(userResponse, errorUser);

  useEffect(() => {
    fetchLocations();
    setTimeout(() => {
      set_dataInitial({
        first_name: "Pablito",
        last_name: "Cazu",
        email: "pablocazu@gmmail.com",
        phone: "+549262544781",
        whatsapp: "+549262544781",
        telegram: "cazu",
        location: "https://mathtrade-back.herokuapp.com/api/locations/3/",
        bgg_user: "cazu",
      });
    }, 50);
  }, []);

  // Google Captcha
  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleSubmit = useCallback(
    async (formData) => {
      if (!executeRecaptcha) {
        console.log("Execute recaptcha not yet available");
        return;
      }
      const token = await executeRecaptcha("signup");

      //formData.recaptcha_token = token;
      console.log("formToSend", formData);
      var form_data = new FormData();

      for (var key in formData) {
        form_data.append(key, formData[key]);
      }
      createUser(formData);
    },
    [executeRecaptcha]
  );
  return (
    <RegisterView
      onSubmit={handleSubmit}
      dataLocations={dataLocations}
      loadingLocations={loadingLocations}
      loading={loadingUser}
      respOnSave={() => {}}
      dataInitial={dataInitial}
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
