"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@/config";
import { isExpiredDate } from "@/utils";
import { signInApi, signOutApi } from "@/hooks/useFetch/constants/api";

import LoadingBalls from "@/components/loading/balls";

const pausedSite = process.env.PAUSED_SITE;

const PrivateEnvironment = ({ children }) => {
  const store = useStore((state) => state.data);
  const clearStore = useStore((state) => state.clearStore);
  const [enabledRender, setEnabledRender] = useState(false);

  useEffect(() => {
    if (pausedSite === "yes") {
      signOutApi();
      clearStore();
      redirect(PUBLIC_ROUTES.DEFAULT.path);
    } else {
      const notLogged = !store.auth.token || isExpiredDate(store.auth.expires);
      if (notLogged) {
        redirect(PUBLIC_ROUTES.DEFAULT.path);
      } else {
        signInApi(store?.auth?.token || "");
        setEnabledRender(true);
      }
    }
  }, [store, clearStore]);

  return enabledRender ? children : <LoadingBalls />;
};

export default PrivateEnvironment;
