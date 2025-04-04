import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";
import { getRandomColor } from "@/utils/color";

const useTagEditor = (tag, onClose) => {
  /* PAGE CONTEXT **********************************************/
  const { setItemTags } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* FILTERS **********************************************/
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS **********************************************/

  /* INPUT REF **********************************************/
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  /* end INPUT REF **********************************************/

  /* FORM *********************************** */
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || getRandomColor());
  /* end FORM *********************************** */

  /* ITEM TAGS *********************************************/
  const afterLoadItemTags = useCallback(
    (list) => {
      const tags = list.map((tag, i) => {
        return {
          ...tag,
          id: `${tag?.id || i}`,
          itemsComplete: tag.items,
          items: tag.items.map(({ id }) => id),
        };
      });
      setItemTags(tags);
      onClose();
    },
    [setItemTags, onClose]
  );

  const [loadMyTags, , loadingMyTags] = useFetch({
    endpoint: "MYTAGS",
    initialState: [],
    afterLoad: afterLoadItemTags,
  });
  /* end ITEM TAGS *********************************************/

  /* PUT TAG ************************************************/
  const afterLoadPutMyItemTag = useCallback(() => {
    loadMyTags();
  }, [loadMyTags]);

  const [putMyItemTag, , loadingPut, errorPut] = useFetch({
    endpoint: "PUT_MYTAGS",
    method: "PUT",
    afterLoad: afterLoadPutMyItemTag,
  });
  /* end PUT TAG ************************************************/

  /* POST TAG ************************************************/
  const afterLoadPostMyItemTag = useCallback(() => {
    loadMyTags();
  }, [loadMyTags]);

  const [postMyItemTag, , loadingPost, errorPost] = useFetch({
    endpoint: "POST_MYTAGS",
    method: "POST",
    afterLoad: afterLoadPostMyItemTag,
  });
  /* end POST TAG ************************************************/

  /* DELETE TAG ************************************************/
  const afterDeletePostMyItemTag = useCallback(() => {
    updateFilters({ tag: undefined }, "item");
    loadMyTags();
  }, [loadMyTags, updateFilters]);

  const [deleteMyItemTag, , loadingDelete] = useFetch({
    endpoint: "DELETE_MYTAGS",
    method: "DELETE",
    afterLoad: afterDeletePostMyItemTag,
  });
  /* end DELETE TAG ************************************************/

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (tag) {
        const tagClone = { ...tag };
        const { id } = tagClone;
        delete tagClone.id;

        putMyItemTag({
          urlParams: [id],
          params: {
            ...tagClone,
            ...{ name, color },
          },
        });
      } else {
        postMyItemTag({
          params: { name, color, items: [] },
        });
      }
    },
    [tag, name, color, putMyItemTag, postMyItemTag]
  );

  const onDelete = useCallback(
    (e) => {
      e.preventDefault();
      const { id } = tag;
      deleteMyItemTag({
        urlParams: [id],
      });
    },
    [tag, deleteMyItemTag]
  );

  return {
    inputRef,
    name,
    setName,
    color,
    setColor,
    loading: loadingMyTags || loadingPut || loadingPost || loadingDelete,
    error: errorPut || errorPost,
    onCancel,
    onSubmit,
    onDelete,
  };
};

export default useTagEditor;
