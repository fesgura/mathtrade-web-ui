import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import clsx from "clsx";

const GroupBadge = ({ group, isSelected, onAdd }) => {
  const { name, color, item_ids } = group;
  return (
    <div
      className={clsx(
        "rounded-sm shadow-md flex items-center gap-1 cursor-pointer",
        {
          "pl-3 pr-1": isSelected,
          "px-3": !isSelected,
        }
      )}
      style={colorTagStyles(color)}
      onClick={() => {
        if (onAdd) {
          onAdd(group);
        }
      }}
    >
      <div className="whitespace-nowrap uppercase text-[10px] font-bold leading-5 cursor-pointer">{`${name} (${item_ids.length})`}</div>
      {isSelected ? (
        <div className=" text-xl leading-5">
          <Icon type="arrow-down" />
        </div>
      ) : null}
    </div>
  );
};

export default GroupBadge;
