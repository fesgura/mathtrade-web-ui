import { useCallback, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { ElementContext } from "@/context/element";

const useRemoveElement = () => {
  /* PAGE CONTEXT **************************** */
  const { forceReloadPage, canI } = useContext(PageContext);
  /* end PAGE CONTEXT **************************** */

  /* ITEM CONTEXT **************************** */
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT **************************** */

  /* ELEMENT CONTEXT **************************** */
  const { element } = useContext(ElementContext);
  /* end ELEMENT CONTEXT **************************** */

  /* DELETE **************************************************/

  const afterLoad = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

  const [deleteElement, , loading] = useFetch({
    endpoint: "DELETE_MYITEM_ELEMENT",
    method: "DELETE",
    afterLoad,
  });

  /* end DELETE **************************************************/

  const removeElement = useCallback(() => {
    deleteElement({
      urlParams: [element?.math_element_id || ""],
    });
  }, [deleteElement, element]);

  return {
    canRemoveElement: (item?.elements?.length || 1) > 1 && canI.offer,
    removeElement,
    loading,
  };
};

export default useRemoveElement;
