import { useCallback, useState } from "react";

const useReload = () => {
  const [isForcedReload, setIsForcedReload] = useState(null);

  const forceReload = useCallback(() => {
    setIsForcedReload(new Date().valueOf());
  }, []);

  const deleteReload = useCallback(() => {
    setIsForcedReload(null);
  }, []);

  return [isForcedReload, forceReload, deleteReload];
};

export default useReload;
