import { useRef, useMemo, useContext } from "react";
import { GridContext } from "@/context/myWants/grid";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import CellUI from "./ui";

const Cell = ({ rootRef, wantGroup, myItem }) => {
  const targetRef = useRef(null);
  const visible = useIntersectionObserver(rootRef, targetRef);

  /* GRID CONTEXT **********************************************/
  const { groupsVisible } = useContext(GridContext);
  /* end GRID CONTEXT */

  const hidden = useMemo(() => {
    if (myItem?.group && groupsVisible) {
      return !groupsVisible[myItem.group.id];
    }
    return false;
  }, [myItem, groupsVisible]);

  return (
    <td className="border-spacing-0 m-0 p-0 td-cell" ref={targetRef}>
      {!hidden && visible ? (
        <CellUI wantGroup={wantGroup} myItem={myItem} />
      ) : null}
    </td>
  );
};

export default Cell;
