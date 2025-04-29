import { useRef, useMemo, useContext, useCallback } from "react";
import { ItemContext } from "@/context/item";

const useItemGrid = (expanded, setExpanded) => {
  const { item } = useContext(ItemContext);
  const { id: itemId, isCombo, ban_id } = item;

  const itemNode = useRef(null);

  const isExpanded = useMemo(() => {
    return expanded === itemId;
  }, [expanded, itemId]);

  const onToggleExpanse = useCallback(() => {
    if (isExpanded) {
      setExpanded(null);
      setTimeout(() => {
        itemNode.current.scrollIntoView({
          behavior: "smooth",
          block: "center", //"start" | "center" | "end" | "nearest";
        });
      }, 200);
    } else {
      setExpanded(itemId);
      setTimeout(() => {
        itemNode.current.scrollIntoView({
          behavior: "smooth",
          block: "start", //"start" | "center" | "end" | "nearest";
        });
      }, 200);
    }
  }, [isExpanded, setExpanded, itemId]);

  return {
    isCombo,
    ban_id,
    itemNode,
    isExpanded,
    onToggleExpanse,
  };
};
export default useItemGrid;
