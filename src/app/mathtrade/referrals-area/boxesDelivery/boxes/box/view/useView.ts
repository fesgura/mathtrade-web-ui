import { useCallback, useContext, useMemo, useState } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import useFetch from "@/hooks/useFetch";
import { formatBoxNumber } from "@/context/boxDelivery/utils";

const useView = (box: any) => {
  const { id, destinyName, number, math_items_full, comment } = box;
  const { setBoxIdToEdit, reloadBoxes } = useContext(BoxDeliveryContext) as any;

  const [closedNumber, setClosedNumber] = useState<string | null>(null);

  const editBox = useCallback(() => {
    setBoxIdToEdit(id);
  }, [setBoxIdToEdit, id]);

  const afterDelete = useCallback(() => {
    reloadBoxes();
  }, [reloadBoxes]);

  const urlParams = useMemo(() => {
    return [id];
  }, [id]);

  const [deleteBox, , loadingDelete, errorDelete] = useFetch({
    endpoint: "LOGISTICS_DELETE_BOX",
    method: "DELETE",
    urlParams,
    afterLoad: afterDelete,
  });

  const afterClose = useCallback(
    (data: any) => {
      const assigned = formatBoxNumber(data?.origin_number, data?.number);
      if (assigned) setClosedNumber(assigned);
      else if (data?.number != null) setClosedNumber(`${data.number}`);
      reloadBoxes();
    },
    [reloadBoxes],
  );

  const [closeBox, , loadingClose, errorClose] = useFetch({
    endpoint: "LOGISTICS_CLOSE_BOX",
    method: "POST",
    urlParams,
    afterLoad: afterClose,
  });

  return {
    editBox,
    deleteBox,
    closeBox,
    loading: loadingDelete || loadingClose,
    error: errorDelete || errorClose,
    number,
    destinyName,
    math_items_full,
    comment,
    closedNumber,
    dismissClosed: () => setClosedNumber(null),
  };
};
export default useView;
