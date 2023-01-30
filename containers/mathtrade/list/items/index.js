import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import { useRouter } from "next/router";
import { useApi, MathTradeService, LocationService } from "api_serv";
import { getUniqueId, formatUserWantGroup } from "utils";
import ItemListView from "views/mathtrade/list/items";

const MT_ItemListContainer = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [listItems, list, loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
  });

  const [getMyWants, myWantsList, loadingMyWants, errorsMyWants] = useApi({
    promise: MathTradeService.getWants,
    initialState: [],
    format: (mw) => {
      return mw.map(formatUserWantGroup);
    },
  });
  const [getTags, tagList, loadingTags, errorsTags] = useApi({
    promise: MathTradeService.getTags,
    initialState: [],
    // format: (mw) => {
    //   return mw.map(formatUserWantGroup);
    // },
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
      listItems({
        query: filters.query,
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchLocations();
    getMyWants();
    getTags();
  }, []);

  return (
    <PrivateEnv>
      <ItemListView
        list={list}
        wantList={myWantsList}
        tagList={tagList}
        filters={filters}
        locations={dataLocations}
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
        loading={loading || loadingMyWants || loadingLocations || loadingTags}
        errors={errors || errorsMyWants || errorsTags}
        afterAnyChange={() => {
          getMyWants();
          listItems({
            query: filters.query,
          });
          // setFilters((fil) => {
          //   return {
          //     ...fil,
          //     d: getUniqueId(),
          //   };
          // });
        }}
      />
    </PrivateEnv>
  );
};
export default MT_ItemListContainer;
