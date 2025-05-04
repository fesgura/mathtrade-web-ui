import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ItemXL from "@/components/item/item-grid/item-grid-ui/xl";

const ItemUI = () => {
  /* PAGE CONTEXT **********************************************/
  const { setMyItemsInMT_forWants } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* ITEM CONTEXT **********************************************/
  const { item, loadingItem } = useContext(ItemContext);
  const { id, isCombo, elements } = item;

  /* end ITEM CONTEXT */

  const onChangeValue = useCallback(
    (newValue) => {
      setMyItemsInMT_forWants((oldMyItemsInMT) => {
        const oldMyItemsInMTCopy = [...oldMyItemsInMT];
        const index = oldMyItemsInMTCopy.findIndex((w) => w.id === id);

        if (oldMyItemsInMTCopy[index]) {
          oldMyItemsInMTCopy[index].value = newValue;
        }
        return oldMyItemsInMTCopy;
      });
    },
    [setMyItemsInMT_forWants, id]
  );

  return (
    <div className="bg-item-200 rounded-md border border-item-300 shadow-xl w-full">
      <ItemXL hideWant hideTags onChangeValue={onChangeValue} />
    </div>
  );
};

export default ItemUI;
