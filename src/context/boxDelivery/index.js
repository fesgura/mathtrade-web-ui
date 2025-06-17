import { useStore } from "@/store";
import { formatLocationsSimple } from "@/utils/formatLocations";
import { createContext, useMemo, useContext } from "react";
import { PageContext } from "@/context/page";
import useItems from "./useItems";
import useBoxes from "./useBoxes";
import useTracking from "./useTracking";

export const BoxDeliveryContext = createContext({
  itemList: [],
  //
  boxes: [],
  boxesList: [],
  reloadBoxes: () => {},
  addNewBox: () => {},
  boxIdToEdit: null,
  setBoxIdToEdit: () => {},
  cancelAddNewBox: () => {},
  //
  loading: false,
  error: null,
  //
  localLocation: 1,
  locationOptions: [],
  //
  reloadTrackings: () => {},
  trackings: [],
  addNewTracking: () => {},
  cancelAddNewTracking: () => {},
  trackingIdToEdit: null,
  setTrackingIdToEdit: () => {},
});

const BoxDeliveryContextProvider = ({ children }) => {
  /* LOCATIONS **********************************************/
  const { referrer } = useContext(PageContext);

  const localLocation = referrer?.id || 1;

  const locations = useStore((state) => state.locations);
  const locationOptions = useMemo(() => {
    return formatLocationsSimple(locations, localLocation);
  }, [locations, localLocation]);
  /* END LOCATIONS **********************************************/

  /* BOXES **********************************************/
  const {
    reloadBoxes,
    boxes,
    boxesList,
    loadingBoxes,
    errorBoxes,
    addNewBox,
    cancelAddNewBox,
    boxIdToEdit,
    setBoxIdToEdit,
  } = useBoxes(locations);
  /* END BOXES **********************************************/

  /* ITEM LIST **********************************************/
  const { itemList, loadingItems, errorItems } = useItems(
    boxes,
    locations,
    localLocation
  );
  /* END ITEM LIST **********************************************/

  /* TRACKING **********************************************/
  const {
    reloadTrackings,
    trackings,
    loadingTrackings,
    errorTrackings,
    addNewTracking,
    cancelAddNewTracking,
    trackingIdToEdit,
    setTrackingIdToEdit,
  } = useTracking(locations);
  /* END TRACKING **********************************************/

  return (
    <BoxDeliveryContext.Provider
      value={{
        itemList,
        //
        boxes,
        boxesList,
        reloadBoxes,
        addNewBox,
        cancelAddNewBox,
        boxIdToEdit,
        setBoxIdToEdit,
        //
        loading: loadingBoxes || loadingItems || loadingTrackings,
        error: errorBoxes || errorItems || errorTrackings,
        //
        localLocation,
        locationOptions,
        //
        reloadTrackings,
        trackings,
        addNewTracking,
        cancelAddNewTracking,
        trackingIdToEdit,
        setTrackingIdToEdit,
      }}
    >
      {children}
    </BoxDeliveryContext.Provider>
  );
};

export default BoxDeliveryContextProvider;
