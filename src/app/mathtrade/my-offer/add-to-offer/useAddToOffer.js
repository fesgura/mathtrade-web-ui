import { PageContext } from "@/context/page";
import { useMemo, useContext, useCallback, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useAddToOffer = () => {
  /* PAGE CONTEXT **********************************************/
  const { myItemsInMT, setMyItemsInMT, myCollection, canI } =
    useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  const [item_id, setItemId] = useState(null);

  const options = useMemo(() => {
    if (!canI.offer) {
      return [];
    }
    const idsOffer = myItemsInMT.map((item) => item.id);

    return myCollection
      .filter((item) => {
        return idsOffer.indexOf(item.id) < 0;
      })
      .map((item) => {
        return {
          text: `${item?.elements?.length > 1 ? "Combo: " : ""}${item?.title}`,
          thumbnail: item?.elements[0]?.thumbnail || "",
          value: item.id,
        };
      });
  }, [myCollection, myItemsInMT, canI]);

  const afterLoad = useCallback(() => {
    setMyItemsInMT((oldMyItemsInMT) => {
      const itemToAdd = myCollection.filter((itm) => itm.id === item_id);
      if (itemToAdd[0]) {
        return [itemToAdd[0]].concat([...oldMyItemsInMT]);
      }
      return [...oldMyItemsInMT];
    });
    setItemId(null);
  }, [item_id, myCollection, setMyItemsInMT]);

  const [publishItem, , loading] = useFetch({
    method: "POST",
    endpoint: "PUBLISH_ITEM",
    afterLoad,
  });

  const onPublish = useCallback(() => {
    publishItem({
      params: {
        item_id,
      },
    });
  }, [publishItem, item_id]);

  return { options, loading, onPublish, setItemId, item_id };
};

export default useAddToOffer;
