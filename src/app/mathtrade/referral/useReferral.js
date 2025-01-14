import { useState, useCallback, useMemo } from "react";
import useFetch from "@/hooks/useFetch";

const useReferral = () => {
  const [code, setCode] = useState("");
  const [referred, setReferred] = useState("");

  const afterLoad = useCallback(({ code: newCode, referred: newReferred }) => {
    setCode(newCode);
    setReferred(newReferred);
  }, []);

  const [postReferral, , loading, error] = useFetch({
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

  console.log(url);

  return {
    validations: {
      referred: ["required", "email"],
    },
    onSubmit,
    loading,
    error,
    code,
    url,
  };
};
export default useReferral;
