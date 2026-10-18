import { useStore } from "@/store";
import { formatLocationsOptionsFiltered, destinyPathLabel } from "@/utils/formatLocations";
import { createContext, useMemo } from "react";
import { useReferrerView } from "@/context/referrerView";
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
  const { localLocation, params: viewParams } = useReferrerView();

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
  } = useBoxes(locations, viewParams);
  /* END BOXES **********************************************/

  /* ITEM LIST **********************************************/
  const {
    itemList,
    itemListRaw,
    locationIdFilter,
    viaDestinations,
    loadingItems,
    errorItems,
  } = useItems(boxes, locations, localLocation, viewParams);

  const boxesWithPath = useMemo(() => {
    return (boxes || []).map((box) => {
      const loc = (locations || []).find((l) => `${l.id}` === `${box.destiny}`);
      return {
        ...box,
        destinyName: destinyPathLabel(
          loc ? loc.name : "",
          box.destiny,
          Boolean(viaDestinations?.[`${box.destiny}`])
        ),
      };
    });
  }, [boxes, locations, viaDestinations]);

  const boxesListWithPath = useMemo(() => {
    return (boxesList || []).map((box) => {
      const match = boxesWithPath.find((b) => `${b.id}` === `${box.value}`);
      return match
        ? { ...box, text: `Caja Nº ${match.displayNumber || match.number} - ${match.destinyName}` }
        : box;
    });
  }, [boxesList, boxesWithPath]);
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
  } = useTracking(locations, viewParams);
  /* END TRACKING **********************************************/

  const locationOptions = useMemo(() => {
    return formatLocationsOptionsFiltered(locations, {
      ...locationIdFilter,
      [localLocation]: false,
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
        boxes: boxesWithPath,
        boxesList: boxesListWithPath,
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
