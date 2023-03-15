import { useState, useCallback } from "react";
import _ from "lodash";
import xmlParser from "../utils/xmlParser";
import callToAPI from "./callToAPI";

const delayTime = (ms) => new Promise((r) => setTimeout(r, ms));

const useApi = ({
  initialState = null,
  promise,
  //toggleErrorAlert = () => {},
  format = (j) => j,
  forBGG = false,
  conditional = true,
  afterLoad = null,
  startLoading = false,
}) => {
  const [data, setData] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [dataLoading, setDataLoading] = useState(startLoading);

  const fetchData = useCallback(
    (apiParams, apiProps) => {
      const getData = async (params, props) => {
        setData(initialState);
        setDataLoading(true);
        setErrorMessage(null);

        await delayTime(forBGG ? 600 : 1);

        const [errors, response, responseData] = await callToAPI(
          promise(params)
        );
        setDataLoading(false);

        if (!response.ok) {
          setErrorMessage(errors);
        } else {
          const jsonData = forBGG
            ? format(xmlParser(responseData), props)
            : format(responseData, props);
          if (afterLoad && !errors) {
            afterLoad(jsonData, props);
          }
          setData(_.isEmpty(responseData) ? initialState : jsonData);
        }
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
