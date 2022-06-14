import { useState, useCallback } from "react";
import _ from "lodash";
import xmlParser from "../utils/xmlParser";

const handlePromise = (promise) =>
  promise
    .then((response) => {
      if (response.ok) return [null, response, response.data];
      return [response.errors, response, null];
    })
    .catch((error) => Promise.resolve([error, { ok: false }, null]));

const useApi = ({
  initialState = null,
  promise,
  //toggleErrorAlert = () => {},
  format = (j) => j,
  forBGG = false,
  conditional = true,
  afterLoad = null,
}) => {
  const [data, setData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const fetchData = useCallback(
    (apiParams, apiProps) => {
      const getData = async (params, props) => {
        setDataLoading(true);
        const [errors, response, responseData] = await handlePromise(
          promise(params)
        );
        setDataLoading(false);

        if (!response.ok) {
          setErrorMessage(errors);
        }
        const jsonData = forBGG
          ? format(xmlParser(responseData), props)
          : format(responseData, props);
        if (afterLoad) {
          afterLoad(jsonData);
        }
        setData(_.isEmpty(responseData) ? initialState : jsonData);
      };
      if (conditional) {
        getData(apiParams, apiProps);
      } else {
        setData(initialState);
      }
    },
    [afterLoad, conditional] //eslint-disable-line
  );

  return [fetchData, data, dataLoading, errorMessage];
};
export default useApi;
