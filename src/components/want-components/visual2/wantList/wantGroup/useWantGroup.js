import { useMemo, useCallback, useContext } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { colorTagStyles } from "@/utils/color";

const useWantGroup = (wantGroup, itemId) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const {
    id: wantGroupId,
    name,
    type,
    tag,
    wants,
    bgg_id,
    value,
    availables,
  } = wantGroup;

  const elementsThumbnails = useMemo(() => {
    if (wants && wants.length) {
      return wants.map((item) => {
        const { elements } = item;

        return (
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0] || elements[0]
        );
      });
    }

    if (availables && availables.length) {
      return availables.map((item) => {
        const { elements } = item;

        return (
          elements.filter((el) => {
            return el.bgg_id === bgg_id;
          })[0] || elements[0]
        );
      });
    }
    return [];
  }, [wants, availables, bgg_id]);

  const style = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  //////////////////////
  /* MYWANTS CONTEXT **********************************************/
  const { setChanges, changes /*, setMatchValues*/ } =
    useContext(MyWantsContext);
  /* end MYWANTS CONTEXT */

  const onToggle = useCallback(
    (valueToChange) => {
      setChanges((oldChanges) => {
        const oldChangesCopy = { ...oldChanges };
        oldChangesCopy[`${wantGroupId}_${itemId}`] = valueToChange;
        return oldChangesCopy;
      });
    },
    [setChanges, wantGroupId, itemId]
  );

  return {
    elementsThumbnails,
    style,
    name,
    type,
    value,
    canIwant: canI.want,
    onToggle,
  };
};

export default useWantGroup;
