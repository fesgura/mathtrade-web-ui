import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import ItemXS from "@/components/item/xs";

const ItemOfTag = ({ item, itemIdsSelected, setItemIdsSelected }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const onChange = useCallback(
    ({ target }) => {
      setItemIdsSelected((oldItemIdsSelected) => {
        const oldItemIdsSelectedCopy = { ...oldItemIdsSelected };
        oldItemIdsSelectedCopy[item?.id] = target.checked;
        return oldItemIdsSelectedCopy;
      });
    },
    [item, setItemIdsSelected]
  );

  return (
    <ItemXS
      itemRaw={item}
      extraContent={
        <input
          type="checkbox"
          name={`item-${item?.id}`}
          className={!canI.want ? "cursor-not-allowed" : "cursor-pointer"}
          disabled={!canI.want}
          checked={itemIdsSelected[item?.id]}
          onChange={onChange}
        />
      }
    />
  );
};

export default ItemOfTag;
