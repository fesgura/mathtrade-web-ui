import { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_RECOVER_PASS_ID } from "@/config";

const useForgotPassword = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loadingRecaptcha, setLoadingRecaptcha] = useState(false);
  const [errorRecaptcha, setErrorRecaptcha] = useState(null);
  const [step, setStep] = useState(0);

  const afterLoad = useCallback(() => {
    setStep(1);
  }, []);

  const [forgotPassword, , loadingRecover, errorRecover] = useFetch({
    endpoint: "FORGOT_PASSWORD",
    method: "POST",
    afterLoad,
  });

  const onSubmit = useCallback(
    async (data) => {
      if (!executeRecaptcha) {
        return;
      }

      setLoadingRecaptcha(true);

      try {
        const recaptcha = await executeRecaptcha(
          GOOGLE_RECAPTCHA_RECOVER_PASS_ID
        );
        setLoadingRecaptcha(false);
        forgotPassword({
          params: {
            ...data,
            recaptcha,
          },
        });
      } catch (err) {
        setLoadingRecaptcha(false);
        setErrorRecaptcha("error.General");
      }
    },
    [executeRecaptcha, forgotPassword]
  );

  return {
    step,
    validations: {
      target: ["required", "email"],
    },
    onSubmit,
    loading: loadingRecover || loadingRecaptcha,
    error: errorRecover || errorRecaptcha,
  };
};

export default useForgotPassword;
