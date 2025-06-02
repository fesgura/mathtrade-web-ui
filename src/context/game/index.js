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
  setUpdatedValue: () => {},
  //
  wantGroup: null,
});

export const GameContextProvider = ({ gameRaw, children }) => {
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
    const {
      bgg_id,
      year_published: year,
      name: title,
      thumbnail,
      game_thumbnail,
      items,
      ban_id,
      type,
      value,
      matched_bgg_id,
    } = gameRaw;

    const notGame = type === 3 || bgg_id === 23953 || bgg_id < 0;

    const isSameBGGId = notGame ? false : matched_bgg_id && matched_bgg_id > 0;

    return {
      bgg_id,
      title,
      titleLink: notGame
        ? null
        : `https://boardgamegeek.com/boardgame/${bgg_id}/`,
      type: getI18Ntext(`element-type-badge-${notGame ? 3 : type}`),
      typeNum: type,
      thumbnail: game_thumbnail || thumbnail,
      year,
      items,
      itemCount: items?.length || 1,
      ban_id,
      notGame,
      value: value || updatedValue,
      isSameBGGId,
    };
  }, [gameRaw, updatedValue]);

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
        setUpdatedValue,
        //
        wantGroup,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
