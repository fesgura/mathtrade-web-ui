import StatusBadge from "@/components/status-badge";
import Previewer from "@/components/previewer";
import UserBox from "@/components/userBox";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import clsx from "clsx";
import ValueMini from "@/components/value/mini";

const ItemXSUI = ({ className, extraContent, dark, hideUser, hideValue }) => {
  const { item } = useContext(ItemContext);

  const { isCombo, title, status, language, elements, value } = item;

  return (
    <div
      className={clsx(
        "flex lg:items-center gap-3  border min-h-[30px] ",
        {
          "border-gray-500/20 shadow": !dark,
          "border-white/20": dark,
        },
        className
      )}
    >
      {extraContent ? <div className="pl-2">{extraContent}</div> : null}
      <div className="grow">
        <div className="flex items-center py-1 justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <div>
              <Thumbnail elements={elements} className="w-7" />
            </div>
            <div data-tooltip={title}>
              <h3 className="text-xs font-bold cropped_1 max-w-[260px]">
                {isCombo && (
                  <>
                    <span className="underline">Combo</span>:{" "}
                  </>
                )}
                {title}
              </h3>
            </div>

            {!isCombo && (
              <>
                <div className="max-w-[200px]" data-tooltip={language}>
                  <div className="text-xs cropped_1">{language}</div>
                </div>
                <div className="max-w-[120px]">
                  <StatusBadge status={status} min />
                </div>
              </>
            )}

            {!hideUser ? (
              <div>
                <UserBox toLeft />
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {!hideValue ? <ValueMini currentValue={value} /> : null}
            <div
              className={clsx("border-l", {
                "border-gray-500/20": !dark,
                "border-white/20": dark,
              })}
            >
              <Previewer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ItemXSUI;
