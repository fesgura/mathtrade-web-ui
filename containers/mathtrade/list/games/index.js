import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useApi, MathTradeService } from "api";
import { getUniqueId } from "utils";
import GameListView from "views/mathtrade/list/games";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MT_GameListContainer = () => {
  const storeData = useSelector(selectStoreData);
  const router = useRouter();

  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [listGames, list, loading, errors] = useApi({
    promise: MathTradeService.listGames,
  });

  useEffect(() => {
    //
    let timer = setTimeout(() => {
      if (!isFetched) {
        const { pathname, query } = router;
        setIsFetched(true);
        setFilters({ pathname, query, d: getUniqueId() });
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [router, isFetched]);

  useEffect(() => {
    if (filters.d) {
      const mathTradeId = storeData?.mathtrade?.data.id;
      listGames({
        mathTradeId,
        query: filters.query,
      });
    }
  }, [filters, storeData]);

  return (
    <GameListView
      list={list}
      filters={filters}
      setFilters={(filterInput) => {
        const newFilters = {
          ...filters,
          query: {
            ...filters.query,
            ...filterInput,
          },
          d: getUniqueId(),
        };
        for (let a in newFilters.query) {
          if (typeof newFilters.query[a] === "undefined") {
            delete newFilters.query[a];
          }
        }
        setFilters(newFilters);
        router.push({
          path: newFilters.path,
          query: newFilters.query,
        });
      }}
      loading={loading}
      errors={errors}
      // afterAnyChange={() => {
      //   const mathTradeId = storeData?.mathtrade?.data.id;
      //   listWants({ mathTradeId });
      //   setFilters((fil) => {
      //     return {
      //       ...fil,
      //       d: getUniqueId(),
      //     };
      //   });
      // }}
    />
  );
};
export default MT_GameListContainer;
