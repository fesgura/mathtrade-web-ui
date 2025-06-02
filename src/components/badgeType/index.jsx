import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";

const BadgeType = ({ type, subtype = 1, isCombo, className }) => {
  return (
    <div
      className={clsx(
        "inline-block uppercase leading-[1.7] px-2 font-bold rounded-[3px]",
        {
          "bg-orange-700 text-white": type === "game" && subtype === 1,
          "bg-lime-700 text-white": type === "game" && subtype === 2,
          "bg-sky-300/80 text-sky-900 border border-sky-400":
            type === "item" && subtype === 1,
          "bg-purple-300/80 text-purple-900 border border-purple-400":
            type === "item" && subtype === 2,
          "bg-yellow-300 text-black border border-yellow-600": subtype === 3,
          "bg-gray-300 text-gray-900 border border-gray-500": type === "tag",
        },
        className
      )}
    >
      <I18N id={`cart.wantGroup.type.${type}.${subtype || 1}`} />

      {isCombo ? ` - ${getI18Ntext("element-type-badge-0")}` : null}
    </div>
  );
};

export default BadgeType;
