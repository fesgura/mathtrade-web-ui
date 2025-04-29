import { useContext } from "react";
import { ItemContext } from "@/context/item";
import BanButtonUI from "./ui";

const BanButton = ({ className, type = "item", size = "xl" }) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  /* end ITEM CONTEXT */

  return item?.isOwned ? null : (
    <BanButtonUI className={className} type={type} size={size} />
  );
};
export default BanButton;
