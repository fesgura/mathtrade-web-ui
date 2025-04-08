import { DateIntlFormat } from "@/utils/dateUtils";
import { useCallback, useMemo, useState, useContext } from "react";
import { ItemContext } from "@/context/item";
import useFetch from "@/hooks/useFetch";

const useComment = ({ comment, myUserId }) => {
  /* ITEM CONTEXT **********************************************/
  const { item, reloadItem } = useContext(ItemContext);
  const { id: itemId } = item;
  /* end ITEM CONTEXT */

  // const [upvotes, setUpvotes] = useState(comment?.upvotes || 0);
  // const [downvotes, setDownvotes] = useState(comment?.downvotes || 0);

  const urlParams = useMemo(() => {
    return [itemId, comment.id];
  }, [itemId, comment]);

  const afterLoadDelete = useCallback(() => {
    reloadItem();
  }, [reloadItem]);

  const [deleteComment, , loadingDel] = useFetch({
    endpoint: "DELETE_COMMENT",
    method: "DELETE",
    urlParams,
    afterLoad: afterLoadDelete,
  });
  /*
  const afterLoadVote = useCallback(({ upvotes, downvotes }) => {
    setUpvotes(upvotes);
    setDownvotes(downvotes);
  }, []);

  const [voteComment, , loadingVote] = useFetch({
    endpoint: "PUT_COMMENT",
    method: "PUT",
    urlParams,
    afterLoad: afterLoadVote,
  });

  const setVote = (vote) => {
    voteComment({
      params: { vote },
    });
  };
*/
  const data = useMemo(() => {
    const { content, date, membership } = comment;

    return {
      content,
      date: DateIntlFormat(date),
      isMyUser: myUserId === membership.id,
      user: {
        name: `${membership.first_name} ${membership.last_name}`,
        avatar: membership?.avatar || "",
        customLocation: membership?.location?.name || null,
        locationId: membership?.locationId || "",
      },
    };
  }, [comment, myUserId]);

  return {
    ...data,
    // upvotes,
    // downvotes,
    deleteComment,
    loading: loadingDel, // || loadingVote,
    // setVote,
  };
};

export default useComment;
