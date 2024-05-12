import { useMemo, useContext, useCallback } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { getRightValue } from "../../utils";

const useCell = (wantGroup, myItem) => {
  const { color } = myItem;

  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const { matchValues, changes, setChanges /*, setMatchValues*/ } =
    useContext(MyWantsContext);
  /* end MYWANTS CONTEXT */

  const { value, isIndeterminate } = useMemo(() => {
    if (myItem?.isGroup) {
      let allGroupChecked = true;
      let no = 0;
      let yes = 0;

      myItem.items.forEach((item_id) => {
        if (
          !getRightValue(matchValues, changes, `${wantGroup.id}_${item_id}`)
        ) {
          allGroupChecked = false;
          no++;
        } else {
          yes++;
        }
      });

      return { value: allGroupChecked, isIndeterminate: no > 0 && yes > 0 };
    }

    return {
      value: getRightValue(
        matchValues,
        changes,
        `${wantGroup.id}_${myItem.id}`
      ),
      isIndeterminate: false,
    };
  }, [wantGroup, myItem, matchValues, changes]);

  const title = useMemo(() => {
    return `${wantGroup?.name || ""}\n↓↑\n${myItem?.title || ""}`;
  }, [wantGroup, myItem]);

  const onClick = useCallback(() => {
    let itemsToChange = [];
    let valueToChange = !value;
    if (myItem?.isGroup) {
      itemsToChange = myItem.items;
      valueToChange = isIndeterminate ? true : valueToChange;
    } else {
      itemsToChange = [myItem.id];
    }

    setChanges((oldChanges) => {
      const oldChangesCopy = { ...oldChanges };
      itemsToChange.forEach((item_id) => {
        oldChangesCopy[`${wantGroup.id}_${item_id}`] = valueToChange;
      });
      return oldChangesCopy;
    });
  }, [
    wantGroup,
    myItem,
    value,
    isIndeterminate,
    setChanges /*, setMatchValues*/,
  ]);

  return { value, isIndeterminate, onClick, color, canIwant: canI.want, title };
};

export default useCell;
