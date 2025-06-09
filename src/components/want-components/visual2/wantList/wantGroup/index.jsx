import Thumbnail from "@/components/thumbnail";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import clsx from "clsx";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import ValueMini from "@/components/value/mini";
import useWantGroup from "./useWantGroup";
import BadgeType from "@/components/badgeType";

const WantGroupVisual2 = ({ wantGroup, itemId, toAdd }) => {
  const {
    isCombo,
    elementsThumbnails,
    style,
    name,
    type,
    game_type,
    value,
    onToggle,
    canIwant,
  } = useWantGroup(wantGroup, itemId);

  return (
    <div
      className={clsx("relative rounded-lg border", {
        "bg-gray-900 text-white border-gray-400": type === "game",
        "border-gray-400": type === "tag",
        "bg-item-200 border-item-300": type === "item" && !isCombo,
        "bg-item-300 border-item-400": type === "item" && isCombo,
        "shadow-xl": !toAdd,
        "border border-gray-300": toAdd,
      })}
      style={style}
    >
      <div className=" border-b border-gray-300 relative">
        <Thumbnail
          elements={elementsThumbnails}
          className="rounded-tl-lg rounded-tr-lg sm:w-32 w-16"
        />
        {toAdd ? (
          <button
            className="absolute top-0 left-0 w-full h-full bg-black/60 text-white rounded-tl-lg rounded-tr-lg text-5xl opacity-0 hover:opacity-100 transition-opacity"
            title={getI18Ntext("btn.Add")}
            onClick={() => {
              onToggle(true);
            }}
          >
            <Icon type="plus" />
            <div className="uppercase text-xs font-bold leading-none">
              <I18N id="btn.Add" />
            </div>
          </button>
        ) : null}
        <div className="absolute bg-primary text-white bottom-1 left-1 rounded-full">
          <PreviewerWantGroup wantGroup={wantGroup} className="rounded-full" />
        </div>
        <div className="absolute bottom-1 right-1">
          <ValueMini currentValue={value} />
        </div>
      </div>
      <div className="text-center p-1 sm:w-32 w-16">
        <div
          className={clsx({
            "bg-white rounded-lg p-1 border border-gray-300": type === "item",
          })}
        >
          <h4
            className="text-[10px] leading-3 font-bold cropped cursor-default"
            title={name}
          >
            {name}
          </h4>
          <BadgeType
            className="text-[9px]"
            type={type}
            subtype={game_type || 1}
            isCombo={isCombo}
          />
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

export default WantGroupVisual2;
