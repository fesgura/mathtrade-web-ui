import { useContext, useEffect, useMemo, useState } from "react";
import { PrintTagsContext } from "../context";
import { elementPerPage } from "../config";
import type { Tag } from "../types";

const useRenderer = (tags: Tag[]) => {
  const { setPages } = useContext(PrintTagsContext);

  const list = useMemo(() => {
    const list: Tag[][] = [];

    let d = 0;
    while (d < tags.length) {
      const segment = tags.slice(d, d + elementPerPage);
      list.push(segment);
      d += elementPerPage;
    }

    return list;
  }, [tags]);

  const [canvasList, setCanvasList] = useState<Tag[][]>([]);

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
