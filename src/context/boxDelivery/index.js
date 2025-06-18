import { useStore } from "@/store";
import { formatLocationsOptionsFiltered } from "@/utils/formatLocations";
import { createContext, useMemo, useContext } from "react";
import { PageContext } from "@/context/page";
import useItems from "./useItems";
import useBoxes from "./useBoxes";
import useTracking from "./useTracking";

const COUNT_ITEMS_DELIVERY = 1;

export const BoxDeliveryContext = createContext({
  itemList: [],
  itemListRaw: [],
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
  locationOptionsForTracking: [],
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

  /* END LOCATIONS **********************************************/

  /* BOXES **********************************************/
  const {
    reloadBoxes,
    boxes,
    boxesList,
    locationIdBoxFilter,
    loadingBoxes,
    errorBoxes,
    addNewBox,
    cancelAddNewBox,
    boxIdToEdit,
    setBoxIdToEdit,
  } = useBoxes(locations);
  /* END BOXES **********************************************/

  /* ITEM LIST **********************************************/
  const { itemList, itemListRaw, locationIdFilter, loadingItems, errorItems } =
    useItems(boxes, locations, localLocation);
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

  const locationOptions = useMemo(() => {
    return formatLocationsOptionsFiltered(locations, {
      ...locationIdFilter,
      [localLocation]: false,
      [1]: true,
    });
  }, [locations, localLocation, locationIdFilter]);

  const locationOptionsForTracking = useMemo(() => {
    return formatLocationsOptionsFiltered(locations, {
      ...locationIdBoxFilter,
      [localLocation]: false,
      [1]: true,
    });
  }, [locations, localLocation, locationIdBoxFilter]);

  return (
    <BoxDeliveryContext.Provider
      value={{
        itemList,
        itemListRaw,
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
        locationOptionsForTracking,
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
