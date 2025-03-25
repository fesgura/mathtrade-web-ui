"use client";
import { createContext, useState, useEffect, useMemo } from "react";
import { signInApi } from "@/hooks/useFetch/constants/api";
import { usePathname } from "next/navigation";
import { PRIVATE_ROUTES } from "@/config/routes";
import { useStore } from "@/store";
import Card404 from "@/components/card404";

const privateRoutesEnabled = Object.values(PRIVATE_ROUTES).reduce(
  (obj, { path, enabled }) => {
    obj[path] = enabled;
    return obj;
  },
  {}
);

export const PrivateEnvironmentContext = createContext({
  enableRenderPrivateEnvironment: false,
  setEnableRenderPrivateEnvironment: () => {},
});

const PrivateEnvironment = ({ children }) => {
  const { membership } = useStore((state) => state.data);

  const [enableRenderPrivateEnvironment, setEnableRenderPrivateEnvironment] =
    useState(false);

  const currentPath = usePathname();

  useEffect(() => {
    signInApi();
    setEnableRenderPrivateEnvironment(true);
  }, []);

  const enableToShow = useMemo(() => {
    const enabled =
      privateRoutesEnabled?.[currentPath.trim().toLowerCase()] || "none";

    if (enabled === "always") {
      return true;
    }

    if (enabled === "onlyForMembers" && membership) {
      return true;
    }

    return false;
  }, [currentPath, membership]);

  return (
    <PrivateEnvironmentContext.Provider
      value={{
        enableRenderPrivateEnvironment,
        setEnableRenderPrivateEnvironment,
      }}
    >
      {enableRenderPrivateEnvironment ? (
        enableToShow ? (
          children
        ) : (
          <Card404 />
        )
      ) : null}
    </PrivateEnvironmentContext.Provider>
  );
};

export default PrivateEnvironment;
