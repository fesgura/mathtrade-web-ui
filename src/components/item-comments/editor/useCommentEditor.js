import { useState, useMemo, useCallback, useContext } from "react";
import { ItemContext } from "@/context/item";
import useFetch from "@/hooks/useFetch";

const useCommentEditor = () => {
  /* ITEM CONTEXT **********************************************/
  const { item, reloadItem } = useContext(ItemContext);
  const { id: itemId } = item;
  /* end ITEM CONTEXT */

  const [content, setContent] = useState("");

  const urlParams = useMemo(() => {
    return [itemId];
  }, [itemId]);

  const afterLoad = useCallback(() => {
    setContent("");
    reloadItem();
  }, [reloadItem]);

  const [postComment, , loading, errors] = useFetch({
    endpoint: "POST_COMMENT",
    method: "POST",
    urlParams,
    afterLoad,
  });

  return {
    content,
    setContent,
    validations: {
      content: ["required"],
    },
    onSubmit: (params) => {
      postComment({
        params,
      });
    },
    loading,
    errors,
  };
};

export default useCommentEditor;
