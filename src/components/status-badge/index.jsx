import {
  boxStatusTypes,
  componentsStatusTypes,
  INVALID_STATUS_KEY,
} from "@/config/statusTypes";
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import Icon from "@/components/icon";
import { useMemo } from "react";

const StatusBadge = ({ status, block, min, noTooltip, type }) => {
  const statusTypes = useMemo(() => {
    if (type === "box") {
      return boxStatusTypes;
    }
    return componentsStatusTypes;
  }, [type]);

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
          statusTypes[status]?.color || statusTypes[INVALID_STATUS_KEY].color,
      }}
      data-tooltip={
        noTooltip
          ? null
          : getI18Ntext(
              `statusType.${
                type === "box" ? "box" : "components"
              }.desc.${status}`
            )
      }
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
          ? statusTypes[status]?.min || statusTypes[INVALID_STATUS_KEY].min
          : statusTypes[status]?.text || statusTypes[INVALID_STATUS_KEY].text}
      </div>
    </div>
  ) : null;
};

export default StatusBadge;
