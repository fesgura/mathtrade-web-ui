import { useCallback, useContext, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

const useElementView = (element) => {
  // PAGE CONTEXT *************************************/
  const { forceReloadPage } = useContext(PageContext);
  // end PAGE CONTEXT *************************************/

  // ITEM CONTEXT *************************************/
  const { item, reloadItem } = useContext(ItemContext);
  const { id: itemId, isCombo } = item;
  // end ITEM CONTEXT *************************************/

  // DELETE ELEMENT *************************************/
  const afterLoadElement = useCallback(() => {
    reloadItem();
  }, [reloadItem]);

  const urlParamsElement = useMemo(() => {
    return [element.id];
  }, [element]);

  const [deleteElement, , loadingDeleteElement] = useFetch({
    endpoint: "DELETE_ELEMENT",
    method: "DELETE",
    urlParams: urlParamsElement,
    afterLoad: afterLoadElement,
  });
  // end DELETE ELEMENT *************************************/

  // DELETE ITEM *************************************/
  const afterLoadItem = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  const urlParamsItem = useMemo(() => {
    return [itemId];
  }, [itemId]);

  const [deleteItem, , loadingDeleteItem] = useFetch({
    endpoint: "DELETE_MYCOLLECTION_ITEM",
    method: "DELETE",
    urlParams: urlParamsItem,
    afterLoad: afterLoadItem,
  });
  // end DELETE ITEM *************************************/
  return {
    loading: loadingDeleteElement || loadingDeleteItem,
    onDelete: () => {
      if (isCombo) {
        deleteElement();
      } else {
        deleteItem();
      }
    },
  };
};

export default useElementView;
