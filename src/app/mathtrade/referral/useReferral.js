import { useState, useCallback, useMemo, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";

const useReferral = () => {
  /* PAGE CONTEXT */
  const { referrer, referring_limit } = useContext(PageContext);
  /* endPAGE CONTEXT */

  const [code, setCode] = useState("");
  const [referred, setReferred] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const [referralList, setReferralList] = useState([]);

  ///////////////////////////////

  const afterLoadDataReferrals = useCallback((dataReferrals) => {
    setReferralList(dataReferrals);
    setIsLoaded(true);
  }, []);

  const afterErrorDataReferrals = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const [, , loadingDataReferrals, errorDataReferrals] = useFetch({
    endpoint: "GET_REFERRALS",
    initialState: [],
    autoLoad: true,
    afterLoad: afterLoadDataReferrals,
    afterError: afterErrorDataReferrals,
  });

  const afterLoad = useCallback((d) => {
    const { code: newCode, referred: newReferred } = d;
    setCode(newCode);
    setReferred(newReferred);
    setReferralList((oldList) => {
      const newList = [...oldList];
      newList.push(d);
      return newList;
    });
  }, []);

  const [postReferral, , loadingPostReferral, errorPostReferral] = useFetch({
    endpoint: "POST_REFERRAL",
    method: "POST",
    afterLoad,
  });

  const onSubmit = useCallback(
    async (params) => {
      postReferral({
        params,
      });
    },
    [postReferral]
  );

  const url = useMemo(() => {
    const baseUrl = `${window.location.protocol}//${
      window.location.host
    }/sign/up?${encodeURIComponent("code=" + code + "&referred=" + referred)}`;
    return baseUrl;
  }, [code, referred]);

  return {
    validations: {
      referred: ["required", "email"],
    },
    onSubmit,
    loading: loadingPostReferral || loadingDataReferrals,
    error: errorPostReferral || errorDataReferrals,
    code,
    url,
    referralsCount: referralList.length,
    disabled: referralList.length >= referring_limit,
    isLoaded,
    referralList,
    referring_limit,
    referrer,
  };
};
export default useReferral;
