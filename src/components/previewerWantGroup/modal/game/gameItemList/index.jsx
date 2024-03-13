import I18N, { getI18Ntext } from "@/i18n";
import ItemOfGame from "./item";
import useGameList from "./useGameList";

const GameItemList = ({
  items,
  itemCount,
  groupWantList,
  setGroupWantList,
  ownList,
}) => {
  return (
    <>
      <div className="bg-gray-900 text-white p-4 border-t border-white/20">
        <h4 className="mb-3">
          {`${itemCount} `}
          <I18N
            id={itemCount === 1 ? "game.item-num.1" : "game.item-num.more"}
          />
          :
        </h4>
        <div className="flex flex-col gap-2">
          {items.map((item) => {
            return (
              <ItemOfGame
                key={item.id}
                item={item}
                groupWantList={groupWantList}
                setGroupWantList={setGroupWantList}
                ownList={ownList}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GameItemList;
