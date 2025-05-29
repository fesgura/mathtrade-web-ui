import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import { ElementContext } from "@/context/element";
import { useContext } from "react";
import clsx from "clsx";
import I18N from "@/i18n";

const ElementXSUI = ({ isCombo }) => {
  const { element } = useContext(ElementContext);

  const { title, language, extraData } = element;

  const { box_status, component_status, comment } = extraData;

  return (
    <div
      className={clsx(
        "bg-white pr-2 rounded-md shadow-[0_0_0_1px_rgba(0,0,0,0.2)]",
        {
          grow: !isCombo,
        }
      )}
    >
      <div className="flex items-center gap-2">
        <div className="border-r border-gray-400">
          <Thumbnail elements={[element]} className="w-7 rounded-l-md" />
        </div>

        <div
          className={clsx({
            "flex items-center gap-2": !isCombo,
          })}
        >
          <div data-tooltip={title}>
            <h5
              className={clsx("font-bold  cropped_1", {
                "text-xs max-w-80": !isCombo,
                "text-[9px] sleading-none max-w-40": isCombo,
              })}
            >
              {title}
            </h5>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <StatusBadge status={box_status} type="box" min />
            <StatusBadge status={component_status} min />
            <div
              className={clsx("text-purple-800 font-bold cropped_1", {
                "text-xs max-w-40": !isCombo,
                "text-[9px] leading-none max-w-20": isCombo,
              })}
            >
              {language}
            </div>
            {comment && comment?.length > 0 ? (
              <div
                className="text-gray-400 font-bold cursor-default text-[8px] leading-none uppercase"
                data-tooltip={comment}
              >
                <I18N
                  id={`item.xs.element.description${isCombo ? ".min" : ""}`}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ElementXSUI;
