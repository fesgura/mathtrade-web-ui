import { useState, useCallback, useEffect, useMemo } from "react";
import { callToAPI } from "./utils";
import { useStore } from "@/store";
import useSignOut from "../useSignOut";

const useFetch = ({
  initialState,
  format,
  beforeLoad,
  afterLoad,
  afterError,
  //
  method,
  endpoint,
  path,
  urlParams,
  params,
  autoLoad,
  reloadValue,
}) => {
  const signOut = useSignOut();
  const { mathtrade } = useStore((state) => state.data);

  const [data, setData] = useState(initialState || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultUrlParams = useMemo(() => {
    return urlParams || [];
  }, [urlParams]);

  const getData = useCallback(
    async (props) => {
      const { urlParams, params, mathtradeId } = {
        urlParams: [],
        params: null,
        mathtradeId: null,
        ...props,
      };

      if (beforeLoad) beforeLoad();
      setErrorMessage(null);
      setLoading(true);

      const [errors, response, responseData] = await callToAPI({
        method,
        endpoint,
        path,
        urlParams: defaultUrlParams.concat(urlParams),
        params,
        mathtradeId: mathtradeId || mathtrade?.id || 0,
      });
      setLoading(false);

      if (!response.ok) {
        setErrorMessage(errors);
        if (afterError) {
          afterError(errors);
        }
        if (response?.status === 401) {
          signOut();
        }
      } else {
        const jsonData = format ? format(responseData) : responseData;
        if (afterLoad && !errors) {
          afterLoad(jsonData);
        }
        setData(jsonData);
      }
    },
    [
      method,
      endpoint,
      path,
      format,
      beforeLoad,
      afterLoad,
      afterError,
      defaultUrlParams,
      mathtrade,
      signOut,
    ]
  );

  useEffect(() => {
    if (autoLoad) {
      getData({ params });
    }
  }, [getData, params, autoLoad, reloadValue]);

  return [getData, data, loading, errorMessage];
};

export default useFetch;
