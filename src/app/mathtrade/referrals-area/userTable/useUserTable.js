import { useMemo, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";

const useUserTable = () => {
  const { referrer } = useContext(PageContext);

  const params = useMemo(() => {
    return { location: referrer?.id };
  }, [referrer]);

  const [, list, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    params,
    autoLoad: true,
  });

  return {
    list,
    loading,
    error,
    cityName: referrer?.name || "",
  };
};

export default useUserTable;
