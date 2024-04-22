import useFetch from "@/hooks/useFetch";
import { useCallback, useState, useContext, useEffect } from "react";
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
  } = useContext(PageContext);
  useEffect(() => {
    setPageType("games");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FILTERS */
  const filters = useOptions((state) => state.filters_game);
  /* end FILTERS */

  /* EXPANDED GAME ******************************************/
  const [expandedGame, setExpandedGame] = useState(null);
  const beforeLoad = useCallback(() => {
    setExpandedGame(null);
  }, []);
  /* end EXPANDED GAME */

  /* FETCH *************************************************/
  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoad = useCallback(
    (newGames) => {
      setIsLoaded(true);
      const { results: list, count } = newGames;
      setGames({ list, count });
    },
    [setGames]
  );
  const [, , loading, error] = useFetch({
    endpoint: "GET_GAMES_LIST",
    params: filters,
    autoLoad: true,
    initialState: { results: [] },
    beforeLoad,
    afterLoad,
  });
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
  });
  /* end FETCH FILTERS */

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
    isLoaded,
    games,
    expandedGame,
    setExpandedGame,
    loading,
    error,
  };
};
export default useItems;
