import useFetch from "@/hooks/useFetch";
import useListSnapshot from "@/hooks/useListSnapshot";
import { useCallback, useState, useContext, useEffect } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";

// My own want-list is inherently bounded to one user's own entries, unlike
// a browsable list of everyone's games - request the max page size so it
// isn't silently truncated at the default page size (50).
const MY_OWN_DATA_PARAMS = { page_size: 200 };

const useItems = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    games,
    setGames,
    setPageType,
    setMyWants,
    setLoadingMyWants,
    setFilterData,
    reloadValue,
  } = useContext(PageContext);
  useEffect(() => {
    setPageType("games");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_game);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS */

  /* EXPANDED GAME ******************************************/
  const [expandedGame, setExpandedGame] = useState(null);
  const beforeLoad = useCallback(() => {
    setExpandedGame(null);
  }, []);
  /* end EXPANDED GAME */

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
    (newGames) => {
      setIsLoaded(true);
      onListLoaded(newGames);
      const { results: list, count } = newGames;
      setGames({ list, count });
    },
    [setGames, onListLoaded]
  );

  const afterError = useCallback(() => {
    if (filters?.page && filters.page !== 1) {
      updateFilters({ page: 1 }, "game");
    }
  }, [updateFilters, filters?.page]);

  const [, , loading, error] = useFetch({
    endpoint: "GET_GAMES_LIST",
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
      updateFilters({ page: 1 }, "game");
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
  useFetch({
    endpoint: "GET_FILTER_GAMES",
    autoLoad: true,
    initialState: {},
    afterLoad: afterLoadFilters,
    reloadValue,
  });
  /* end FETCH FILTERS */

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
    isLoaded,
    games,
    expandedGame,
    setExpandedGame,
    loading,
    error,
    newCount,
    refreshList,
  };
};
export default useItems;
