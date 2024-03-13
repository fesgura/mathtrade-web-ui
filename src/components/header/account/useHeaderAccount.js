import { useCallback, useEffect, useState } from "react";
import { useStore } from "@/store";
import { signOutApi } from "@/hooks/useFetch/constants/api";

const useHeaderAccount = () => {
  const [show, setShow] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  const clearStore = useStore((state) => state.clearStore);

  const signOut = useCallback(() => {
    signOutApi();
    clearStore();
  }, [clearStore]);

  useEffect(() => {
    setShow(true);
  }, []);

  return { show, visibleMobile, toggleMobile, signOut };
};
export default useHeaderAccount;
