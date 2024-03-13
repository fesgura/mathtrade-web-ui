import { useCallback, useContext, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

/*TEMP */
const canIoffer = true;
/* end TEMP */

const useAddToMTtoggle = (isInMT) => {
  /* PAGE CONTEXT **********************************************/
  const { setMyItemsInMT, pageType, canI } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id: itemId } = item;
  /* end ITEM CONTEXT **********************************************/

  /* PUBLISH *****************************/
  const afterLoadPublish = useCallback(() => {
    setMyItemsInMT((list) => {
      // Add to ItemsInMathtrade
      return [...list].concat([item]);
    });
  }, [setMyItemsInMT, item]);

  const [publishItem, , loadingPublishItem] = useFetch({
    method: "POST",
    endpoint: "PUBLISH_ITEM",
    afterLoad: afterLoadPublish,
  });
  /* end PUBLISH *****************************/

  /* UNPUBLISH *****************************/
  const afterLoadUnPublish = useCallback(() => {
    setMyItemsInMT((list) => {
      // Remove to ItemsInMathtrade
      return [...list].filter((itm) => {
        return itm.id !== itemId;
      });
    });
  }, [setMyItemsInMT, itemId]);

  const [unpublishItem, , loadingUnpublishItem] = useFetch({
    method: "DELETE",
    endpoint: "UNPUBLISH_ITEM",
    afterLoad: afterLoadUnPublish,
  });
  /* end UNPUBLISH *****************************/

  const onClick = useCallback(() => {
    if (isInMT) {
      unpublishItem({
        urlParams: [itemId],
      });
    } else {
      publishItem({
        params: {
          item_id: itemId,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemId, isInMT]);

  return {
    loading: loadingPublishItem || loadingUnpublishItem,
    textButton: isInMT
      ? canI.offer
        ? "myCollection.quitFromMathTrade"
        : "myCollection.inMathTrade"
      : "myCollection.publishInMathTrade",
    textAlert: canIoffer
      ? null
      : isInMT
      ? "myCollection.cantOffer.isInMT"
      : "myCollection.cantOffer.isNotInMT",
    onClick,
    //
    pageType,
    canIOffer: canI.offer,
  };
};

export default useAddToMTtoggle;
