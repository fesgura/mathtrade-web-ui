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

const useWantList = ({ id: itemId }) => {
  /* PAGE CONTEXT **********************************************/
  const { canI, myWants } = useContext(PageContext);
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

  const { wantsAdded, wantsToAdd } = useMemo(() => {
    const wantsAdded = [];
    const wantsToAdd = [];

    myWants.forEach((wg) => {
      const value = getRightValue(matchValues, changes, `${wg.id}_${itemId}`);
      if (value) {
        wantsAdded.push(wg);
      } else {
        if (canI.want) {
          wantsToAdd.push(wg);
        }
      }
    });

    if (!wantsToAdd.length) {
      setAddOpen(false);
    }

    return { wantsAdded, wantsToAdd };
  }, [myWants, itemId, canI, matchValues, changes]);

  return {
    itemId,
    wantsAdded,
    wantsToAdd,
    addOpen,
    toggleAddOpen,
    addPadRef,
    canIwant: canI.want,
  };
};

export default useWantList;
