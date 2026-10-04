"use client";
import { createContext, useMemo, useState, useContext, useEffect } from "react";
import { getI18Ntext } from "@/i18n";
import { PageContext } from "@/context/page";

export const GameContext = createContext({
  gameRaw: null,
  game: null,
  showAsIgnored: false,
  setShowAsIgnored: (_value?: any) => {},
  setBanId: (_value?: any) => {},
  setFavoriteId: (_value?: any) => {},
  setUpdatedValue: (_value?: any) => {},
  wantGroup: null,
});

export const GameContextProvider = ({ gameRaw = null, children = null }) => {
  const { myWants } = useContext(PageContext);

  const [showAsIgnored, setShowAsIgnored] = useState(false);
  const [banIdOverride, setBanIdOverride] = useState(undefined);
  // FavoriteButton remounts when the game card collapses/expands (MD ↔ XL).
  // Keep the toggled id here so the remounted button doesn't fall back to
  // the stale favorite_id on gameRaw.
  const [favoriteIdOverride, setFavoriteIdOverride] = useState(undefined);
  const [updatedValue, setUpdatedValue] = useState(null);

  useEffect(() => {
    setShowAsIgnored(false);
    setBanIdOverride(undefined);
    setFavoriteIdOverride(undefined);
  }, [gameRaw]);

  const game = useMemo(() => {
    if (!gameRaw) {
      return null;
    }

    const {
      bgg_id,
      year,
      year_published,
      name: title,
      thumbnail,
      game_thumbnail,
      items,
      ban_id,
      type,
      value,
      matched_bgg_id,
      favorite_id,
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
      year: year ?? year_published,
      items,
      // Not `|| 1`: the backend already excludes ignored-owner copies from
      // `items`, so a game whose only copy belongs to an ignored user
      // legitimately has 0 items — that's a real count, not a loading
      // placeholder (MAT-120).
      itemCount: items?.length ?? 0,
      ban_id: banIdOverride !== undefined ? banIdOverride : ban_id,
      favorite_id:
        favoriteIdOverride !== undefined
          ? favoriteIdOverride
          : (favorite_id ?? null),
      notGame,
      value: value || updatedValue,
      isSameBGGId,
    };
  }, [gameRaw, updatedValue, banIdOverride, favoriteIdOverride]);

  const wantGroup = useMemo(() => {
    if (!myWants?.length) {
      return null;
    }
    const wantsFiltered = myWants.filter((w) => {
      return w.type === "game" && w?.bgg_id === gameRaw?.bgg_id;
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
        setBanId: setBanIdOverride,
        setFavoriteId: setFavoriteIdOverride,
        setUpdatedValue,
        wantGroup,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
