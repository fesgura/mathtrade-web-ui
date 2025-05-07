import { useState } from "react";
import { colorTagStyles } from "@/utils/color";
import clsx from "clsx";
import { useMemo } from "react";
import GroupEditor from "./editor";
import Icon from "@/components/icon";
import Value from "@/components/value";

const GroupSidebar = ({ group, selected, selectGroup, canIEdit }) => {
  const { id, name, color, item_ids } = group;

  const [visibleEdit, setVisibleEdit] = useState(false);

  const colorTag = useMemo(() => {
    return colorTagStyles(color);
  }, [color]);

  return visibleEdit ? (
    <GroupEditor
      group={group}
      selected={selected}
      onClose={() => {
        setVisibleEdit(false);
      }}
    />
  ) : (
    <div
      className={clsx(
        "relative rounded-md shadow-md mb-2 border border-gray-300  transition-opacity",
        {
          // "hover:opacity-70": !selected,
        }
      )}
    >
      <div
        className={clsx(
          "absolute top-0 left-0 h-full transition-[width_0.6s]",
          {
            "w-5 rounded-l-md": !selected,
            "w-full rounded-md": selected,
          }
        )}
        style={{ backgroundColor: colorTag.backgroundColor }}
      />
      <div
        className="flex items-center justify-between pl-5 pr-3"
        style={{ color: selected ? colorTag.color : "#000" }}
      >
        <div
          className={clsx(
            "relative py-2 pl-3  uppercase font-bold text-sm  transition-[color_0.4s]",
            {
              "cursor-pointer": !selected,
            }
          )}
          onClick={() => {
            selectGroup(id);
          }}
        >{`${name} (${item_ids.length})`}</div>

        <div className="flex items-center gap-1">
          <Value size="tag" type="group" groupId={id} />
          {canIEdit && (
            <button
              className="hover:bg-black/20 px-1 rounded-full"
              onClick={() => {
                setVisibleEdit(true);
              }}
            >
              <Icon type="edit" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupSidebar;
