"use client";
import { createContext, useState, useEffect } from "react";
import { signInApi } from "@/hooks/useFetch/constants/api";

export const PrivateEnvironmentContext = createContext({
  enableRenderPrivateEnvironment: false,
  setEnableRenderPrivateEnvironment: () => {},
});

const PrivateEnvironment = ({ children }) => {
  const [enableRenderPrivateEnvironment, setEnableRenderPrivateEnvironment] =
    useState(false);

  useEffect(() => {
    signInApi();
    setEnableRenderPrivateEnvironment(true);
  }, []);

  return (
    <PrivateEnvironmentContext.Provider
      value={{
        enableRenderPrivateEnvironment,
        setEnableRenderPrivateEnvironment,
      }}
    >
      {enableRenderPrivateEnvironment ? children : null}
    </PrivateEnvironmentContext.Provider>
  );
};

export default PrivateEnvironment;
