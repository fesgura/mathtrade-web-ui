import { useContext } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Previewer from "@/components/previewer";
import ValueMini from "@/components/value/mini";
import I18N from "@/i18n";
import Element from "./element";
import clsx from "clsx";

const ItemVisual2UI = () => {
  const { item } = useContext(ItemContext);
  const { id, elements, value, isCombo } = item;

  return (
    <div
      className={clsx("rounded-lg border sm:w-52 w-24 p-2 shadow-xl", {
        "bg-item-200 border-item-300": !isCombo,
        "bg-item-300 border-item-400": isCombo,
      })}
    >
      {elements[0] ? <Element element={elements[0]} /> : null}

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
    </div>
  );
};

const ItemVisual2 = ({ itemRaw }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemVisual2UI />
    </ItemContextProvider>
  );
};
export default ItemVisual2;
