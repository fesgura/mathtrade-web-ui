import { useState, useCallback, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { REFERRAL_LIMIT } from "@/config/referral";

const useReferral = () => {
  const [code, setCode] = useState("");
  const [referred, setReferred] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  const [referralsCount, setReferralsCount] = useState(REFERRAL_LIMIT);

  ///////////////////////////////

  const afterLoadDataReferrals = useCallback((dataReferrals) => {
    setReferralsCount(dataReferrals?.length || REFERRAL_LIMIT);
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

  const afterLoad = useCallback(({ code: newCode, referred: newReferred }) => {
    setCode(newCode);
    setReferred(newReferred);
    setReferralsCount((oldCount) => {
      return oldCount + 1;
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
    referralsCount,
    disabled: referralsCount >= REFERRAL_LIMIT,
    isLoaded,
  };
};
export default useReferral;
