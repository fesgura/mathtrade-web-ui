import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect } from "react";

const useTracking = (locations) => {
  const [trackings, setTrackings] = useState([]);

  /* GET TRACKINGS **********************************************/
  const afterLoad = useCallback(
    (newTrackings) => {
      setTrackings(
        newTrackings.map((t) => {
          const loc = locations.find((l) => l.id === t.destiny);

          return {
            ...t,
            destinyName: loc ? loc.name : "",
          };
        })
      );
    },
    [locations]
  );

  const [reloadFlagTrackings, setReloadFlagTrackings] = useState(0);
  const reloadTrackings = useCallback(() => {
    setReloadFlagTrackings((v) => v + 1);
  }, []);

  const [getTrackings, , loadingTrackings, errorTrackings] = useFetch({
    endpoint: "LOGISTICS_GET_TRACKINGS",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    getTrackings();
  }, [getTrackings, reloadFlagTrackings]);
  /* end GET TRACKINGS **********************************************/

  const [trackingIdToEdit, setTrackingIdToEdit] = useState(null);
  /* ADD NEW TRACKING **********************************************/

  const addNewTracking = useCallback(() => {
    setTrackingIdToEdit(null);
    setTrackings((oldTrackings) => {
      return [
        ...oldTrackings,
        {
          tracking_code: "",
          destiny: 1,
          boxes: [],
        },
      ];
    });
  }, []);

  const cancelAddNewTracking = useCallback((id) => {
    setTrackings((oldTrackings) => {
      return [...oldTrackings.filter((tr) => tr.id !== id)];
    });
  }, []);

  /* end ADD NEW TRACKING **********************************************/

  return {
    reloadTrackings,
    trackings,
    loadingTrackings,
    errorTrackings,
    addNewTracking,
    cancelAddNewTracking,
    trackingIdToEdit,
    setTrackingIdToEdit,
  };
};

export default useTracking;
