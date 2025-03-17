import Thumbnail from "@/components/thumbnail";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import clsx from "clsx";
import { useMemo } from "react";
import { colorTagStyles } from "@/utils/color";
import I18N, { getI18Ntext } from "@/i18n";
import ValueMini from "@/components/value/mini";

const WantGroupUI = ({ wantGroup }) => {
  const { name, type, game_type, tag, wants, bgg_id, value, availables } =
    wantGroup;

  const isCombo = type === "item" && wants?.[0].elements.length > 1;

  const elementsThumbnails = useMemo(() => {
    let elementThumb = [];
    if (wants && wants.length) {
      wants.forEach((item) => {
        const { elements } = item;

        elementThumb =
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0]?.element || elements[0]?.element;
      });
    }

    if (availables && availables.length) {
      availables.forEach((item) => {
        const { elements } = item;

        elementThumb =
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0]?.element || elements[0]?.element;
      });
    }

    if (type === "game" && elementThumb?.game?.game_thumbnail) {
      return [{ thumbnail: elementThumb.game.game_thumbnail }];
    }

    return [elementThumb];
  }, [type, wants, availables, bgg_id]);

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  return (
    <div
      className={clsx("sm:p-3 p-1 border rounded-lg relative", {
        "bg-gray-900 text-white border-gray-700": type === "game",
        "bg-item-200 border-item-300": type === "item",
        //  "bg-teal-600 text-white border-gray-600": type === "tag",
        "shadow-[inset_0_0_0_5px_red]": !wants.length,
        "shadow-xl": wants.length,
      })}
      style={style}
    >
      {!wants.length ? (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center z-50 rounded-lg py-1 px-2 text-sm">
          <I18N id="noOptionsInWant" />
        </div>
      ) : null}
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
        <div
          className={clsx({
            "bg-white p-1 border border-gray-300 rounded-lg": type === "item",
          })}
        >
          <h4 className="text-xs font-bold sm:mb-1 cropped" title={name}>
            {`${name}${type === "tag" ? ` (${wants.length})` : ""}`}
          </h4>
          <p className="uppercase text-[9px] font-bold opacity-50">
            <I18N id={`cart.wantGroup.type.${type}.${game_type || 1}`} />
            {isCombo ? ` - ${getI18Ntext("element-type-badge-0")}` : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WantGroupUI;
