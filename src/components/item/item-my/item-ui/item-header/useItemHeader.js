import { useContext, useCallback } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import useFetch from "@/hooks/useFetch";

const useItemHeader = () => {
  /* PAGE CONTEXT **************************** */
  const { forceReloadPage, canI } = useContext(PageContext);
  /* end PAGE CONTEXT **************************** */

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { isCombo, elements } = item;
  /* end ITEM CONTEXT **********************************************/

  /* DELETE **************************************************/

  const afterLoad = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  const [deleteItemApi, , loading] = useFetch({
    endpoint: "DELETE_MYITEM",
    method: "DELETE",
    afterLoad,
  });

  /* end DELETE **************************************************/

  const deleteItem = useCallback(() => {
    deleteItemApi({
      urlParams: [item?.id || ""],
    });
  }, [deleteItemApi, item]);

  return {
    deleteItem,
    loading,
    isCombo,
    canIoffer: canI.offer,
    elementsLength: elements?.length,
  };
};

export default useItemHeader;
