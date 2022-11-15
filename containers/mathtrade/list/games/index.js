import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import { useRouter } from "next/router";
import { useApi, MathTradeService } from "api";
import { getUniqueId } from "utils";
import GameListView from "views/mathtrade/list/games";

const MT_GameListContainer = () => {
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
      listGames({
        query: filters.query,
      });
    }
  }, [filters]);

  return (
    <PrivateEnv>
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
        //   listWants();
        //   setFilters((fil) => {
        //     return {
        //       ...fil,
        //       d: getUniqueId(),
        //     };
        //   });
        // }}
      />
    </PrivateEnv>
  );
};
export default MT_GameListContainer;
