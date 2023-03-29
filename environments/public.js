import { useState, useEffect, useCallback } from "react";
import storage from "utils/storage";
import Router from "next/router";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { google_recaptcha_v3_client_key, PAUSED_SITE } from "config";
import SiteWorkingScreen from "components/siteWorkingScreen";

const PublicEnvComp = ({ ContainerComp }) => {
  const [verifingAuth, setVerifingAuth] = useState(true);

  useEffect(() => {
    // Temp
    storage.clearTemp("MathTradeArgentinaOptions");
    storage.clearTemp("MathTradeArgentinaOptions2");
    // TEMP
    const newStore = storage.get();
    if (newStore && newStore.auth && newStore.user.data) {
      //comprobar time
      Router.push("/");
    } else {
      setVerifingAuth(false);
    }
  }, []);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const onGetCaptcha = useCallback(
    async (pageId, callback) => {
      if (!executeRecaptcha) {
        return;
      }
      const token = await executeRecaptcha(pageId);

      callback(token);
    },
    [executeRecaptcha]
  );

  return (
    <>
      <ContainerComp verifingAuth={verifingAuth} onGetCaptcha={onGetCaptcha} />
    </>
  );
};

const PublicEnv = ({ Container }) => {
  if (PAUSED_SITE) {
    return <SiteWorkingScreen />;
  }
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={google_recaptcha_v3_client_key}
      language="es"
    >
      <PublicEnvComp ContainerComp={Container} />
    </GoogleReCaptchaProvider>
  );
};

export default PublicEnv;
