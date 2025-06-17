import useFetch from "@/hooks/useFetch";
import { useMemo } from "react";

const useItems = (boxes, locations) => {
  const [, items, loadingItems, errorItems] = useFetch({
    endpoint: "LOGISTICS_GET_ITEMS",
    autoLoad: true,
    initialState: [],
  });

  const itemList = useMemo(() => {
    return items.map((item) => {
      const { id, title, location } = item;

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
    });
  }, [items, boxes, locations]);

  return { itemList, loadingItems, errorItems };
};
export default useItems;
