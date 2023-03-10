import { useEffect, useState } from "react";
import { useApi, MathTradeService } from "api_serv";
import classNames from "classnames";
import { LoadingBox } from "components/loading";
import Comment from "./comment";
import EditComment from "../editComment";

const CommentList = ({ item_id, setNum }) => {
  const [comments, setComments] = useState([]);

  const [getComments, , loading, errors] = useApi({
    promise: MathTradeService.getComments,
    afterLoad: (newComments) => {
      setNum(newComments.length);
      setComments(newComments);
    },
  });

  useEffect(() => {
    getComments({ item_id });
  }, [item_id]);

  return (
    <>
      <div className={classNames("item-comments-list", { loading })}>
        {loading ? <LoadingBox /> : null}
        {comments.map((comment) => {
          return (
            <Comment
              key={comment.id}
              data={comment}
              item_id={item_id}
              afterAnyChange={() => {
                getComments({ item_id });
              }}
            />
          );
        })}
      </div>
      <div className="item-comments-list-edit">
        <EditComment
          item_id={item_id}
          afterAnyChange={() => {
            getComments({ item_id });
          }}
        />
      </div>
    </>
  );
};

export default CommentList;
