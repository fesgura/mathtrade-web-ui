import useFetch from "@/hooks/useFetch";
import useLoadAllMyWants from "@/hooks/useLoadAllMyWants";
import useListSnapshot from "@/hooks/useListSnapshot";
import { useCallback, useState, useContext, useEffect, useMemo } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";


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
  // The counts follow the ignored mode, so they match the list shown.
  const filterParams = useMemo(
    () => ({ ignored: filters?.ignored }),
    [filters?.ignored]
  );
  useFetch({
    endpoint: "GET_FILTER_GAMES",
    params: filterParams,
    autoLoad: true,
    initialState: {},
    afterLoad: afterLoadFilters,
    reloadValue,
  });
  /* end FETCH FILTERS */

  /* MY WANTS *************************************************/
  // Every page: a member may have more than the BE's 200 per page.
  const afterLoadMyWants = useCallback(
    (results: any[]) => {
      setLoadingMyWants(false);
      setMyWants(results);
    },
    [setLoadingMyWants, setMyWants]
  );
  const { loading: loadingAllMyWants } = useLoadAllMyWants({
    autoLoad: true,
    onLoad: afterLoadMyWants,
  });
  useEffect(() => {
    // Only raise it here: the error path keeps today's behavior (stays on
    // until the next load), and onLoad clears it.
    if (loadingAllMyWants) setLoadingMyWants(true);
  }, [loadingAllMyWants, setLoadingMyWants]);
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
