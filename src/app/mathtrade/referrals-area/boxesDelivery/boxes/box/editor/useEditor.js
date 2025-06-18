import { useState, useContext, useMemo, useCallback } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import useFetch from "@/hooks/useFetch";
import { parse } from "qs";

const useEditor = (box) => {
  const { id, destiny, number, math_items } = box;

  const {
    locationOptions,
    itemList,
    reloadBoxes,
    setBoxIdToEdit,
    cancelAddNewBox,
  } = useContext(BoxDeliveryContext);

  const [locationId, setLocationId] = useState(`${destiny}`);

  const itemOptions = useMemo(() => {
    return itemList.filter((item) => {
      const canByBoxNumber = !item.boxNumber || item.boxNumber === number;
      // const canByDestiny =
      //   (locationId === "1" && item.via_meeting) ||
      //   (locationId === "1" && item.destiny === "1") ||
      //   (locationId !== "1" &&
      //     item.destiny === locationId &&
      //     !item.via_meeting);

      const canByDestiny = item.endDestiny === locationId;

      return canByBoxNumber && canByDestiny;
    });
  }, [itemList, number, locationId]);

  //////////////////////////////

  const afterLoad = useCallback(() => {
    setBoxIdToEdit(null);
    reloadBoxes();
  }, [reloadBoxes, setBoxIdToEdit]);

  /* POST BOX **********************************************/
  const [postBox, , loadingPostBox, errorPostBox] = useFetch({
    endpoint: "LOGISTICS_POST_BOX",
    method: "POST",
    afterLoad,
  });
  /* END POST BOX **********************************************/

  /* PUT BOX **********************************************/
  const [putBox, , loadingPutBox, errorPutBox] = useFetch({
    endpoint: "LOGISTICS_PUT_BOX",
    method: "PUT",
    afterLoad,
  });
  /* END PUT BOX **********************************************/

  const onSubmit = useCallback(
    (d) => {
      const params = {
        destiny: parseInt(d.destiny),
        number: number,
        math_items: d.math_items.split(",").map((id) => {
          return parseInt(id, 10);
        }),
      };

      if (!id) {
        postBox({ params });
      } else {
        putBox({ params, urlParams: [id] });
      }
    },
    [id, number, postBox, putBox]
  );

  const onCancel = useCallback(() => {
    if (!id) {
      cancelAddNewBox(number);
    } else {
      setBoxIdToEdit(null);
    }
  }, [cancelAddNewBox, id, number, setBoxIdToEdit]);

  return {
    validations: {
      destiny: ["required"],
      math_items: ["required"],
    },
    onSubmit,
    onCancel,
    loading: loadingPostBox,
    error: errorPostBox,
    //
    locationOptions,
    locationId,
    setLocationId,
    id,
    number,
    math_items: math_items.join(","),
    itemOptions,
  };
};

export default useEditor;
