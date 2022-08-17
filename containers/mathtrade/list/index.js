import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PrivateEnv from "environments/private";
import MT_ItemListView from "views/mathtrade/list";
import { useApi, ItemService } from "api";

const MT_ItemList = () => {
  const router = useRouter();

  const [filters, setFilters] = useState({});
  const [isFetched, setIsFetched] = useState(false);

  const [getItems, itemsData, loading, errors] = useApi({
    promise: ItemService.listMathTradeItems,
    startLoading: true,
    //initialState: [],
  });

  useEffect(() => {
    //
    let timer = setTimeout(() => {
      if (!isFetched) {
        const { query } = router;
        setFilters(query);
        setIsFetched(true);
        getItems(query);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [router, isFetched]);

  return (
    <PrivateEnv>
      <MT_ItemListView
        itemsData={itemsData}
        loading={loading}
        errors={errors}
        filters={filters}
      />
    </PrivateEnv>
  );
};

export default MT_ItemList;
