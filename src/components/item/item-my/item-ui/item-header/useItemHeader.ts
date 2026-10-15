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
  const { isCombo, elements, ready } = item;
  /* end ITEM CONTEXT **********************************************/

  /* DELETE **************************************************/

  const afterLoad = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  const [deleteItemApi, , loading, error] = useFetch({
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
    error,
    isCombo,
    // Withdrawing your own item from this Math Trade (it stays in the
    // ludoteca) is allowed through the want-list phase — it leaves every want
    // list and its wanters get a notice (BE math_item/withdrawal.py);
    // adding/editing is geek-list only.
    canIdelete: canI.offer || canI.want,
    isWantPhase: canI.want,
    elementsLength: elements?.length,
    ready,
  };
};

export default useItemHeader;
