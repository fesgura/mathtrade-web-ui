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
        const { id, title, location, via_meeting } = item;

        if (location !== 1 && location === localLocation) {
          return null;
        }

        if (location !== 1 && !via_meeting) {
          locationIdFilt[location] = true;
        }

        if (location === 1) {
          locationIdFilt[location] = true;
        }

        const loc = locations.find((l) => l.id === location);

        const [boxFound] = boxes.filter(
          (box) => box.math_items.indexOf(`${id}`) >= 0
        );

        const destinyName = loc ? loc.name : "";

        return {
          value: `${id}`,
          text: `${id} - ${title} ➡️ ${
            location !== 1 && via_meeting ? "AMBA -> " : ""
          }${destinyName}`,
          destiny: `${location}`,
          destinyName,
          via_meeting,
          boxNumber: boxFound ? boxFound.number : null,
        };
      })
      .filter((item) => item);

    return { itemList: itemLi, locationIdFilter: locationIdFilt };
  }, [items, boxes, locations, localLocation]);

  return { itemList, locationIdFilter, loadingItems, errorItems };
};
export default useItems;
