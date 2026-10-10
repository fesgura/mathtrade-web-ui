import useFetch from "@/hooks/useFetch";
import useListSnapshot from "@/hooks/useListSnapshot";
import { useCallback, useState, useContext, useEffect, useMemo } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";

// My own tags/want-list are inherently bounded to one user's own entries,
// unlike a browsable list of everyone's items - request the max page size
// so they aren't silently truncated at the default page size (50).
const MY_OWN_DATA_PARAMS = { page_size: 200 };

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
    setFilterData,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("items");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_item);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS */

  /* EXPANDED ITEM ******************************************/
  const [expandedItem, setExpandedItem] = useState(null);
  const beforeLoad = useCallback(() => {
    setExpandedItem(null);
  }, []);
  /* end EXPANDED ITEM */

  /* FETCH *************************************************/
  const [isLoaded, setIsLoaded] = useState(false);
  // Stable pagination: see useListSnapshot.
  const {
    params: listParams,
    onLoaded: onListLoaded,
    newCount,
    refresh: refreshSnapshot,
  } = useListSnapshot(filters);

  const afterLoad = useCallback(
    (newItems) => {
      setIsLoaded(true);
      onListLoaded(newItems);
      const { results: list, count } = newItems;

      setItems({ list, count });
      //  setFilterData(newFilterData || {});
    },
    [setItems, onListLoaded]
  );

  const afterError = useCallback(() => {
    if (filters?.page && filters.page !== 1) {
      updateFilters({ page: 1 }, "item");
    }
  }, [updateFilters, filters?.page]);

  const [, , loading, error] = useFetch({
    endpoint: "GET_ITEMS_LIST",
    params: listParams,
    autoLoad: true,
    initialState: { results: [] },
    beforeLoad,
    afterLoad,
    afterError,
    reloadValue,
  });
  // "Actualizar": new snapshot, back to page 1.
  const refreshList = useCallback(() => {
    refreshSnapshot();
    if (filters?.page && filters.page !== 1) {
      updateFilters({ page: 1 }, "item");
    }
  }, [refreshSnapshot, filters?.page, updateFilters]);

  /* end FETCH */

  /* FETCH FILTERS *************************************************/
  const afterLoadFilters = useCallback(
    (newFilterData) => {
      setFilterData(newFilterData || {});
    },
    [setFilterData]
  );
  // The counts follow the ignored mode, so they match the list shown.
  const filterParams = useMemo(
    () => ({ ignored: filters?.ignored }),
    [filters?.ignored]
  );
  useFetch({
    endpoint: "GET_FILTER_ITEMS",
    params: filterParams,
    autoLoad: true,
    initialState: {},
    afterLoad: afterLoadFilters,
    reloadValue,
  });
  /* end FETCH FILTERS */

  /* ITEM TAGS *********************************************/
  const afterLoadItemTags = useCallback(
    ({ results }) => {
      const tags = results.map((tag, i) => {
        return {
          ...tag,
          id: `${tag?.id || i}`,
          itemsComplete: tag.items,
          items: tag.items.map(({ id }) => id),
        };
      });
      setItemTags(tags);
    },
    [setItemTags]
  );

  useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
    autoLoad: true,
    params: MY_OWN_DATA_PARAMS,
    afterLoad: afterLoadItemTags,
  });
  /* end ITEM TAGS *********************************************/

  /* MY WANTS *************************************************/
  const beforeLoadMyWants = useCallback(() => {
    setLoadingMyWants(true);
  }, [setLoadingMyWants]);
  const afterLoadMyWants = useCallback(
    ({ results }) => {
      setLoadingMyWants(false);
      setMyWants(results);
    },
    [setLoadingMyWants, setMyWants]
  );
  useFetch({
    endpoint: "MYWANTS",
    autoLoad: true,
    initialState: { results: [] },
    params: MY_OWN_DATA_PARAMS,
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
    newCount,
    refreshList,
  };
};
export default useItems;
