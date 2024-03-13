import { useState, useCallback } from "react";
import fetchBGG from "./fetchBGG";

const useFetchBGG = ({
  initialState,
  format,
  beforeLoad,
  afterLoad,
  afterError,
  //
  endpoint,
}) => {
  const [data, setData] = useState(initialState || null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = useCallback(
    async (params) => {
      if (beforeLoad) beforeLoad();
      setErrorMessage(null);
      setLoading(true);

      const [errors, response, responseData] = await fetchBGG(endpoint, params);
      setLoading(false);

      if (!response.ok) {
        setErrorMessage(errors);
        if (afterError) {
          afterError(errors);
        }
      } else {
        const jsonData = format ? format(responseData) : responseData;
        if (afterLoad && !errors) {
          afterLoad(jsonData, params);
        }
        setData(jsonData);
      }
    },
    [endpoint, format, beforeLoad, afterLoad, afterError]
  );

  return [getData, data, loading, errorMessage];
};

export default useFetchBGG;
