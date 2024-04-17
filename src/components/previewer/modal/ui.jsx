import { useContext } from "react";
import { ItemContext } from "@/context/item";
import ElementXL from "@/components/element/xl";
import I18N from "@/i18n";
import Value from "@/components/value";
import ItemComments from "@/components/item-comments";
import UserBox from "@/components/userBox";
import ItemTagList from "@/components/item-tags/item-taglist";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";
import BanButton from "@/components/ban/button";
import clsx from "clsx";

const ItemUI = () => {
  /* ITEM CONTEXT **********************************************/
  const { item, loadingItem, showAsIgnored } = useContext(ItemContext);
  const { isCombo, elements } = item;
  /* end ITEM CONTEXT */

  return (
    <>
      {isCombo ? (
        <h3 className="pb-3 flex gap-2">
          <div className="uppercase text-sm font-bold text-gray-900 ">
            <I18N id="element-type-badge-0" />
          </div>
          <Value size="xl" type="item" />
          <BanButton size="xl" type="item" />
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
  );
};

export default ItemUI;
