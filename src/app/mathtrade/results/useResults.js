import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useResults = () => {
  /* SCREEN OPTIONS **********************************************/
  const [screenViewResults, setScreenViewResults] = useState(0);
  /* end SCREEN OPTIONS **********************************************/

  /* PAGE CONTEXT *****************************************/
  const { updateMathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  /* RESULTS CONTEXT *****************************************/
  const {
    currentUser,
    setUserList,
    currentUserId,
    setMathTradeResults,
    MathTradeResults,
  } = useContext(ResultsContext);

  useEffect(() => {
    setScreenViewResults(0);
  }, [currentUser]);
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

  // UPDATE MathTrade ********************************************
  const afterLoadMathTradeData = useCallback(
    (newMathTradeData) => {
      updateMathtrade(newMathTradeData);
    },
    [updateMathtrade]
  );
  const params = useMemo(() => {
    return { stats: true };
  }, []);
  const [, , loadingMathTradeData] = useFetch({
    endpoint: "GET_MATHTRADE",
    params,
    autoLoad: true,
    afterLoad: afterLoadMathTradeData,
  });
  // end UPDATE MathTradeData ********************************************

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
    MathTradeResults,
    screenViewResults,
    setScreenViewResults,
    loading: loadingUsers || loadingMathTradeData || loadingMTresults,
  };
};

export default useResults;
