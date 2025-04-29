import useFetch from "@/hooks/useFetch";
import { useState, useContext, useEffect, useCallback } from "react";
import { ItemPreviousMTContext } from "@/context/itemPreviousMT";

const useItemListPreviousMT = () => {
  const {
    mathTradePrevious,
    itemList,
    keyword,
    setKeyword,
    setItems,
    setItemsIdAdded,
  } = useContext(ItemPreviousMTContext);

  // My Items in PREVIOUS MathTrade ********************************************

  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoad = useCallback(
    (newItems) => {
      setIsLoaded(true);
      setItems(newItems);
    },
    [setItems]
  );

  const [getItems, , loading, error] = useFetch({
    endpoint: "GET_MYITEMS_PREVIOUSMT",
    initialState: [],
    afterLoad,
  });
  // END My Items in PREVIOUS MathTrade ********************************************

  useEffect(() => {
    if (mathTradePrevious) {
      setKeyword("");
      setItemsIdAdded([]);
      getItems({
        params: {
          "prev-math-id": mathTradePrevious?.id || 0,
        },
      });
    }
  }, [setKeyword, setItemsIdAdded, getItems, mathTradePrevious]);

  /************ */
  const afterAddItem = () => {};

  return {
    title: mathTradePrevious?.name || "Math Trade",
    isLoaded,
    itemList,
    keyword,
    setKeyword,
    loading,
    error,
    afterAddItem,
  };
};

export default useItemListPreviousMT;
