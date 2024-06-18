import { useCallback, useEffect, useState } from "react";
import useSignOut from "@/hooks/useSignOut";

const useHeaderAccount = () => {
  const [show, setShow] = useState(false);
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  const signOut = useSignOut();

  useEffect(() => {
    setShow(true);
  }, []);

  return { show, visibleMobile, toggleMobile, signOut };
};
export default useHeaderAccount;
