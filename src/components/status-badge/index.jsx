import { statusTypes } from "@/config/statusTypes";
import { getI18Ntext } from "@/i18n";
import clsx from "clsx";

const StatusBadge = ({ status, block, min }) => {
  return status ? (
    <div
      className={clsx(
        "text-white px-2 font-bold uppercase rounded-sm cursor-default text-nowrap text-center",
        {
          "text-[10px]": !min,
          "text-[8px] block": min,
          "inline-block": !min && !block,
          block,
        }
      )}
      style={{
        backgroundColor: statusTypes[status]?.color || "#CCC",
      }}
      data-tooltip={getI18Ntext(`statusType.desc.${status}`)}
    >
      {statusTypes[status]?.text || ""}
    </div>
  ) : null;
};

export default StatusBadge;
