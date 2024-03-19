import { useMemo, useContext } from "react";
import { ItemContext } from "@/context/item";
import useFetch from "@/hooks/useFetch";
import { useStore } from "@/store";

const useListComment = () => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id: itemId, commentsCount } = item;
  /* end ITEM CONTEXT */

  const { user } = useStore((state) => state.data);

  const urlParams = useMemo(() => {
    return [itemId];
  }, [itemId]);

  const [, list, loading, errors] = useFetch({
    endpoint: "GET_COMMENTS",
    urlParams,
    initialState: [],
    autoLoad: commentsCount >= 0,
    reloadValue: commentsCount || 0,
  });

  return { list, loading, errors, myUserId: user?.id || "" };
};

export default useListComment;
