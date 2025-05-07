import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

import { LoadingBox } from "@/components/loading";
import ItemXL from "@/components/item/item-grid/item-grid-ui/xl";

const ItemUI = ({ wantGroup }) => {
  /* PAGE CONTEXT **********************************************/
  const { setMyWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* ITEM CONTEXT **********************************************/
  const { item, loadingItem, showAsIgnored } = useContext(ItemContext);
  const { isCombo, elements } = item;
  /* end ITEM CONTEXT */

  const onChangeValue = useCallback(
    (newValue) => {
      setMyWants((oldMyWants) => {
        const oldMyWantsCopy = [...oldMyWants];
        const index = oldMyWantsCopy.findIndex((w) => w.id === wantGroup.id);
        if (oldMyWantsCopy[index]) {
          oldMyWantsCopy[index].value = newValue;
        }
        return oldMyWantsCopy;
      });
    },
    [setMyWants, wantGroup]
  );

  return (
    <>
      <div className="bg-item-200 rounded-md border border-item-300 shadow-xl w-full mb-2">
        <ItemXL hideWant onChangeValue={onChangeValue} />
      </div>
      <LoadingBox loading={loadingItem} />
    </>
  );
};

export default ItemUI;
