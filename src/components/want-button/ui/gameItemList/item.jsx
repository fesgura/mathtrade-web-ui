import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";

import ItemXS from "@/components/item/xs";

const ItemOfGame = ({ item }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* WANTGROUP CONTEXT **********************************************/
  const { ownList, groupWantList, setGroupWantList } =
    useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  const onChange = useCallback(
    ({ target }) => {
      setGroupWantList((oldGroupWantList) => {
        const oldGroupWantListCopy = { ...oldGroupWantList };
        oldGroupWantListCopy[item?.id] = target.checked;
        return oldGroupWantListCopy;
      });
    },
    [item, setGroupWantList]
  );

  return (
    <ItemXS
      itemRaw={item}
      extraContent={
        <input
          type="checkbox"
          name={`item-${item?.id}`}
          className={
            !canI.want || ownList[item?.id]
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }
          checked={groupWantList[item?.id] || false}
          onChange={onChange}
          disabled={!canI.want || ownList[item?.id]}
        />
      }
      className={ownList[item?.id] ? "opacity-50" : null}
      dark
    />
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
