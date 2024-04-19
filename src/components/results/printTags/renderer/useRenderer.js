import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ResultsContext } from "@/context/results";
import { PrintTagsContext } from "../context";
import { dataToTag } from "./utils";
import { elementPerPage } from "../config";

const useRenderer = () => {
  /* RESULTS CONTEXT *****************************************/
  const { MathTradeResults } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  const { setPages } = useContext(PrintTagsContext);

  const list = useMemo(() => {
    if (!MathTradeResults || !MathTradeResults.length) {
      return [];
    }

    const items = [];

    MathTradeResults.forEach((mtr) => {
      const o = dataToTag(mtr);
      if (o) {
        items.push(o);
      }
    });

    const list = [];

    let d = 0;
    while (d < items.length) {
      const segment = items.slice(d, d + elementPerPage);
      list.push(segment);
      d += elementPerPage;
    }

    return list;
  }, [MathTradeResults]);

  const [canvasList, setCanvasList] = useState([]);

  useEffect(() => {
    setPages([]);
    setCanvasList([]);
    let timer = setTimeout(() => {
      setCanvasList(list);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [setPages, list]);

  return { canvasList };
};

export default useRenderer;
