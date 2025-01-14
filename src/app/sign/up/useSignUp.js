import { useState, useCallback, useEffect } from "react";
import fetchBGG from "@/hooks/useFetchBGG/fetchBGG";
import useFetch from "@/hooks/useFetch";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_SIGNUP_ID } from "@/config";

const useSignUp = () => {
  const [dataInitial, setDataInitial] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorBGG, setErrorBGG] = useState(false);
  const [isSuccess, set_isSuccess] = useState(false);
  const [errorRecaptcha, setErrorRecaptcha] = useState(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const afterLoad = useCallback(() => {
    setLoading(false);
    set_isSuccess(true);
  }, []);
  const afterError = useCallback(() => {
    setLoading(false);
  }, []);

  const [createUser, , , errorRegister] = useFetch({
    endpoint: "POST_USER",
    method: "POST",
    afterLoad,
    afterError,
  });

  const onSubmit = useCallback(
    async (data) => {
      setErrorBGG(false);
      setLoading(true);
      setErrorRecaptcha(null);

      let avatar = "";

      const [, responseBGG, bggData] = await fetchBGG("USER", {
        name: data.bgg_user,
      });

      if (!responseBGG.ok) {
        setErrorBGG(true);
        setLoading(false);
        return;
      }

      if (!bggData?.user?.id) {
        setErrorBGG(true);
        setLoading(false);
        return;
      }

      avatar = bggData?.user?.avatarlink?.value || "";

      if (!executeRecaptcha) {
        setLoading(false);
        setErrorRecaptcha("error.General");
        return;
      }

      try {
        const recaptcha = await executeRecaptcha(GOOGLE_RECAPTCHA_SIGNUP_ID);

        createUser({
          params: {
            ...data,
            avatar,
            recaptcha,
          },
        });
      } catch (err) {
        setLoading(false);
        setErrorRecaptcha("error.General");
      }
    },
    [executeRecaptcha, createUser]
  );

  useEffect(() => {
    let params = new URLSearchParams(
      decodeURIComponent(window.location.search)
    );
    const referral_code = params.get("code") ?? "";
    const email = params.get("referred") ?? "";
    setDataInitial({ referral_code, email });
  }, []);

  return {
    validations: {
      referral_code: ["required"],
      email: ["required", "email"],
      first_name: ["required"],
      last_name: ["required"],
      phone: ["required", "phone"],
      bgg_user: ["required"],
      terms_acceptance: ["required"],
    },
    formatTypes: {
      terms_acceptance: "boolean",
    },
    onSubmit,
    loading,
    errorRegister: errorRegister || errorRecaptcha,
    errorBGG: errorBGG ? "form.BGGuser.error" : null,
    isSuccess,
    dataInitial,
  };
};

export default useSignUp;
