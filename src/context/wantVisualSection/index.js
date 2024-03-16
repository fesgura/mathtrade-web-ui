"use client";
import { createContext, useState } from "react";

export const WantVisualSectionContext = createContext({
  forceShow: false,
  setForceShow: () => {},
});

export const WantVisualSectionContextProvider = ({ children }) => {
  const [forceShow, setForceShow] = useState(false);

  return (
    <WantVisualSectionContext.Provider
      value={{
        forceShow,
        setForceShow,
      }}
    >
      {children}
    </WantVisualSectionContext.Provider>
  );
};
