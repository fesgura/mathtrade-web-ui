import { useState, useCallback, useEffect, useMemo } from "react";
import { callToAPI } from "./utils";
import { useStore } from "@/store";
import useSignOut from "../useSignOut";

const useFetch = ({
  initialState = null,
  format = null,
  beforeLoad = null,
  afterLoad = null,
  afterError = null,
  method = "GET",
  endpoint = "",
  path = null,
  urlParams = null,
  params = null,
  autoLoad = false,
  reloadValue = null,
  // Another edition than the stored one (e.g. the admin view of the referrers area)
  mathtradeId: optionMathtradeId = null,
} = {}) => {
  const signOut = useSignOut();
  // Only the id: the edition object is replaced on every tab-focus refresh
  // (PageContext), and depending on it re-ran every autoLoad fetch on the
  // page — which, among others, wiped unsaved changes in My wants.
  const storedMathtradeId = useStore((state) => state.data?.mathtrade?.id);

  const [data, setData] = useState(initialState || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultUrlParams = useMemo(() => {
    return urlParams || [];
  }, [urlParams]);

  const getData = useCallback(
    async (props = {}) => {
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
        mathtradeId: mathtradeId || optionMathtradeId || storedMathtradeId || 0,
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
      optionMathtradeId,
      storedMathtradeId,
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
