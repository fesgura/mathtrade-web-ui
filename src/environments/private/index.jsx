"use client";
import { useEffect, useState } from "react";
import { useStore } from "@/store";
import { redirect } from "next/navigation";
import { PUBLIC_ROUTES } from "@/config";
import { isExpiredDate } from "@/utils";
import { signInApi } from "@/hooks/useFetch/constants/api";
import useLocations from "@/hooks/useLocations";
import LoadingBalls from "@/components/loading/balls";

const PrivateEnvironment = ({ children }) => {
  const store = useStore((state) => state.data);
  const [enabledRender, setEnabledRender] = useState(false);

  useLocations();

  useEffect(() => {
    const notLogged = !store.auth.token || isExpiredDate(store.auth.expires);
    if (notLogged) {
      redirect(PUBLIC_ROUTES.DEFAULT.path);
    } else {
      signInApi(store?.auth?.token || "");
      setEnabledRender(true);
    }
  }, [store]);

  return enabledRender ? children : <LoadingBalls />;
};

export default PrivateEnvironment;
