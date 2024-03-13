import { useCallback, useRef } from "react";
import useFetch from "@/hooks/useFetch";

const useValueEditor = (
  intialValue,
  setValue,
  onClose,
  itemListId,
  onChangeValue
) => {
  const currentValueRef = useRef(intialValue);

  const onChange = useCallback((v) => {
    currentValueRef.current = v;
  }, []);

  ////////////////////////////////////////

  /* POST VALUE ************************************************/
  const afterLoad = useCallback(() => {
    setValue(currentValueRef.current);
    if (onChangeValue) {
      onChangeValue(currentValueRef.current);
    }
    onClose();
  }, [setValue, onChangeValue, onClose]);

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
