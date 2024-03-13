"use client";
import { createContext, useMemo, useState, useContext } from "react";
import { getI18Ntext } from "@/i18n";
import { PageContext } from "@/context/page";

export const GameContext = createContext({
  gameRaw: null,
  game: null,
  showAsIgnored: false,
  setShowAsIgnored: () => {},
  //
  wantGroup: null,
});

export const GameContextProvider = ({ gameRaw, children }) => {
  /* PAGE CONTEXT **********************************************/
  const { myWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const [showAsIgnored, setShowAsIgnored] = useState(false);

  const game = useMemo(() => {
    const { bgg_id, name: title, thumbnail, items, ban_id } = gameRaw;

    return {
      bgg_id,
      title,
      titleLink: `https://boardgamegeek.com/boardgame/${bgg_id}/`,
      type: getI18Ntext(`element-type-badge-${1}`),
      thumbnail,
      items,
      itemCount: items?.length || 1,
      ban_id,
    };
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
        gameRaw,
        game,
        showAsIgnored,
        setShowAsIgnored,
        //
        wantGroup,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
