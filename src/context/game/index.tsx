"use client";
import { createContext, useContext, useMemo, useState } from "react";

import { PageContext } from "@/context/page";
import { Game } from "@/types/games";

interface GameContextType {
  game: Game | null;
  showAsIgnored: boolean;
  setShowAsIgnored: (v: boolean) => void;
  setUpdatedValue: (v: any) => void;
  wantGroup: any;
}

export const GameContext = createContext<GameContextType>({
  game: null,
  showAsIgnored: false,
  setShowAsIgnored: () => { },
  setUpdatedValue: () => { },
  wantGroup: null,
});

interface GameContextProviderProps {
  gameRaw: Game | null;
  children: React.ReactNode;
}

export const GameContextProvider = ({ gameRaw, children }: GameContextProviderProps) => {
  /* PAGE CONTEXT **********************************************/
  const { myWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const [showAsIgnored, setShowAsIgnored] = useState(false);
  const [updatedValue, setUpdatedValue] = useState(null);

  const game = useMemo(() => {
    if (!gameRaw) {
      return null;
    }

    setShowAsIgnored(false);

    return gameRaw;
  }, [gameRaw]);

  const wantGroup = useMemo(() => {
    if (!myWants.length) {
      return null;
    }
    const wantsFiltered = myWants.filter((w) => {
      if (w.type === "game" && w?.bgg_id === gameRaw?.bgg_id) {
        return true;
      }
    });

    return wantsFiltered[0] || null;
  }, [gameRaw, myWants]);

  return (
    <GameContext.Provider
      value={{
        game,
        showAsIgnored,
        setShowAsIgnored,
        //
        setUpdatedValue,
        //
        wantGroup,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
