import Thumbnail from "@/components/thumbnail";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import clsx from "clsx";
import { useMemo } from "react";
import { colorTagStyles } from "@/utils/color";
import I18N from "@/i18n";
import ValueMini from "@/components/value/mini";

const WantGroupUI = ({ wantGroup }) => {
  const { name, type, tag, wants, bgg_id, value, availables } = wantGroup;

  console.log(wantGroup);

  const elementsThumbnails = useMemo(() => {
    if (wants && wants.length) {
      return wants.map((item) => {
        const { elements } = item;

        return (
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0] || elements[0]
        );
      });
    }

    if (availables && availables.length) {
      return availables.map((item) => {
        const { elements } = item;

        return (
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0] || elements[0]
        );
      });
    }
    return [];
  }, [wants, availables, bgg_id]);

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  return (
    <div
      className={clsx("sm:p-3 p-1 rounded-lg shadow-xl", {
        "bg-gray-900 text-white border-gray-700": type === "game",
        "bg-white border-gray-300": type === "item",
        //  "bg-teal-600 text-white border-gray-600": type === "tag",
      })}
      style={style}
    >
      <div className="rounded-lg border border-gray-400 relative">
        <Thumbnail
          elements={elementsThumbnails}
          className="rounded-lg sm:w-52 w-24"
        />
        <div className="absolute bg-primary text-white bottom-1 left-1 rounded-full">
          <PreviewerWantGroup wantGroup={wantGroup} className="rounded-full" />
        </div>
        <div className="absolute bottom-1 right-1">
          <ValueMini currentValue={value} />
        </div>
      </div>
      <div className="text-center px-2 sm:pt-3 pt-1 sm:w-52 w-24 cursor-default">
        <h4 className="text-xs font-bold sm:mb-1 cropped" title={name}>
          {`${name}${type === "tag" ? ` (${wants.length})` : ""}`}
        </h4>
        <p className="uppercase text-[9px] font-bold opacity-50">
          <I18N id={`cart.wantGroup.type.${type}`} />
        </p>
      </div>
    </div>
  );
};

export default WantGroupUI;
