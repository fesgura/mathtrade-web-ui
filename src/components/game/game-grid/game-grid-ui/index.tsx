import clsx from "clsx";
import { useContext } from "react";
import { cardSurfaceClass } from "@/components/badgeType/cardKind";
import { GameContext } from "@/context/game";
import {
  useSelectableCard,
  selectedCardClass,
} from "@/components/ban/bulk/useBulkSelect";
import useGameGrid from "./useGameGrid";
import GameGridMD from "./md";
import GameGridXL from "./xl";

type GameGridUIProps = {
  expanded: number | null;
  setExpanded: (bggId: number | null) => void;
  tourAnchor?: string;
};

const GameGridUI = ({
  expanded,
  setExpanded,
  tourAnchor = undefined,
}: GameGridUIProps) => {
  const { gameNode, isExpanded, onToggleExpanse } = useGameGrid(
    expanded,
    setExpanded
  );
  const { game, showAsIgnored } = useContext(GameContext);
  const { isSelected } = useSelectableCard(
    game?.bgg_id,
    game?.ban_id || showAsIgnored ? "ignored" : null
  );
  return (
    <article
      className={clsx("transition-[padding_0.2s] xbg-secondary/20", {
        "col-span-full  pt-[110px]": isExpanded,
      })}
      ref={gameNode}
      data-tour={tourAnchor}
    >
      <div
        className={clsx(
          "transition-all relative mx-auto hover:shadow-[0_3px_16px_rgba(0,0,0,0.25)] shadow-md",
          cardSurfaceClass,
          {
            "sm:max-w-[420px] h-full rounded-lg": !isExpanded,
            "bg-white shadow-xl duration-700 max-w-5xl": isExpanded,
          },
          isSelected && selectedCardClass
        )}
      >
        {!isExpanded ? (
          <GameGridMD onToggleExpanse={onToggleExpanse} />
        ) : (
          <GameGridXL onToggleExpanse={onToggleExpanse} />
        )}
      </div>
    </article>
  );
};

export default GameGridUI;
