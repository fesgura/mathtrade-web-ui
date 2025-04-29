"use client";
import { useState, useCallback } from "react";
import useFetch from "@/hooks/useFetch";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_SIGNIN_ID } from "@/config";
import { useStore } from "@/store";
import { COOKIE_AUTH_TOKEN, DAYS_EXPIRE_TOKEN } from "@/config/apiConfig";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import { PRIVATE_ROUTES } from "@/config/routes";

const useSignIn = () => {
  const updateStore = useStore((state) => state.updateStore);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [loadingRecaptcha, setLoadingRecaptcha] = useState(false);
  const [errorRecaptcha, setErrorRecaptcha] = useState(null);
  const [changePasswordRequiredToken, setChangePasswordRequiredToken] =
    useState(null);
  const [old_password, setOldPassword] = useState("");

  const afterLoad = useCallback(
    (data) => {
      const {
        user,
        token,
        mathtrade,
        mathtrade_history,
        membership,
        change_required,
      } = data;

      if (change_required) {
        setChangePasswordRequiredToken(token);
      } else {
        // LOGIN
        updateStore("data", {
          user,
          mathtrade: mathtrade || null,
          mathtrade_history: mathtrade_history || [],
          membership: membership || null,
        });
        setCookie(COOKIE_AUTH_TOKEN, token, DAYS_EXPIRE_TOKEN);

        router.push(redirectUrl || PRIVATE_ROUTES.DEFAULT.path);
      }
    },
    [updateStore, router, redirectUrl]
    //[updateStore]
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
