import Icon from "../icon";
import ItemCommentTitle from "./title";
import clsx from "clsx";
import { useCallback, useState, useContext } from "react";
import { ItemContext } from "@/context/item";
import CommentEditor from "./editor";
import List from "./list";

const ItemComments = ({ className }) => {
  const { item } = useContext(ItemContext);
  const { commentsCount } = item;

  const [showComments, setShowComments] = useState(false);

  const toggleShowComments = useCallback(() => {
    setShowComments((v) => !v);
  }, []);

  return typeof commentsCount === "undefined" ? null : (
    <div className={className}>
      <h3
        className="flex items-center cursor-pointer h-5 w-fit"
        onClick={toggleShowComments}
      >
        <strong className="text-xs block text-gray-600 leading-5">
          <ItemCommentTitle />
        </strong>
        <span
          className={clsx(
            "text-xl block leading-none text-gray-600 transition-transform relative top-[-1px]",
            {
              "rotate-90": showComments,
            }
          )}
        >
          <Icon type="chevron-right" />
        </span>
      </h3>
      {showComments && (
        <div className="px-4">
          <List />
          <CommentEditor />
        </div>
      )}
    </div>
  );
};
export default ItemComments;
