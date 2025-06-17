import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";

const useItems = (boxes, locations, localLocation) => {
  const [, items, loadingItems, errorItems] = useFetch({
    endpoint: "LOGISTICS_GET_ITEMS",
    autoLoad: true,
    initialState: [],
  });

  const { itemList, locationIdFilter } = useMemo(() => {
    const locationIdFilt = {};
    const itemLi = items
      .map((item) => {
        const {
          id,
          assigned_trade_code,
          title,
          location,
          send_to,
          via_meeting,
        } = item;

        const [boxFound] = boxes.filter(
          (box) => box.math_items.indexOf(`${id}`) >= 0
        );

        const boxNumber = boxFound ? boxFound.number : null;

        const endDestiny = via_meeting ? 1 : send_to || location;

        if (location !== 1 && location === localLocation) {
          return null;
        }

        if (location !== 1 && !via_meeting && !boxNumber) {
          locationIdFilt[endDestiny] = true;
        }

        const loc = locations.find((l) => l.id === location);

        const destinyName = loc ? loc.name : "";

        return {
          value: `${id}`,
          text: `${assigned_trade_code} - ${title} ➡️ ${
            location !== 1 && via_meeting ? "AMBA ➡️ " : ""
          }${destinyName}`,
          destiny: `${location}`,
          destinyName,
          endDestiny: `${endDestiny}`,
          via_meeting,
          boxNumber,
        };
      })
      .filter((item) => item);

    return { itemList: itemLi, locationIdFilter: locationIdFilt };
  }, [items, boxes, locations, localLocation]);

  return { itemList, locationIdFilter, loadingItems, errorItems };
};
export default useItems;
