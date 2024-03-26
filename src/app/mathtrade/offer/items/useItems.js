import useFetch from "@/hooks/useFetch";
import { useCallback, useState, useContext, useEffect } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";

const useItems = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    reloadValue,
    items,
    setItems,
    setItemTags,
    setPageType,
    setMyWants,
    setLoadingMyWants,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("items");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_item);
  /* end FILTERS */

  /* EXPANDED ITEM ******************************************/
  const [expandedItem, setExpandedItem] = useState(null);
  const beforeLoad = useCallback(() => {
    setExpandedItem(null);
  }, []);
  /* end EXPANDED ITEM */

  /* FETCH *************************************************/
  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoad = useCallback(
    (newItems) => {
      setIsLoaded(true);
      const { results: list, count } = newItems;
      setItems({ list, count });
    },
    [setItems]
  );
  const [, , loading, error] = useFetch({
    endpoint: "GET_ITEMS_LIST",
    params: filters,
    autoLoad: true,
    initialState: { results: [] },
    beforeLoad,
    afterLoad,
    reloadValue,
  });
  /* end FETCH */

  /* ITEM TAGS *********************************************/
  const afterLoadItemTags = useCallback(
    (list) => {
      const tags = list.map((tag, i) => {
        return {
          ...tag,
          id: `${tag?.id || i}`,
        };
      });
      setItemTags(tags);
    },
    [setItemTags]
  );

  useFetch({
    endpoint: "MYTAGS",
    initialState: [],
    autoLoad: true,
    afterLoad: afterLoadItemTags,
  });
  /* end ITEM TAGS *********************************************/

  /* MY WANTS *************************************************/
  const beforeLoadMyWants = useCallback(() => {
    setLoadingMyWants(true);
  }, [setLoadingMyWants]);
  const afterLoadMyWants = useCallback(
    (wantList) => {
      setLoadingMyWants(false);
      setMyWants(wantList);
    },
    [setLoadingMyWants, setMyWants]
  );
  useFetch({
    endpoint: "MYWANTS",
    autoLoad: true,
    initialState: [],
    beforeLoad: beforeLoadMyWants,
    afterLoad: afterLoadMyWants,
  });
  /* end MY WANTS */

  return {
    reloadValue,
    isLoaded,
    items,
    expandedItem,
    setExpandedItem,
    loading,
    error,
  };
};
export default useItems;
