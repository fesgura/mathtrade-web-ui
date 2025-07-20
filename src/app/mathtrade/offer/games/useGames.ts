import { useCallback, useState, useContext, useEffect, useMemo } from "react";
import useFetch from "@/hooks/useFetch/index";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import type { GamesListResponse, Game } from "@/types/games";


type PageContextType = {
  games?: { list: Game[]; count: number };
  setGames?: (games: { list: Game[]; count: number }) => void;
  setPageType?: (type: string) => void;
  setMyWants?: (wants: any[]) => void;
  setLoadingMyWants?: (loading: boolean) => void;
  setFilterData?: (data: any) => void;
};

const useItems = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    games,
    setGames,
    setPageType,
    setMyWants,
    setLoadingMyWants,
    setFilterData,
  } = useContext(PageContext) as PageContextType;
  useEffect(() => {
    if (typeof setPageType === "function") setPageType("games");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state: { filters_game: any }) => state.filters_game);
  const updateFilters = useOptions((state: { updateFilters: (filters: any, type: string) => void }) => state.updateFilters);
  /* end FILTERS */

  /* EXPANDED GAME ******************************************/
  const [expandedGame, setExpandedGame] = useState<Game | null>(null);
  const beforeLoad = useCallback(() => {
    setExpandedGame(null);
  }, []);
  /* end EXPANDED GAME */

  /* FETCH *************************************************/
  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoad = useCallback(
    (newGames: GamesListResponse) => {
      setIsLoaded(true);
      const { content: list, total: count } = newGames;
      if (typeof setGames === "function") setGames({ list, count });
    },
    [setGames]
  );

  const afterError = useCallback(() => {
    if (typeof updateFilters === "function") updateFilters({ page: 1 }, "game");
  }, [updateFilters]);

  const page = filters?.page || 1;
  const limit = filters?.page_size || 100;
  const params = useMemo(() => ({ ...filters, page, limit }), [filters, page, limit]);

  const [, , loading, error] = useFetch({
    endpoint: "GET_GAMES_LIST",
    params,
    autoLoad: true,
    initialState: { content: [], total: 0 },
    beforeLoad,
    afterLoad,
    afterError,
    format: undefined,
    method: undefined,
    path: undefined,
    urlParams: undefined,
    reloadValue: undefined,
  });
  /* end FETCH */

  /* FETCH FILTERS *************************************************/
  const afterLoadFilters = useCallback(
    (newFilterData: any) => {
      if (typeof setFilterData === "function") setFilterData(newFilterData || {});
    },
    [setFilterData]
  );
  useFetch({
    endpoint: "GET_FILTER_GAMES",
    autoLoad: true,
    initialState: {},
    afterLoad: afterLoadFilters,
    format: undefined,
    beforeLoad: undefined,
    afterError: undefined,
    method: undefined,
    path: undefined,
    urlParams: undefined,
    params: undefined,
    reloadValue: undefined,
  });
  /* end FETCH FILTERS */

  /* MY WANTS *************************************************/
  const beforeLoadMyWants = useCallback(() => {
    if (typeof setLoadingMyWants === "function") setLoadingMyWants(true);
  }, [setLoadingMyWants]);
  const afterLoadMyWants = useCallback(
    (wantList: any[]) => {
      if (typeof setLoadingMyWants === "function") setLoadingMyWants(false);
      if (typeof setMyWants === "function") setMyWants(wantList);
    },
    [setLoadingMyWants, setMyWants]
  );
  useFetch({
    endpoint: "MYWANTS",
    autoLoad: true,
    initialState: [],
    beforeLoad: beforeLoadMyWants,
    afterLoad: afterLoadMyWants,
    format: undefined,
    afterError: undefined,
    method: undefined,
    path: undefined,
    urlParams: undefined,
    params: undefined,
    reloadValue: undefined,
  });
  /* end MY WANTS */

  return {
    isLoaded,
    games,
    expandedGame,
    setExpandedGame,
    loading,
    error,
  };
};
export default useItems;
