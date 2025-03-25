import useFetch from "@/hooks/useFetch";
import { useRef, useMemo, useContext, useCallback } from "react";
import { ItemContext } from "@/context/item";
import { ItemPreviousMTContext } from "@/context/itemPreviousMT";

const useItemPreviousMT = () => {
  const { setItemsIdAdded } = useContext(ItemPreviousMTContext);

  const { item } = useContext(ItemContext);
  const { id, isCombo, value, elements } = item;

  // Post Item from PREVIOUS MathTrade ********************************************
  const afterLoad = useCallback(() => {
    setItemsIdAdded((prev) => {
      return [...prev, id];
    });
  }, [id, setItemsIdAdded]);

  const [postItem, , loading, error] = useFetch({
    endpoint: "POST_ITEM_PREVIOUSMT",
    method: "POST",
    afterLoad,
  });
  // END Post Item from PREVIOUS MathTrade ********************************************

  const addToMT = useCallback(() => {
    postItem({
      params: { item_id: id },
    });
  }, [postItem, id]);

  return { isCombo, value, elements, addToMT, loading, error };
};

export default useItemPreviousMT;
