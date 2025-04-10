import StatusBadge from "@/components/status-badge";
import I18N from "@/i18n";
import Previewer from "@/components/previewer";
import UserBox from "@/components/userBox";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import clsx from "clsx";
import ValueMini from "@/components/value/mini";
import ElementXS from "./element";

const ItemXSUI = ({ className, extraContent, dark, hideUser, hideValue }) => {
  const { item } = useContext(ItemContext);

  const { isCombo, elements, value } = item;

  return (
    <div
      className={clsx(
        "flex lg:items-center gap-3 border border-item-700/60 min-h-[30px] shadow text-black",
        {
          "bg-item-200": !isCombo,
          "bg-item-300": isCombo,
        },
        className
      )}
    >
      {extraContent ? <div className="pl-2">{extraContent}</div> : null}
      <div className="grow">
        <div className="flex items-center py-1 justify-between gap-3">
          <div className="grow flex flex-wrap items-center gap-1">
            {isCombo ? (
              <h3 className="uppercase text-[9px] font-bold text-gray-900 leading-none">
                <I18N id="element-type-badge-0" />:
              </h3>
            ) : null}
            {elements.map((element) => {
              return (
                <ElementXS
                  key={element.id}
                  element={element}
                  isCombo={isCombo}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {!hideUser ? (
              <div>
                <UserBox toLeft />
              </div>
            ) : null}
            {!hideValue ? <ValueMini currentValue={value} /> : null}
            <div className="border-l border-gray-500/20">
              <Previewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemXSUI;
