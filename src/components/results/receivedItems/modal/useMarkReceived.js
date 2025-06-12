import useFetch from "@/hooks/useFetch";
import { useCallback } from "react";

const useMarkReceived = (itemData, onClose, setReloadData) => {
  const afterLoad = useCallback(() => {
    if (setReloadData) setReloadData();
    if (onClose) onClose();
  }, [onClose, setReloadData]);

  // POST_RECEIVED ********************************************
  const [onPostReceived, , loading, error] = useFetch({
    endpoint: "POST_RECEIVED",
    method: "POST",
    afterLoad,
  });

  const postReceived = useCallback(() => {
    onPostReceived({
      params: {
        item_id: itemData.id,
        received: true,
      },
    });
  }, [onPostReceived, itemData]);

  return { postReceived, loading, error };
};

export default useMarkReceived;
