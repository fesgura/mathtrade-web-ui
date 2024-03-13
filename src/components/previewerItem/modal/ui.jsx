import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementXL from "@/components/element/xl";
import I18N from "@/i18n";
import Value from "@/components/value";
import ItemComments from "@/components/item-comments";
import { LoadingBox } from "@/components/loading";

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
    <>
      {isCombo ? (
        <h3 className="pb-3 flex gap-2">
          <div className="uppercase text-sm font-bold text-gray-900 ">
            <I18N id="element-type-badge-0" />
          </div>
          <Value size="xl" type="item" onChange={onChangeValue} />
        </h3>
      ) : null}
      {elements.map((element) => {
        return (
          <ElementXL
            key={element.id}
            element={element}
            onChangeValue={onChangeValue}
          />
        );
      })}
      <div className="py-4 border-t border-gray-300 border-dotted">
        <ItemComments className="pb-5" />
      </div>

      <LoadingBox loading={loadingItem} />
    </>
  );
};

export default ItemUI;
