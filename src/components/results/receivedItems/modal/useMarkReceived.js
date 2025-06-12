import useFetch from "@/hooks/useFetch";
import { useCallback } from "react";

const useMarkReceived = (itemData, onClose, setReloadData) => {
  const afterLoad = useCallback(() => {
    if (setReloadData) setReloadData();
    if (onClose) onClose();
  }, [onClose, setReloadData]);

  // POST_RECEIVED ********************************************
  const [onPostReceived, , loading, error] = useFetch({
    endpoint: "PUT_RECEIVED",
    method: "PUT",
    afterLoad,
  });

  const postReceived = useCallback(() => {
    onPostReceived({
      urlParams: [itemData.idResult],
      params: {
        mark_received: true,
      },
    });
  }, [onPostReceived, itemData]);

  return { postReceived, loading, error };
};

export default useMarkReceived;
