import { useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";

const useItem = (item, wantGroupId) => {
  const { id, title, elements, value } = item;

  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const { setChanges /*, setMatchValues*/ } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT */

  const onToggle = useCallback(
    (valueToChange) => {
      setChanges((oldChanges) => {
        const oldChangesCopy = { ...oldChanges };
        oldChangesCopy[`${wantGroupId}_${id}`] = valueToChange;
        return oldChangesCopy;
      });
    },
    [setChanges, wantGroupId, id]
  );

  return { id, title, elements, value, onToggle, canIwant: canI.want };
};

export default useItem;
