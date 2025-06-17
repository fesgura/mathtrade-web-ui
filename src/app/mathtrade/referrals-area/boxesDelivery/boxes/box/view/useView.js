import { useCallback, useContext, useMemo } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import useFetch from "@/hooks/useFetch";

const useView = (box) => {
  const { id, destinyName, number, math_items_full } = box;

  const { setBoxIdToEdit, reloadBoxes } = useContext(BoxDeliveryContext);

  const editBox = useCallback(() => {
    setBoxIdToEdit(id);
  }, [setBoxIdToEdit, id]);

  // DELETE ELEMENT *************************************/
  const afterLoad = useCallback(() => {
    reloadBoxes();
  }, [reloadBoxes]);

  const urlParams = useMemo(() => {
    return [id];
  }, [id]);

  const [deleteBox, , loading, error] = useFetch({
    endpoint: "LOGISTICS_DELETE_BOX",
    method: "DELETE",
    urlParams,
    afterLoad,
  });
  // end DELETE ELEMENT *************************************/

  return {
    editBox,
    deleteBox,
    loading,
    error,
    number,
    destinyName,
    math_items_full,
  };
};
export default useView;
