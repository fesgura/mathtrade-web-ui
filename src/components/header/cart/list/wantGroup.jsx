import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const WantGroup = ({ wantGroup }) => {
  const { name, type, wants, isNewHot, isUpdatedHot } = wantGroup;

  return (
    <div
      className={clsx("border-b border-gray-200 p-2", {
        "bg-want/10": isNewHot || isUpdatedHot,
      })}
    >
      <h4 className="text-xs font-bold cropped">{name}</h4>
      <div className="text-[9px] text-gray-400 font-bold">
        <span className="uppercase">
          <I18N id={`cart.wantGroup.type.${type}`} />
        </span>
        {type !== "item"
          ? ` (${wants.length} ${getI18Ntext(
              `cart.wantGroup.item.${
                wants.length === 1 ? "singular" : "plural"
              }`
            )})`
          : null}
        {isUpdatedHot ? (
          <span className="uppercase ml-1 inline-block text-want">
            <I18N id="want.updated.label" />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default WantGroup;
