import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import storage from "utils/storage";
import { useRouter } from "next/router";
import { useApi, MathTradeService } from "api_serv";
import useCanEdit from "hooks/useCanEdit";
import { getUniqueId } from "utils";
import GameListView from "views/mathtrade/list/games";
import { page_size } from "config";

const MT_GameListContainer = () => {
  /*
  TEMP
  const canEditList = useCanEdit("list");
  const canEditWants = useCanEdit("wants");

  const router = useRouter();
  const [list, setList] = useState(null);
  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [listGames, , loading, errors] = useApi({
    promise: MathTradeService.listGames,
    afterLoad: setList,
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!isFetched) {
        const { pathname, query } = router;
        setIsFetched(true);
        const storeOptions = storage.getOptions();

        let queryUser = {
          ...query,
          page_size: query.page_size ? query.page_size : page_size,
        };

        if (storeOptions?.hideOwnUser) {
          const storeData = storage.get();
          queryUser = {
            ...query,
            user: `-${storeData?.user?.data?.id}`,
            page_size: query.page_size ? query.page_size : page_size,
          };
        }

        setFilters({ pathname, query: queryUser, d: getUniqueId() });
      }
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [router, isFetched]);

  useEffect(() => {
    if (errors) {
      const { pathname, query } = router;
      if (query?.page !== 1) {
        delete query.page;
        setFilters({ pathname, query, d: getUniqueId() });
        router.push({
          query,
        });
      }
    }
  }, [errors, router]);

  useEffect(() => {
    if (filters.d) {
      listGames({
        query: filters.query,
      });
    }
  }, [filters]);

  useEffect(() => {
    storage.setToOptions({
      listPageType: "gameList",
    });
  }, []);
*/
  return (
    <PrivateEnv>
      <GameListView
      // TEMP
      // canEditList={canEditList}
      // canEditWants={canEditWants}
      // list={list}
      // filters={filters}
      // setFilters={(filterInput) => {
      //   const newFilters = {
      //     ...filters,
      //     query: {
      //       ...filters.query,
      //       ...filterInput,
      //     },
      //     d: getUniqueId(),
      //   };
      //   for (let a in newFilters.query) {
      //     if (typeof newFilters.query[a] === "undefined") {
      //       delete newFilters.query[a];
      //     }
      //   }
      //   setFilters(newFilters);

      //   storage.setToOptions({
      //     gameListFilters: newFilters.query,
      //   });

      //   router.push({
      //     pathname: newFilters.path,
      //     query: newFilters.query,
      //   });
      // }}
      // loading={loading}
      // errors={errors}
      // afterAnyChange={() => {
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
