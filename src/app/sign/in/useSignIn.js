"use client";
import { COOKIE_AUTH_TOKEN, DAYS_EXPIRE_TOKEN } from "@/config/apiConfig";
import { PRIVATE_ROUTES } from "@/config/routes";
import useFetch from "@/hooks/useFetch";
import { setTokenToAPI } from "@/hooks/useFetch/constants/api";
import { useStore } from "@/store";
import { setCookie } from "@/utils/cookies";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const useSignIn = () => {
  const updateStore = useStore((state) => state.updateStore);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const [changePasswordRequiredToken, setChangePasswordRequiredToken] =
    useState(null);
  const [old_password, setOldPassword] = useState("");

  const afterLoad = useCallback(
    async (data) => {
      const { token, mathtrade, change_required } = data;
      let user = null;
      if (token) {
        try {
          user = jwtDecode(token);
        } catch (e) {
          user = null;
        }
      }

      if (change_required) {
        setChangePasswordRequiredToken(token);
      } else {
        updateStore("data", {
          user,
          mathtrade: mathtrade || null,
          mathtrade_history: [],
          membership: null,
        });
        setCookie(COOKIE_AUTH_TOKEN, token, DAYS_EXPIRE_TOKEN);
        setTokenToAPI(token);

        router.push(redirectUrl || PRIVATE_ROUTES.DEFAULT.path);
      }
    },
    [updateStore, router, redirectUrl]
  );

  const [login, , loadingLogin, errorLogin] = useFetch({
    method: "POST",
    endpoint: "LOGIN",
    afterLoad,
  });
  const onSubmit = useCallback(
    (userdata) => {
      setOldPassword(userdata.password);
      login({
        params: {
          ...userdata,
        },
      });
    },
    [login]
  );

  return {
    validations: {
      email: ["required", "email"],
      password: ["required"],
    },
    onSubmit,
    loading: loadingLogin,
    error: errorLogin ? "error.Login" : null,
    setChangePasswordRequiredToken,
    changePasswordRequiredToken,
    old_password,
  };
};

export default useSignIn;
