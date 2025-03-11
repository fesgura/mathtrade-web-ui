import clsx from "clsx";
import Comment from "./comment";
import useListComment from "./useListComment";
import { LoadingBox } from "@/components/loading";

const List = () => {
  const { list, loading, myUserId } = useListComment();

  return (
    <div className={clsx("relative pt-5 pr-3", { "min-h-[80px]": loading })}>
      {list.map((comment, k) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            myUserId={myUserId}
            isLast={k === list.length - 1}
          />
        );
      })}
      <LoadingBox loading={loading} min zIndex={20} transparent />
    </div>
  );
};
export default List;
