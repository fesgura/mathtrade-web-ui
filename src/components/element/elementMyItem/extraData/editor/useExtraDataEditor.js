import { useCallback, useContext, useState } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import { ElementContext } from "@/context/element";
import { useOptions } from "@/store";
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
  const { extraData, box_size: box_size_original } = element;

  /* end ELEMENT CONTEXT **************************** */

  /* FILTER OPTIONS **********************************************/
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTER OPTIONS *********************************************/

  const [box_size, setBox_size] = useState(box_size_original);

  const [box_status, setBoxStatus] = useState(extraData?.box_status || "");
  const [component_status, setComponentStatus] = useState(
    extraData?.component_status || ""
  );
  const [images, setImages] = useState(extraData?.images || "");
  const [comment, setComment] = useState(extraData?.comment || "");

  /* POST **************************************************/

  const afterLoad = useCallback(() => {
    updateFilters(
      {
        keyword: undefined,
      },
      "myoffer"
    );
    forceReloadPage();
    if (onCancel) onCancel();
    toggleEditingMode();
  }, [updateFilters, forceReloadPage, onCancel, toggleEditingMode]);

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
      box_size: ["required"],
      box_status: ["required"],
      component_status: ["required"],
    },
    element_id: element?.id || null,
    box_size,
    setBox_size,
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
