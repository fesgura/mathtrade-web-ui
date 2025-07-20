import I18N, { getI18Ntext } from "@/i18n";
import ItemOfGame from "./item";
import useGameList from "./useGameList";

const GameItemList = () => {
  const { combos } = useGameList();

  console.log("GameItemList", combos); // DEBUG

  return (
    <>
      <div className="bg-gray-900 text-white lg:p-4 py-4 px-2 border-t border-white/20">
        <h4 className="mb-3">
          {`${combos.length} `}
          <I18N
            id={combos.length === 1 ? "game.item-num.1" : "game.item-num.more"}
          />
          :
        </h4>
        <div className="flex flex-col gap-2">
          {combos.map((combo) => {
            return <ItemOfGame key={combo.id} combo={combo} />;
          })}
        </div>
      </div>
    </>
  );
};

export default GameItemList;
