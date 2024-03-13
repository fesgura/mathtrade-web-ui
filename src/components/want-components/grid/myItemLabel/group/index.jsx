import { useMemo, useContext, useCallback } from "react";
import { GridContext } from "@/context/myWants/grid";
import Icon from "@/components/icon";
import { colorTagStyles } from "@/utils/color";

const Group = ({ myItem }) => {
  const { id, color, name, count } = myItem;

  /* GRID CONTEXT **********************************************/
  const { groupsVisible, setGroupsVisible } = useContext(GridContext);
  /* end GRID CONTEXT */

  const visible = useMemo(() => {
    return groupsVisible[id] || false;
  }, [id, groupsVisible]);

  const onClick = useCallback(() => {
    if (setGroupsVisible) {
      setGroupsVisible((oldGroupsVisible) => {
        const oldGroupsVisibleCopy = { ...oldGroupsVisible };
        oldGroupsVisibleCopy[id] = !oldGroupsVisible[id];
        return oldGroupsVisibleCopy;
      });
    }
  }, [id, setGroupsVisible]);

  return (
    <div
      className="w-8 h-40 border-b border-r border-gray-300 bg-bgg relative"
      style={colorTagStyles(color)}
    >
      <div className="text-left h-8 w-40 leading-none absolute bottom-0 left-8 origin-bottom-left -rotate-90 flex items-center gap-2">
        <button
          className={
            "w-7 h-8 text-2xl transition-transform" +
            (visible ? " rotate-90" : "")
          }
          onClick={onClick}
        >
          <Icon type="arrow-right" className="relative -top-[2px]" />
        </button>
        <h4
          className="cropped_1 text-xs font-bold"
          title={`${name} (${count})`}
        >{`${name} (${count})`}</h4>
      </div>
    </div>
  );
};

export default Group;
