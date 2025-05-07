import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";
import clsx from "clsx";

const GroupBadge = ({ group, isSelected, onAdd, canIEdit }) => {
  const { name, color, item_ids } = group;
  return (
    <div
      className={clsx(
        "rounded-md shadow-[0_0_1px_1px_rgba(0,0,0,.2)] flex items-center gap-1 h-[22px]",
        {
          "pl-3 pr-1": isSelected,
          "px-3": !isSelected,
          "cursor-pointer": canIEdit,
        }
      )}
      style={colorTagStyles(color)}
      onClick={() => {
        if (onAdd) {
          onAdd(group);
        }
      }}
    >
      <div
        className={clsx("whitespace-nowrap uppercase text-[10px] font-bold", {
          "pr-2": !canIEdit,
        })}
      >{`${name} (${item_ids.length})`}</div>
      {isSelected && canIEdit ? (
        <div className="leading-[18px] text-xl">
          <Icon type="arrow-down" />
        </div>
      ) : null}
    </div>
  );
};

export default GroupBadge;
