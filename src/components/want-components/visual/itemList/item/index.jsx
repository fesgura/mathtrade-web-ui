import useItem from "./useItem";
import { ItemContextProvider } from "@/context/item";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import Previewer from "@/components/previewer";
import ValueMini from "@/components/value/mini";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import Element from "./element";

const ItemUI = ({ toAdd, onToggle, canIwant }) => {
  const { item } = useContext(ItemContext);

  const { id, elements, value, isCombo } = item;

  return (
    <div
      className={clsx("relative rounded-lg border sm:w-32 w-16 p-1", {
        "shadow-xl": !toAdd,
        "border border-gray-300": toAdd,
        "bg-item-200 border-item-300": !isCombo,
        "bg-item-300 border-item-400": isCombo,
      })}
    >
      {elements[0] ? (
        <Element element={elements[0]} toAdd={toAdd} onToggle={onToggle} />
      ) : null}

      <div className="flex items-center gap-1 pt-1 justify-between">
        <div className="">
          {isCombo ? (
            <div className="uppercase text-[10px] font-bold text-gray-700">
              <I18N id="element-type-badge-0" />
            </div>
          ) : (
            " "
          )}
        </div>
        <div className="flex items-center gap-1">
          <ValueMini currentValue={value} />
          <div className="">
            <Previewer
              itemId={id}
              className="bg-primary text-white rounded-full text-sm  w-5 h-5 leading-none"
            />
          </div>
        </div>
      </div>

      {!toAdd && canIwant ? (
        <button
          className="-top-1 -right-1 absolute w-4 h-4 rounded-full bg-danger text-white text-sm leading-none"
          title={getI18Ntext("wantview.RemoveItems")}
          onClick={() => {
            onToggle(false);
          }}
        >
          <Icon />
        </button>
      ) : null}
    </div>
  );
};

const ItemToOffer = ({ item, toAdd, wantGroupId }) => {
  const { onToggle, canIwant } = useItem(item, wantGroupId);

  return (
    <ItemContextProvider itemRaw={item}>
      <ItemUI toAdd={toAdd} onToggle={onToggle} canIwant={canIwant} />
    </ItemContextProvider>
  );
};

export default ItemToOffer;
