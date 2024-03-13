import { useContext } from "react";
import { ItemContext } from "@/context/item";
import I18N from "@/i18n";

const ItemCommentTitle = () => {
  const { item } = useContext(ItemContext);
  const { commentsCount } = item;

  return (
    <I18N
      id={`itemComments.title.${
        commentsCount === 0 ? "none" : commentsCount === 1 ? "one" : "many"
      }`}
      values={[commentsCount]}
    />
  );
};

export default ItemCommentTitle;
