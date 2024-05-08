import PreviewerWantGroup from "@/components/previewerWantGroup";
import clsx from "clsx";
import { colorTagStyles } from "@/utils/color";
import { useMemo } from "react";
import ValueMini from "@/components/value/mini";

const WantGroupLabelUI = ({ wantGroup }) => {
  const { name, type, tag, wants, value } = wantGroup;

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  return (
    <div
      className={clsx(
        "h-8 w-64 border-b border-r  flex items-center justify-between gap-1 pl-2",
        {
          "bg-gray-900 text-white border-gray-700": type === "game",
          "bg-white border-gray-300": type === "item",
          "shadow-[inset_0_0_0_3px_red]": !wants.length,
        }
      )}
      style={style}
    >
      <h4 className="cropped_1 text-xs font-bold" title={name}>
        {`${name}${type === "tag" ? ` (${wants.length})` : ""}`}
      </h4>
      <div className="flex items-center gap-1">
        <ValueMini currentValue={value} />
        <div className="w-6">
          <PreviewerWantGroup
            wantGroup={wantGroup}
            className={`border-l border-gray-${
              type === "game" ? 700 : type === "item" ? 300 : 600
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default WantGroupLabelUI;
