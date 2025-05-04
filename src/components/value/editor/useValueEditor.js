import { useCallback, useRef, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";

const useValueEditor = (
  intialValue,
  setValue,
  onClose,
  itemListId,
  onChangeValue,
  type
) => {
  /* PAGE CONTEXT **********************************************/
  const { forceReloadPage, pageType } = useContext(PageContext);

  const currentValueRef = useRef(intialValue);

  const onChange = useCallback((v) => {
    currentValueRef.current = v;
  }, []);

  ////////////////////////////////////////

  /* ITEM CONTEXT **************************/
  const { reloadItem } = useContext(ItemContext);
  /* end ITEM CONTEXT **************************/

  /* POST VALUE ************************************************/
  const afterLoad = useCallback(() => {
    setValue(currentValueRef.current);
    if (onChangeValue) {
      onChangeValue(currentValueRef.current);
    }
    if (type === "group") {
      forceReloadPage();
    }
    if (
      (reloadItem && pageType === "wants-visual") ||
      pageType === "wants-grid"
    ) {
      reloadItem();
    }
    onClose();
  }, [
    setValue,
    onChangeValue,
    onClose,
    type,
    forceReloadPage,
    pageType,
    reloadItem,
  ]);

  const [postValue, , loading, error] = useFetch({
    endpoint: "POST_VALUE_ITEMS",
    method: "POST",
    afterLoad,
  });
  /* end POST VALUE ************************************************/

  const onClick = useCallback(() => {
    postValue({
      params: {
        value: currentValueRef.current,
        item_ids: itemListId,
      },
    });
  }, [postValue, itemListId]);

  return { onChange, onClick, loading, error };
};

export default useValueEditor;
