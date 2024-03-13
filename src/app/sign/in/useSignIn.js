import { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_SIGNIN_ID } from "@/config";
import { useStore, DAYS_EXPIRE_TOKEN } from "@/store";

const useSignIn = () => {
  const updateStore = useStore((state) => state.updateStore);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loadingRecaptcha, setLoadingRecaptcha] = useState(false);
  const [errorRecaptcha, setErrorRecaptcha] = useState(null);
  const [changePasswordRequiredToken, setChangePasswordRequiredToken] =
    useState(null);
  const [old_password, setOldPassword] = useState("");

  const afterLoad = useCallback(
    (data) => {
      const { user, token, mathtrade, membership, change_required } = data;

      if (change_required) {
        setChangePasswordRequiredToken(token);
      } else {
        // LOGIN
        const d = new Date();

        updateStore("data", {
          user,
          mathtrade: mathtrade || null,
          membership: membership || null,
          auth: {
            expires: d.getTime() + Math.round(86400000 * DAYS_EXPIRE_TOKEN),
            token,
          },
        });
      }
    },
    [updateStore]
  );

  const [login, , loadingLogin, errorLogin] = useFetch({
    method: "POST",
    endpoint: "LOGIN",
    afterLoad,
  });

  const onSubmit = useCallback(
    async (userdata) => {
      if (!executeRecaptcha) {
        return;
      }

      setLoadingRecaptcha(true);

      try {
        const recaptcha = await executeRecaptcha(GOOGLE_RECAPTCHA_SIGNIN_ID);
        setLoadingRecaptcha(false);
        setOldPassword(userdata.password);
        login({
          params: {
            ...userdata,
            recaptcha,
          },
        });
      } catch (err) {
        setLoadingRecaptcha(false);
        setErrorRecaptcha("error.General");
      }
    },
    [executeRecaptcha, login]
  );

  return {
    validations: {
      email: ["required", "email"],
      password: ["required"],
    },
    onSubmit,
    loading: loadingLogin || loadingRecaptcha,
    error: (errorLogin ? "error.Login" : null) || errorRecaptcha,
    setChangePasswordRequiredToken,
    changePasswordRequiredToken,
    old_password,
  };
};

export default useSignIn;
