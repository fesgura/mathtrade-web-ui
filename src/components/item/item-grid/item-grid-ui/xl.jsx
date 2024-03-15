import { useContext } from "react";
import { ItemContext } from "@/context/item";
import ElementXL from "@/components/element/xl";
import I18N, { getI18Ntext } from "@/i18n";
import Value from "@/components/value";
import WantButton from "@/components/want-button";
import ItemComments from "@/components/item-comments";
import UserBox from "@/components/userBox";
import ItemTagList from "@/components/item-tags/item-taglist";
import Icon from "@/components/icon";
import { LoadingBox } from "@/components/loading";
import BanButton from "@/components/ban/button";
import clsx from "clsx";

const ItemXL = ({ onToggleExpanse }) => {
  /* ITEM CONTEXT **********************************************/
  const { item, loadingItem, showAsIgnored } = useContext(ItemContext);
  const { ban_id, isCombo, elements } = item;
  /* end ITEM CONTEXT */

  return (
    <div
      className={clsx("relative transition-opacity", {
        "opacity-30": showAsIgnored,
      })}
    >
      <div className="lg:p-5 p-3">
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
        {ban_id ? null : <ItemTagList />}
      </div>

      {ban_id ? null : <WantButton contextSize="xl" />}
      {onToggleExpanse ? (
        <button
          className="absolute top-1 right-1 aspect-square w-7 opacity-50 hover:opacity-100"
          onClick={onToggleExpanse}
        >
          <div data-tooltip={getI18Ntext("Cerrar")}>
            <Icon />
          </div>
        </button>
      ) : null}
      <LoadingBox loading={loadingItem} />
    </div>
  );
};

export default ItemXL;
