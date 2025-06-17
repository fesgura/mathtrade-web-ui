import { useCallback, useContext, useMemo } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import useFetch from "@/hooks/useFetch";

const useView = (track) => {
  const { id, destinyName, tracking_code, boxes } = track;

  const { setTrackingIdToEdit, reloadTrackings } =
    useContext(BoxDeliveryContext);

  const editTracking = useCallback(() => {
    setTrackingIdToEdit(id);
  }, [setTrackingIdToEdit, id]);

  // DELETE ELEMENT *************************************/
  const afterLoad = useCallback(() => {
    reloadTrackings();
  }, [reloadTrackings]);

  const urlParams = useMemo(() => {
    return [id];
  }, [id]);

  const [deleteTracking, , loading, error] = useFetch({
    endpoint: "LOGISTICS_DELETE_TRACKING",
    method: "DELETE",
    urlParams,
    afterLoad,
  });
  // end DELETE ELEMENT *************************************/

  return {
    editTracking,
    deleteTracking,
    loading,
    error,
    tracking_code,
    destinyName,
    boxes,
  };
};
export default useView;
