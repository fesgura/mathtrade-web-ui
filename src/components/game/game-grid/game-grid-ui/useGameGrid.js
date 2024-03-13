import { useRef, useMemo, useContext, useCallback } from "react";
import { GameContext } from "@/context/game";

const useGameGrid = (expanded, setExpanded) => {
  const { game } = useContext(GameContext);

  const gameNode = useRef(null);

  const isExpanded = useMemo(() => {
    return expanded === game.bgg_id;
  }, [expanded, game.bgg_id]);

  const onToggleExpanse = useCallback(() => {
    if (isExpanded) {
      setExpanded(null);
      setTimeout(() => {
        gameNode.current.scrollIntoView({
          behavior: "smooth",
          block: "center", //"start" | "center" | "end" | "nearest";
          //      inline: "start" | "center" | "end" | "nearest";
        });
      }, 200);
    } else {
      setExpanded(game.bgg_id);
      setTimeout(() => {
        gameNode.current.scrollIntoView({
          behavior: "smooth",
          block: "start", //"start" | "center" | "end" | "nearest";
          //      inline: "start" | "center" | "end" | "nearest";
        });
      }, 200);
    }
  }, [isExpanded, setExpanded, game.bgg_id]);

  return { gameNode, isExpanded, onToggleExpanse };
};

export default useGameGrid;
