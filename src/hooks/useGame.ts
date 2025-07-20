import { useMemo } from "react";
import { getI18Ntext } from "@/i18n";

const useGame = ({ game }) => {
  const data = useMemo(() => {
    const { bgg_id, name: title, thumbnail, items } = game;

    return {
      title,
      titleLink: `https://boardgamegeek.com/boardgame/${bgg_id}/`,
      type: getI18Ntext(`element-type-badge-${1}`),
      thumbnail,
      items,
      itemCount: items?.length || 1,
    };
  }, [game]);

  return data;
};
export default useGame;
