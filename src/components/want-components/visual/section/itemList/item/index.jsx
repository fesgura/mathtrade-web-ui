import Thumbnail from "@/components/thumbnail";
import PreviewerItem from "@/components/previewerItem";
import ValueMini from "@/components/value/mini";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import useItem from "./useItem";

const ItemToOffer = ({ item, toAdd, wantGroupId }) => {
  const { id, title, elements, value, onToggle, canIwant } = useItem(
    item,
    wantGroupId
  );

  return (
    <div
      className={clsx("relative rounded-lg bg-white", {
        "shadow-xl": !toAdd,
        "border border-gray-300": toAdd,
      })}
    >
      <div className=" border-b border-gray-300 relative">
        <Thumbnail
          elements={elements || []}
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
        <div className="absolute bg-primary text-white sm:bottom-1 bottom-0 sm:left-1 left-0 rounded-full">
          <PreviewerItem itemId={id} className="rounded-full" />
        </div>
        <div className="absolute sm:bottom-1 bottom-0 sm:right-1 right-0">
          <ValueMini currentValue={value} />
        </div>
      </div>
      <div className="text-center p-1 sm:w-32 w-16">
        <h4
          className="text-[10px] leading-3 font-bold cropped cursor-default"
          title={title}
        >
          {title}
        </h4>
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

export default ItemToOffer;
