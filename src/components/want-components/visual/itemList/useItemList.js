import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import { WantVisualSectionContext } from "@/context/wantVisualSection";
import { getRightValue } from "@/components/want-components/utils";

const useItemList = (wantGroup, myItemList) => {
  /* PAGE CONTEXT **********************************************/
  const { canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const { matchValues, changes } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  /* MYWANTS CONTEXT **********************************************/
  const { setForceShow } = useContext(WantVisualSectionContext);
  /* end MYWANTS CONTEXT **********************************************/

  const [addOpen, setAddOpen] = useState(false);

  const toggleAddOpen = useCallback(() => {
    setAddOpen((v) => !v);
  }, []);

  useEffect(() => {
    setForceShow(addOpen);
  }, [setForceShow, addOpen]);

  const addPadRef = useRef(null);

  useEffect(() => {
    let timer = null;
    if (addOpen) {
      setTimeout(() => {
        addPadRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center", //"start" | "center" | "end" | "nearest";
          //      inline: "start" | "center" | "end" | "nearest";
        });
      }, 200);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [addOpen]);

  /******************************************************* */

  const { itemsAdded, itemsToAdd } = useMemo(() => {
    const { id: idGroup } = wantGroup;

    const itemsAdded = [];
    const itemsToAdd = [];

    myItemList.forEach((item) => {
      const value = getRightValue(
        matchValues,
        changes,
        `${idGroup}_${item.id}`
      );
      if (value) {
        itemsAdded.push(item);
      } else {
        if (canI.want) {
          itemsToAdd.push(item);
        }
      }
    });

    if (!itemsToAdd.length) {
      setAddOpen(false);
    }

    return { itemsAdded, itemsToAdd };
  }, [wantGroup, matchValues, changes, myItemList, canI]);

  return {
    wantGroupId: wantGroup.id,
    itemsAdded,
    itemsToAdd,
    addOpen,
    toggleAddOpen,
    addPadRef,
    canIwant: canI.want,
  };
};

export default useItemList;
