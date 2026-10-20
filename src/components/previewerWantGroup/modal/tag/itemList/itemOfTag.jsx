import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import ItemXS from "@/components/item/xs";
import { getI18Ntext } from "@/i18n";

const ItemOfTag = ({ item, itemIdsSelected, setItemIdsSelected }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const blocked = !!item?.contains_offered;

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
          title={blocked ? getI18Ntext("want.skipOfferedCombo") : undefined}
          className={
            !canI.want || blocked ? "cursor-not-allowed" : "cursor-pointer"
          }
          disabled={!canI.want || blocked}
          checked={blocked ? false : itemIdsSelected[item?.id]}
          onChange={onChange}
        />
      }
    />
  );
};

export default ItemOfTag;
