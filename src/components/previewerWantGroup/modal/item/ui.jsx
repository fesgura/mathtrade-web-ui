import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ElementXL from "@/components/element/xl";
import I18N from "@/i18n";
import Value from "@/components/value";
import ItemComments from "@/components/item-comments";
import UserBox from "@/components/userBox";
import ItemTagList from "@/components/item-tags/item-taglist";
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

/*




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
        return <ElementXL key={element.id} element={element} />;
      })}
      <div className="py-4 border-t border-gray-300 border-dotted">
        <UserBox />
      </div>
      <ItemComments className="pb-5" />
      <LoadingBox loading={loadingItem} />
    </>











*/
