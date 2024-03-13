import clsx from "clsx";
import useGameGrid from "./useGameGrid";
import GameGridMD from "./md";
import GameGridXL from "./xl";

const GameGridUI = ({ expanded, setExpanded }) => {
  const { gameNode, isExpanded, onToggleExpanse } = useGameGrid(
    expanded,
    setExpanded
  );
  return (
    <article
      className={clsx("transition-[padding_0.2s] xbg-secondary/20", {
        "col-span-full  pt-[110px]": isExpanded,
      })}
      ref={gameNode}
    >
      <div
        className={clsx("transition-all relative mx-auto", {
          "sm:w-[516px] h-full shadow-[0_2px_10px_rgba(0,0,0,0.3)] ":
            !isExpanded,
          "bg-white shadow-xl w-full duration-700 max-w-5xl": isExpanded,
        })}
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
