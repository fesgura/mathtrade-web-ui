"use client";
import { createContext, useCallback, useMemo, useRef } from "react";

export const GotoTopContext = createContext({
  gotoTop: () => {},
});

export const GotoTopContextProvider = ({ children }) => {
  const topRef = useRef(null);

  const gotoTop = useCallback(() => {
    if (window && topRef && topRef.current) {
      const rect = topRef.current.getBoundingClientRect();

      const top = (window?.scrollY || 0) + (rect?.y || 0) - 44;

      window.scrollTo({ top, left: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div ref={topRef} className="goto-top" />
      <GotoTopContext.Provider
        value={{
          gotoTop,
        }}
      >
        {children}
      </GotoTopContext.Provider>
    </>
  );
};
