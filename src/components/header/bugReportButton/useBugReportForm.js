import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import useFetch from "@/hooks/useFetch";
import { GOOGLE_RECAPTCHA_BUGREPORT_ID } from "@/config";

const useBugReportForm = (screenshot, consoleLog, networkLog) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitted, setSubmitted] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(null);

  const afterLoad = useCallback(() => {
    setSubmitted(true);
  }, []);

  const [postBugReport, , loading, error] = useFetch({
    method: "POST",
    endpoint: "POST_BUG_REPORT",
    afterLoad,
  });

  const onSubmit = useCallback(
    async (formData) => {
      // Guards a repeat click both while a request is in flight and after
      // one has already succeeded — neither useFetch nor the shared Form
      // component guard against that anywhere else in the codebase, so
      // this is a local, feature-scoped fix rather than relying on either.
      if (loading || submitted) return;
      if (!executeRecaptcha) return;

      setRecaptchaError(null);
      try {
        const recaptcha = await executeRecaptcha(GOOGLE_RECAPTCHA_BUGREPORT_ID);
        postBugReport({
          params: {
            description: formData.description,
            url: window.location.href,
            user_agent: navigator.userAgent,
            screenshot: screenshot || "",
            console_log: consoleLog || "",
            network_log: networkLog || "",
            recaptcha,
          },
        });
      } catch (err) {
        setRecaptchaError("error.General");
      }
    },
    [
      loading,
      submitted,
      executeRecaptcha,
      postBugReport,
      screenshot,
      consoleLog,
      networkLog,
    ]
  );

  return {
    validations: {
      description: ["required"],
    },
    onSubmit,
    loading,
    submitted,
    error: error || recaptchaError,
  };
};

export default useBugReportForm;
