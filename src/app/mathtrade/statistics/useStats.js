import { useCallback, useContext, useEffect, useState } from "react";
import { useOptions } from "@/store";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useStats = () => {
  /* SCREEN OPTIONS **********************************************/
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenViewStats, setScreenViewStats] = useState(
    options?.screenViewStats || 0
  );
  useEffect(() => {
    updateOptions({
      screenViewStats,
    });
  }, [updateOptions, screenViewStats]);
  /* end SCREEN OPTIONS **********************************************/

  /* PAGE CONTEXT **********************************************/
  const { setPageType } = useContext(PageContext);

  useEffect(() => {
    setPageType("stats");
  }, [setPageType]);
  /* end PAGE CONTEXT */

  /* FETCH *************************************************/
  const format = useCallback((d) => {
    return d[0];
  }, []);

  const [, data, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_STATS",
    autoLoad: true,
    // format,
  });
  /* end FETCH */

  return { data, loading, error, screenViewStats, setScreenViewStats };
};

export default useStats;
