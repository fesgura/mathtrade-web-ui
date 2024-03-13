import { useMemo, useRef, useContext } from "react";
import { GridContext } from "@/context/myWants/grid";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import MyItemLabelUI from "./ui";

const MyItemLabel = ({ rootRef, myItem }) => {
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
    <div className={"h-40" + (hidden ? " w-0" : " w-8")} ref={targetRef}>
      {!hidden && visible ? <MyItemLabelUI myItem={myItem} /> : null}
    </div>
  );
};

export default MyItemLabel;
