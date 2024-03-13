import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";

const useResults = () => {
  /* SCREEN OPTIONS **********************************************/
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  const [screenViewResults, setScreenViewResults] = useState(
    options?.screenViewResults || 0
  );
  useEffect(() => {
    updateOptions({
      screenViewResults,
    });
  }, [updateOptions, screenViewResults]);
  /* end SCREEN OPTIONS **********************************************/

  /* RESULTS CONTEXT *****************************************/
  const {
    currentUser,
    setUserList,
    currentUserId,
    setMathTradeData,
    setMathTradeResults,
  } = useContext(ResultsContext);
  /* end RESULTS CONTEXT *****************************************/

  /* GET USERS *************************************************/
  const afterLoad = useCallback(
    (newUserList) => {
      setUserList(newUserList);
    },
    [setUserList]
  );
  const [, , loadingUsers, errorUsers] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    autoLoad: true,
    initialState: [],
    afterLoad,
  });
  // end GET USERS ********************************************

  // GET MathTradeData ********************************************
  const afterLoadMathTradeData = useCallback(
    (newMathTradeData) => {
      setMathTradeData(newMathTradeData);
    },
    [setMathTradeData]
  );
  const [, , loadingMathTradeData] = useFetch({
    endpoint: "GET_MATHTRADE",
    autoLoad: true,
    afterLoad: afterLoadMathTradeData,
  });
  // end GET MathTradeData ********************************************

  /* GET USERS *************************************************/
  const afterLoadMTresults = useCallback(
    (newMTresults) => {
      setMathTradeResults(newMTresults);
    },
    [setMathTradeResults]
  );
  const [getMathTradeResults, , loadingMTresults, errorMTresults] = useFetch({
    endpoint: "GET_MT_RESULTS",
    //autoLoad: true,
    afterLoad: afterLoadMTresults,
  });

  useEffect(() => {
    if (currentUser && currentUser.trades && currentUser.commitment) {
      getMathTradeResults({ params: { user: currentUserId } });
    } else {
      setMathTradeResults(null);
    }
  }, [getMathTradeResults, setMathTradeResults, currentUser, currentUserId]);
  // end GET USERS ********************************************

  return {
    screenViewResults,
    setScreenViewResults,
    loading: loadingUsers || loadingMathTradeData || loadingMTresults,
  };
};

export default useResults;
