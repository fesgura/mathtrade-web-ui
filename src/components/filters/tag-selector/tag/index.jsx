import clsx from "clsx";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";

const Tag = ({ tag, selected, selectTag, notTag }) => {
  const { id, text, color, count } = tag || {};
  return (
    <div
      className={clsx("relative rounded-md shadow-md mb-2 border", {
        "border-gray-300": !notTag,
        "border-dashed border-gray-600": notTag,
      })}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 h-full transition-[width_0.6s]",
          {
            "w-5 rounded-l-md": !selected && !notTag,
            "w-full rounded-md": selected || notTag,
          }
        )}
        style={{ backgroundColor: color?.backgroundColor || "#EEE" }}
      />
      <div
        className="pl-5 pr-3"
        style={{ color: selected ? color?.color || "#666" : "#666" }}
      >
        <div
          className={clsx(
            "relative py-2 pl-3 font-bold text-sm  transition-[color_0.4s]",
            {
              uppercase: !notTag,
              "cursor-pointer": !selected,
              "cursor-default": selected,
            }
          )}
          onClick={() => {
            selectTag(id);
          }}
        >
          {notTag ? <Icon /> : null}
          {text || getI18Ntext("tag.noTag")}
          {count ? <span> ({count})</span> : null}
        </div>
      </div>
    </div>
  );
};

export default Tag;
