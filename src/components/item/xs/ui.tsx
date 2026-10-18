import type { ReactNode } from "react";
import I18N from "@/i18n";
import Previewer from "@/components/previewer";
import UserBox from "@/components/userBox";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import clsx from "clsx";
import ValueMini from "@/components/value/mini";
import ElementXS from "./element";

type ItemXSUIProps = {
  className?: string;
  extraContent?: ReactNode;
  excluded?: boolean;
  hideUser?: boolean;
  hideValue?: boolean;
  // The eye opens the full copy, which names its owner. Provisional results
  // must not say who gives an item, so that screen turns the eye off.
  hidePreview?: boolean;
};

const ItemXSUI = ({
  className = "",
  extraContent = null,
  excluded = false,
  hideUser = false,
  hideValue = false,
  hidePreview = false,
}: ItemXSUIProps) => {
  const { item } = useContext(ItemContext);

  const { isCombo, elements, value, ban_id } = item;
  const showMeta = !hideUser || !hideValue || !hidePreview;

  return (
    <div
      className={clsx(
        "flex items-start gap-3 rounded-lg border shadow-sm text-black p-2.5",
        excluded || ban_id
          ? "bg-colorMain border-gray-200 opacity-45"
          : "bg-white border-gray-200",
        className
      )}
    >
      {extraContent ? <div className="pt-1.5 shrink-0">{extraContent}</div> : null}
      <div className="grow min-w-0 flex flex-col gap-2">
        <div className="flex flex-col gap-1.5">
          {isCombo ? (
            <h3 className="uppercase text-[9px] font-bold text-gray-900 leading-none">
              <I18N id="element-type-badge-0" />
            </h3>
          ) : null}
          {elements.map((element) => {
            return (
              <ElementXS key={element.id} element={element} isCombo={isCombo} />
            );
          })}
        </div>
        {ban_id ? (
          // This item is present in the list (e.g. an explicit "show
          // ignored" filter, or a stale cached response) but individually
          // banned by the viewer — say so instead of just dimming it with
          // no explanation.
          <p className="text-caption text-gray-500 italic">
            <I18N id="item.xs.ignoredLegend" />
          </p>
        ) : null}
        {showMeta ? (
          <div className="flex items-center gap-2 flex-wrap">
            {!hideUser ? <UserBox toLeft /> : null}
            <div className="flex items-center gap-2 ml-auto shrink-0">
              {!hideValue ? <ValueMini currentValue={value} /> : null}
              {hidePreview ? null : <Previewer />}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ItemXSUI;
