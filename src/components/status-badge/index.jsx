import {
  statusTypes,
  validStatusKeys,
  invalidStatusKey,
} from "@/config/statusTypes";
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import Icon from "@/components/icon";

const StatusBadge = ({ status, block, min, noTooltip, type }) => {
  return status ? (
    <div
      className={clsx(
        "text-white font-bold uppercase rounded-sm cursor-default text-nowrap text-center flex items-center w-fit",
        {
          "text-[10px]": !min,
          "text-[8px] block": min,
          block,
        }
      )}
      style={{
        backgroundColor:
          statusTypes[status]?.color || statusTypes[invalidStatusKey].color,
      }}
      data-tooltip={noTooltip ? null : getI18Ntext(`statusType.desc.${status}`)}
    >
      <div
        className={clsx("rounded-l-sm px-1 border-r border-white/30", {
          "bg-item-900": type === "box",
          "bg-black": type !== "box",
        })}
      >
        <Icon type={`status-${type === "box" ? "box" : "components"}`} />
      </div>

      <div className="px-1">
        {min
          ? statusTypes[status]?.min || statusTypes[invalidStatusKey].min
          : statusTypes[status]?.text || statusTypes[invalidStatusKey].text}
      </div>
    </div>
  ) : null;
};

export default StatusBadge;
