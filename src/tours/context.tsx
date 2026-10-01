"use client";
import { createContext, useState } from "react";

// The current screen's tour, so Ayuda can offer "Ver el tutorial de esta
// pantalla" only where there is one (useTour registers it).
export const TourContext = createContext({
  startCurrentTour: null as null | (() => void),
  setStartCurrentTour: (_value: null | (() => void)) => {},
});

export const TourContextProvider = ({ children }) => {
  const [startCurrentTour, setStart] = useState<null | (() => void)>(null);
  // A function can't go straight into useState's setter (it'd be called).
  const setStartCurrentTour = (value: null | (() => void)) => setStart(() => value);
  return (
    <TourContext.Provider value={{ startCurrentTour, setStartCurrentTour }}>
      {children}
    </TourContext.Provider>
  );
};
