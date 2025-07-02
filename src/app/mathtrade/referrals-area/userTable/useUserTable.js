import { useState, useMemo, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";

const useUserTable = () => {
  const { referrer } = useContext(PageContext);

  const params = useMemo(() => {
    return { location: referrer?.id };
  }, [referrer]);

  const [, listRaw, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    params,
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
    cityName: referrer?.name || "",
    showOnlyCommiters,
    setShowOnlyCommiters,
  };
};

export default useUserTable;
