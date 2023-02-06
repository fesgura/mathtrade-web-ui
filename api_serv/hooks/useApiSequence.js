import { useState, useCallback } from "react";
import _ from "lodash";
import callToAPI from "./callToAPI";

const delayTime = (ms) => new Promise((r) => setTimeout(r, ms));

const useApiSequence = ({
  list = [],
  conditional = true,
  afterLoad = null,
  startLoading = false,
}) => {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState([]);
  const [dataLoading, setDataLoading] = useState(startLoading);

  const fetchData = useCallback(() => {
    const getData = async (newList) => {
      const newData = [];
      const newErrors = [];
      setDataLoading(true);

      for (let i = 0; i < newList.length; i++) {
        await delayTime(200);
        const [errors, response, responseData] = await callToAPI(
          newList[i].promise(newList[i].params || {})
        );
        if (!response.ok) {
          newErrors.push(errors);
        } else {
          const jsonData = newList[i].format
            ? newList[i].format(responseData)
            : responseData;

          newData.push(
            _.isEmpty(responseData) ? newList[i].initialState || null : jsonData
          );
        }
      }

      if (afterLoad && !newErrors.length) {
        afterLoad(newData);
      }

      setData(newData);
      setErrorMessage(newErrors);
      setDataLoading(false);
    };

    if (conditional) {
      getData(list);
    } else {
      setData([]);
      setErrorMessage([]);
    }
  }, [list, conditional]);

  return [fetchData, data, dataLoading, errorMessage];
};

export default useApiSequence;
