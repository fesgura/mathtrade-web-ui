import useFetch from "@/hooks/useFetch";
import { useState, useCallback, useEffect, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { codeNumToString } from "@/context/boxDelivery/utils";
import { useStore } from "@/store";
import { formatLocations } from "@/utils";

const useItems = () => {
  /* LOCATIONS **********************************************/
  const locations = useStore((state) => state.locations);

  const { referrer } = useContext(PageContext);

  const localLocation = referrer?.id || 1;

  const [locationFilter, setLocationFilter] = useState(null);

  /* end LOCATIONS **********************************************/

  const [itemsRaw, setItemsRaw] = useState([]);
  const [isViaMeeting, setIsViaMeeting] = useState(false);

  const afterLoad = useCallback(
    (newItemsRaw) => {
      const newItems = newItemsRaw.map((itemRaw) => {
        const {
          id,
          assigned_trade_code,
          receptor_first_name,
          receptor_last_name,
          title,
          box_number,
          via_meeting,
          origin_location_name,
        } = itemRaw;

        return {
          id,
          assigned_trade_code: codeNumToString(assigned_trade_code),
          user: `${receptor_full_name}`,
          last_name: receptor_last_name,
          title,
          boxNumber: box_number,
          originName: `${origin_location_name}${
            localLocation !== 1 && via_meeting ? " (AMBA)" : ""
          }`,

          via_meeting,
        };
      });

      setItemsRaw(newItems);
    },
    [localLocation]
  );

  const [getItems, , loading, error] = useFetch({
    endpoint: "LOGISTICS_GET_ITEMS",
    initialState: [],
    afterLoad,
  });

  useEffect(() => {
    const params = { destination: localLocation };

    if (locationFilter) {
      params.origin = locationFilter;
    }

    getItems({
      params,
    });
  }, [getItems, localLocation, locationFilter]);

  const items = useMemo(() => {
    return itemsRaw.filter((item) => {
      return isViaMeeting ? item.via_meeting : true;
    });
  }, [itemsRaw, isViaMeeting]);

  return {
    locations: formatLocations(locations),
    setIsViaMeeting,
    setLocationFilter,
    items,
    loading,
    error,
  };
};
export default useItems;
