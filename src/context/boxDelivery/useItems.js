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
        const { id, title, location } = item;

        if (location !== 1 && location === localLocation) {
          return null;
        }

        if (!locationIdFilt[location]) {
          locationIdFilt[location] = 0;
        }

        locationIdFilt[location] += 1;

        const loc = locations.find((l) => l.id === location);

        const [boxFound] = boxes.filter(
          (box) => box.math_items.indexOf(`${id}`) >= 0
        );

        const destinyName = loc ? loc.name : "";

        return {
          value: `${id}`,
          text: `${id} - ${title} ➡️ ${destinyName}`,
          destiny: `${location}`,
          destinyName,
          boxNumber: boxFound ? boxFound.number : null,
        };
      })
      .filter((item) => item);

    return { itemList: itemLi, locationIdFilter: locationIdFilt };
  }, [items, boxes, locations, localLocation]);

  return { itemList, locationIdFilter, loadingItems, errorItems };
};
export default useItems;
