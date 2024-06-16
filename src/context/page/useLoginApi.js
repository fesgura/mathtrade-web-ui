import { useState, useEffect } from "react";
import { signInApi } from "@/hooks/useFetch/constants/api";

const useLoginApi = () => {
  const [enableRender, setEnableRender] = useState(false);
  useEffect(() => {
    signInApi();
    setEnableRender(true);
  }, []);

  return enableRender;
};

export default useLoginApi;
