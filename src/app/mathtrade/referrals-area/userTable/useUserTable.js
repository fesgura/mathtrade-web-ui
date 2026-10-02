import { useState, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { useReferrerView } from "@/context/referrerView";

const useUserTable = () => {
  const { viewLocationId, locationName, mathtradeId } = useReferrerView();

  const params = useMemo(() => {
    return { location: viewLocationId };
  }, [viewLocationId]);

  const [, listRaw, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    params,
    mathtradeId,
    autoLoad: true,
  });

  const [showOnlyCommiters, setShowOnlyCommiters] = useState(false);

  const list = useMemo(() => {
    if (listRaw.length === 0) {
      return [];
    }

    return listRaw.filter((user) => {
      if (showOnlyCommiters) {
        return user.commitment;
      }
      return true;
    });
  }, [showOnlyCommiters, listRaw]);

  return {
    list,
    loading,
    error,
    cityName: locationName,
    showOnlyCommiters,
    setShowOnlyCommiters,
  };
};

export default useUserTable;
