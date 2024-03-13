import { useRef, useMemo, useContext, useCallback } from "react";
import { ItemContext } from "@/context/item";

const useItemGrid = (expanded, setExpanded) => {
  const { item } = useContext(ItemContext);

  const itemNode = useRef(null);

  const isExpanded = useMemo(() => {
    return expanded === item.id;
  }, [expanded, item.id]);

  const onToggleExpanse = useCallback(() => {
    if (isExpanded) {
      setExpanded(null);
      setTimeout(() => {
        itemNode.current.scrollIntoView({
          behavior: "smooth",
          block: "center", //"start" | "center" | "end" | "nearest";
          //      inline: "start" | "center" | "end" | "nearest";
        });
      }, 200);
    } else {
      setExpanded(item.id);
      setTimeout(() => {
        itemNode.current.scrollIntoView({
          behavior: "smooth",
          block: "start", //"start" | "center" | "end" | "nearest";
          //      inline: "start" | "center" | "end" | "nearest";
        });
      }, 200);
    }
  }, [isExpanded, setExpanded, item.id]);

  return {
    itemNode,
    isExpanded,
    onToggleExpanse,
  };
};
export default useItemGrid;
