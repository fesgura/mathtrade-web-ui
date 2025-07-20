import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";
import { useCallback, useContext } from "react";

import ItemXS from "@/components/item/xs";
import { GameCombo } from "@/types/games";

const ItemOfGame = ({ combo }: { combo: GameCombo }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { ownList, groupWantList, setGroupWantList } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  const onChange = useCallback(
    ({ target }: { target: HTMLInputElement }) => {
      setGroupWantList((oldGroupWantList) => {
        const oldGroupWantListCopy = { ...oldGroupWantList };
        oldGroupWantListCopy[combo?.id] = target.checked;
        return oldGroupWantListCopy;
      });
    },
    [combo, setGroupWantList]
  );
  console.log("ItemOfGame", combo, ownList, groupWantList); // DEBUG

  return (
    <ItemXS
      itemRaw={combo}
      extraContent={<input
        type="checkbox"
        name={`item-${combo?.id}`}
        className={!canI.want || ownList[combo?.id]
          ? "cursor-not-allowed"
          : "cursor-pointer"}
        checked={groupWantList[combo?.id] || false}
        onChange={onChange}
        disabled={!canI.want || ownList[combo?.id]} />}
      className={ownList[combo?.id] ? "opacity-50" : null}
      dark 
      hideUser={undefined} 
      hideValue={undefined} />
  );

  /*   (
    <div className="flex gap-2 items-center mb-2 p-2 rounded-md bg-white text-black">
      <div className="h-5" data-tooltip={getI18Ntext("IwantIt")}>
        <Switch />
      </div>
      <div className="grow ">
        
      </div>
    </div>
  ); */
};
export default ItemOfGame;
