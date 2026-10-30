import { useContext, useCallback, useState, useEffect, useMemo } from "react";
import { ResultsContext } from "@/context/results";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import {
  toTradeRows,
  applyDeliveryStatus,
  type ResultsSummary,
} from "@/utils/resultsSummary";

const defaultScreenViewResults = 0;

type ResultsUser = { id: number | string; trades?: number; commitment?: boolean };
type DeliveryRow = { id: number; delivered?: boolean; received?: boolean };

const useResults = () => {
  /* SCREEN OPTIONS **********************************************/
  const [screenViewResults, setScreenViewResults] = useState(
    defaultScreenViewResults
  );
  /* end SCREEN OPTIONS **********************************************/

  /* PAGE CONTEXT *****************************************/
  const { updateMathtrade } = useContext(PageContext);
  /* end PAGE CONTEXT *****************************************/

  /* RESULTS CONTEXT *****************************************/
  const {
    currentUser: contextUser,
    setUserList,
    currentUserId,
    setMathTradeResults,
    MathTradeResults,
  } = useContext(ResultsContext);
  const currentUser = contextUser as ResultsUser | null;

  useEffect(() => {
    setScreenViewResults(defaultScreenViewResults);
  }, [currentUser]);
  /* end RESULTS CONTEXT *****************************************/

  /* GET USERS *************************************************/
  const afterLoad = useCallback(
    (newUserList: unknown[]) => {
      setUserList(newUserList);
    },
    [setUserList]
  );
  const [, , loadingUsers] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    autoLoad: true,
    initialState: [],
    afterLoad,
  });
  // end GET USERS ********************************************

  // UPDATE MathTrade ********************************************
  // The version comes from this fresh response, not the store: a stale store
  // would ask for an old ?v= URL that the CDN keeps for a day.
  const [version, setVersion] = useState<string | null>(null);
  const [meetingDate, setMeetingDate] = useState<string | null>(null);
  const [mathtradeLoaded, setMathtradeLoaded] = useState(false);
  const afterLoadMathTradeData = useCallback(
    (newMathTradeData: { results_published_at?: string | null; meeting_date?: string | null }) => {
      updateMathtrade(newMathTradeData);
      setVersion(newMathTradeData?.results_published_at ?? null);
      setMeetingDate(newMathTradeData?.meeting_date ?? null);
      setMathtradeLoaded(true);
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

  /* RESULTS SUMMARY (whole edition, CDN-cached per version) **************/
  const [summary, setSummary] = useState<ResultsSummary | null>(null);
  const afterLoadSummary = useCallback((data: ResultsSummary) => {
    setSummary(data);
  }, []);
  const [getSummary, , loadingSummary] = useFetch({
    endpoint: "GET_RESULTS_SUMMARY",
    afterLoad: afterLoadSummary,
  });
  useEffect(() => {
    if (!mathtradeLoaded) return;
    getSummary({ params: version ? { v: version } : {} });
  }, [getSummary, mathtradeLoaded, version]);
  /* end RESULTS SUMMARY **************************************************/

  /* DELIVERY OVERLAY *****************************************************/
  // results-summary/ has no delivery status. Once the meeting has started,
  // the uncached results/?user= rows add the delivered/received chips.
  const meetingStarted = useMemo(
    () => Boolean(meetingDate) && new Date(meetingDate as string).getTime() <= Date.now(),
    [meetingDate]
  );
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryRow[] | null>(null);
  const afterLoadDelivery = useCallback(({ results }: { results: DeliveryRow[] }) => {
    setDeliveryStatus(results);
  }, []);
  const [getDelivery, , loadingDelivery] = useFetch({
    endpoint: "GET_MT_RESULTS",
    afterLoad: afterLoadDelivery,
  });

  const hasResults = Boolean(currentUser?.trades && currentUser?.commitment);

  useEffect(() => {
    setDeliveryStatus(null);
    if (meetingStarted && hasResults) {
      getDelivery({ params: { user: currentUserId, page_size: 200 } });
    }
  }, [getDelivery, meetingStarted, hasResults, currentUserId]);
  /* end DELIVERY OVERLAY *************************************************/

  useEffect(() => {
    if (hasResults && summary) {
      setMathTradeResults(
        applyDeliveryStatus(toTradeRows(summary, currentUserId), deliveryStatus)
      );
    } else {
      setMathTradeResults(null);
    }
  }, [setMathTradeResults, hasResults, summary, currentUserId, deliveryStatus]);

  return {
    MathTradeResults,
    screenViewResults,
    setScreenViewResults,
    loading: loadingUsers || loadingMathTradeData || loadingSummary || loadingDelivery,
  };
};

export default useResults;
