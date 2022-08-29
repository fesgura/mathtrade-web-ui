import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useApi, MathTradeService, LocationService } from "api";
import { getMathtradeStored, getUniqueId } from "utils";
import MT_ItemListView from "views/mathtrade/list/items";

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

  const [listWants, itemWants, loadingItemWants, errorsItemWants] = useApi({
    promise: MathTradeService.wants,
    initialState: [],
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
      const newMathtradeStored = getMathtradeStored();
      listItems({
        mathTradeId: newMathtradeStored.data.id,
        query: filters.query,
      });
    }
  }, [filters]);

  useEffect(() => {
    fetchLocations();
    const newMathtradeStored = getMathtradeStored();
    listWants({ mathTradeId: newMathtradeStored.data.id });
  }, []);

  return (
    <MT_ItemListView
      list={list}
      itemWants={itemWants}
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
      loading={loading || loadingItemWants}
      errors={errors || errorsItemWants}
      afterAnyChange={() => {
        const newMathtradeStored = getMathtradeStored();
        listWants({ mathTradeId: newMathtradeStored.data.id });
        // setFilters((fil) => {
        //   return {
        //     ...fil,
        //     d: getUniqueId(),
        //   };
        // });
      }}
    />
  );
};
export default MT_ItemListContainer;
