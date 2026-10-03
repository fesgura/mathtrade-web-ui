"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import { ItemContext } from "@/context/item";
import { GameContext } from "@/context/game";
import useFetch from "@/hooks/useFetch";

// Star: a favorite game, for the user and every edition (api/favorites).
// On a copy it marks the copy's game (its first one, for a combo); if any of
// the combo's games is already a favorite, it unmarks that one.
const FavoriteButton = ({ type = "game", className = "" }) => {
  const { item } = useContext(ItemContext);
  const { game } = useContext(GameContext);

  const source: any = type === "item" ? item : game;
  const [favoriteId, setFavoriteId] = useState<number | null>(
    source?.favorite_id ?? null
  );
  useEffect(() => {
    setFavoriteId(source?.favorite_id ?? null);
  }, [source?.favorite_id]);

  const target = (() => {
    if (type === "item") {
      const firstGame = item?.elements?.[0]?.element?.game;
      return firstGame
        ? { bgg_id: firstGame.bgg_id, name: firstGame.primary_name || item?.title }
        : null;
    }
    return game ? { bgg_id: game.bgg_id, name: game.title } : null;
  })();

  const [addFavorite, , adding] = useFetch({
    endpoint: "POST_FAVORITE",
    method: "POST",
    afterLoad: useCallback((res: any) => setFavoriteId(res?.id ?? null), []),
    afterError: useCallback(() => setFavoriteId(null), []),
  });
  const [removeFavorite, , removing] = useFetch({
    endpoint: "DELETE_FAVORITE",
    method: "DELETE",
  });

  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (favoriteId) {
        removeFavorite({ urlParams: [favoriteId] });
        setFavoriteId(null); // optimistic
        return;
      }
      if (!target) return;
      setFavoriteId(-1); // optimistic, until the backend answers with its id
      addFavorite({ params: target });
    },
    [favoriteId, target, addFavorite, removeFavorite]
  );

  if (!target || (type === "item" && item?.isOwned)) return null;
  const active = favoriteId !== null;

  return (
    <div className={clsx("h-7 pointer-events-auto", className)}>
      <div data-tooltip={getI18Ntext(active ? "favorite.remove" : "favorite.add")}>
        <button
          type="button"
          aria-pressed={active}
          aria-label={getI18Ntext(active ? "favorite.remove" : "favorite.add")}
          className={clsx(
            "h-7 w-7 flex items-center justify-center rounded-full border transition-colors",
            active
              ? "text-warning bg-white border-gray-300 hover:bg-gray-100"
              : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100"
          )}
          onClick={onClick}
          disabled={adding || removing}
        >
          <Icon type={active ? "star" : "star-o"} className="text-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default FavoriteButton;
