import { useContext, useCallback, useEffect, useRef, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";
import { getRandomColor } from "@/utils/color";

const useTagEditor = (
  tag: any = null,
  onClose: () => void = () => {},
  initialItemIds: (number | string)[] = []
) => {
  /* PAGE CONTEXT **********************************************/
  const { setItemTags } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* FILTERS **********************************************/
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS **********************************************/

  /* INPUT REF **********************************************/
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  /* end INPUT REF **********************************************/

  /* FORM *********************************** */
  const [name, setName] = useState(tag?.name || "");
  const [color, setColor] = useState(tag?.color || getRandomColor());
  // The tag's want: at most one game of the whole tag (default) or several.
  const [dupProtection, setDupProtection] = useState(
    tag?.dup_protection ?? true
  );
  /* end FORM *********************************** */

  /* ITEM TAGS *********************************************/
  const afterLoadItemTags = useCallback(
    ({ results }: { results: any[] }) => {
      const tags = results.map((tag: any, i: number) => {
        return {
          ...tag,
          id: `${tag?.id || i}`,
          itemsComplete: tag.items,
          items: tag.items.map(({ id }: { id: number }) => id),
        };
      });
      setItemTags(tags);
      onClose();
    },
    [setItemTags, onClose]
  );

  const [loadMyTags, , loadingMyTags] = useFetch({
    endpoint: "MYTAGS",
    initialState: { results: [] },
    afterLoad: afterLoadItemTags,
  });
  /* end ITEM TAGS *********************************************/

  /* PUT TAG ************************************************/
  const afterLoadPutMyItemTag = useCallback(() => {
    // My own tags are inherently bounded to one user's own entries - request
    // the max page size so they aren't silently truncated at the default (50).
    loadMyTags({ params: { page_size: 200 } });
  }, [loadMyTags]);

  const [putMyItemTag, , loadingPut, errorPut] = useFetch({
    endpoint: "PUT_MYTAGS",
    method: "PUT",
    afterLoad: afterLoadPutMyItemTag,
  });
  /* end PUT TAG ************************************************/

  /* POST TAG ************************************************/
  const afterLoadPostMyItemTag = useCallback(() => {
    loadMyTags({ params: { page_size: 200 } });
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
    loadMyTags({ params: { page_size: 200 } });
  }, [loadMyTags, updateFilters]);

  const [deleteMyItemTag, , loadingDelete] = useFetch({
    endpoint: "DELETE_MYTAGS",
    method: "DELETE",
    afterLoad: afterDeletePostMyItemTag,
  });
  /* end DELETE TAG ************************************************/

  const onCancel = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onSubmit = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (tag) {
        const tagClone = { ...tag };
        const { id } = tagClone;
        delete tagClone.id;

        putMyItemTag({
          urlParams: [id],
          params: {
            ...tagClone,
            ...{ name, color, dup_protection: dupProtection },
          },
        });
      } else {
        postMyItemTag({
          params: {
            name,
            color,
            items: initialItemIds,
            dup_protection: dupProtection,
          },
        });
      }
    },
    [
      tag,
      name,
      color,
      dupProtection,
      putMyItemTag,
      postMyItemTag,
      initialItemIds,
    ]
  );

  const onDelete = useCallback(
    (e: { preventDefault: () => void }) => {
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
    dupProtection,
    setDupProtection,
    loading: loadingMyTags || loadingPut || loadingPost || loadingDelete,
    error: errorPut || errorPost,
    onCancel,
    onSubmit,
    onDelete,
  };
};

export default useTagEditor;
