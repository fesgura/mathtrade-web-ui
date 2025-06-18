import { useState, useContext, useMemo, useCallback } from "react";
import { BoxDeliveryContext } from "@/context/boxDelivery";
import useFetch from "@/hooks/useFetch";

const useEditor = (track) => {
  const {
    id,
    destiny,
    tracking_code,
    boxes,
    image: imageDefault,
    price,
    weight,
  } = track;

  const {
    locationOptionsForTracking,
    boxesList,

    reloadTrackings,
    setTrackingIdToEdit,
    cancelAddNewTracking,
  } = useContext(BoxDeliveryContext);

  const [locationId, setLocationId] = useState(`${destiny}`);
  const [image, setImage] = useState(imageDefault || "");

  const boxOptions = useMemo(() => {
    return boxesList.filter((box) => {
      return box.destiny === locationId;
    });
  }, [boxesList, locationId]);

  //////////////////////////////

  const afterLoad = useCallback(() => {
    setTrackingIdToEdit(null);
    reloadTrackings();
  }, [reloadTrackings, setTrackingIdToEdit]);

  /* POST Tracking **********************************************/
  const [postTracking, , loadingPostTracking, errorPostTracking] = useFetch({
    endpoint: "LOGISTICS_POST_TRACKING",
    method: "POST",
    afterLoad,
  });
  /* END POST Tracking **********************************************/

  const onSubmit = useCallback(
    (d) => {
      const params = {
        ...d,
        destiny: parseInt(d.destiny),
        tracking_code: d.tracking_code,
        boxes: d.boxes.split(","),
        weight: parseInt(d.weight),
        price: `${d.price}`,
      };

      if (!id) {
        postTracking({ params });
      }
    },
    [id, postTracking]
  );

  const onCancel = useCallback(() => {
    if (!id) {
      cancelAddNewTracking();
    } else {
      setTrackingIdToEdit(null);
    }
  }, [cancelAddNewTracking, id, setTrackingIdToEdit]);

  return {
    validations: {
      tracking_code: ["required"],
      destiny: ["required"],
      boxes: ["required"],
      price: ["required"],
      weight: ["required"],
    },
    onSubmit,
    onCancel,
    loading: loadingPostTracking,
    error: errorPostTracking,
    //
    locationOptionsForTracking,
    locationId,
    setLocationId,
    image,
    setImage,
    id,
    tracking_code,
    boxes: boxes.map(({ id }) => id).join(","),
    boxOptions,
    price,
    weight,
  };
};

export default useEditor;
