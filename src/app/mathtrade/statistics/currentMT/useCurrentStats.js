import { useCallback, useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useCurrentStats = () => {
  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("stats");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FETCH *************************************************/

  const [, data, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_STATS",
    autoLoad: true,
    // format,
  });
  /* end FETCH */

  return { data, loading, error };
};

export default useCurrentStats;
