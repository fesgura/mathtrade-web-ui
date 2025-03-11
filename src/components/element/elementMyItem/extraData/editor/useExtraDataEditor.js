import { useCallback, useContext, useState } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { ElementContext } from "@/context/element";
import useFetch from "@/hooks/useFetch";

const useExtraDataEditor = (onCancel, toggleEditingMode) => {
  /* PAGE CONTEXT **************************** */
  const { forceReloadPage } = useContext(PageContext);
  /* end PAGE CONTEXT **************************** */

  /* ITEM CONTEXT **************************** */
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT **************************** */

  /* ELEMENT CONTEXT **************************** */
  const { element } = useContext(ElementContext);
  const { extraData } = element;
  /* end ELEMENT CONTEXT **************************** */

  const [box_status, setBoxStatus] = useState(extraData?.box_status || "");
  const [component_status, setComponentStatus] = useState(
    extraData?.component_status || ""
  );
  const [images, setImages] = useState(extraData?.images || "");
  const [comment, setComment] = useState(extraData?.comment || "");

  /* POST **************************************************/

  const afterLoad = useCallback(() => {
    forceReloadPage();
    if (onCancel) onCancel();
    toggleEditingMode();
  }, [forceReloadPage, onCancel, toggleEditingMode]);

  const [postElement, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYITEM",
    method: "POST",
    afterLoad,
  });

  /* end POST **************************************************/

  /* PUT **************************************************/

  const [putElement, , loadingPut, errorPut] = useFetch({
    endpoint: "PUT_MYITEM",
    method: "PUT",
    afterLoad,
  });

  /* end PUT **************************************************/

  const onSubmit = useCallback(
    (d) => {
      const params = { ...d, math_item: item?.id ? `${item?.id}` : null };
      const id = element?.math_element_id;

      if (id) {
        putElement({
          params,
          urlParams: [id],
        });
      } else {
        postElement({
          params,
        });
      }
    },
    [postElement, putElement, item, element]
  );

  return {
    validations: {
      box_status: ["required"],
      component_status: ["required"],
    },
    element_id: element?.id || null,
    math_item: item?.id || null,
    box_status,
    setBoxStatus,
    component_status,
    setComponentStatus,
    images,
    setImages,
    comment,
    setComment,
    loading: loadingPut || loadingPost,
    error: errorPut || errorPost,
    onSubmit,
  };
};

export default useExtraDataEditor;
