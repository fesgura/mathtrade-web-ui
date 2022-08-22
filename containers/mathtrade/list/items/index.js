import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored, getUniqueId } from "utils";
import MT_ItemListView from "views/mathtrade/list/items";

const MT_ItemListContainer = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({
    pathname: "",
    query: {},
  });
  const [isFetched, setIsFetched] = useState(false);

  const [listItems, list, loading, errors] = useApi({
    promise: MathTradeService.listItems,
    startLoading: true,
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

  return (
    <MT_ItemListView
      list={list}
      filters={filters}
      setFilters={(newFilters) => {
        setFilters({
          ...filters,
          query: {
            ...filters.query,
            ...newFilters,
          },
          d: getUniqueId(),
        });
      }}
      loading={loading}
      errors={errors}
      afterAnyChange={() => {
        setFilters((fil) => {
          return {
            ...fil,
            d: getUniqueId(),
          };
        });
      }}
    />
  );
};
export default MT_ItemListContainer;
