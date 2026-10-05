"use client";
import { createContext, useCallback, useMemo, useRef } from "react";

export const GotoTopContext = createContext({
  gotoTop: () => {},
});

export const GotoTopContextProvider = ({ children }) => {
  const topRef = useRef(null);

  const gotoTop = useCallback(() => {
    if (!topRef.current) return;

    // Mobile mathtrade layout scrolls the content column, not the window.
    const scroller = document.querySelector("[data-bug-report-capture]");
    if (scroller instanceof HTMLElement) {
      const scrollerRect = scroller.getBoundingClientRect();
      const refRect = topRef.current.getBoundingClientRect();
      const top = scroller.scrollTop + (refRect.top - scrollerRect.top);
      scroller.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
      return;
    }

    const rect = topRef.current.getBoundingClientRect();
    const top = (window.scrollY || 0) + (rect.y || 0);
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "smooth" });
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
