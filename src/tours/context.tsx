"use client";
import { createContext, useContext, useState } from "react";

// The current screen's tour, so Ayuda can offer "Ver el tutorial de esta
// pantalla" only where there is one (useTour registers it). Also which
// screen shows an example card while its tour runs on an empty list.
export const TourContext = createContext({
  startCurrentTour: null as null | (() => void),
  setStartCurrentTour: (_value: null | (() => void)) => {},
  demo: null as null | string,
  setDemo: (_screen: null | string) => {},
});

export const TourContextProvider = ({ children }) => {
  const [startCurrentTour, setStart] = useState<null | (() => void)>(null);
  // A function can't go straight into useState's setter (it'd be called).
  const setStartCurrentTour = (value: null | (() => void)) => setStart(() => value);
  const [demo, setDemo] = useState<null | string>(null);
  return (
    <TourContext.Provider value={{ startCurrentTour, setStartCurrentTour, demo, setDemo }}>
      {children}
    </TourContext.Provider>
  );
};

// True while this screen's tour shows its example card (src/tours/demo).
export const useTourDemo = (screen: string) => useContext(TourContext).demo === screen;
