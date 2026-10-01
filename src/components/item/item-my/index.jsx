import { ItemContextProvider } from "@/context/item";
import ItemUI from "./item-ui";

const ItemMy = ({ itemRaw, tourAnchor = undefined }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemUI tourAnchor={tourAnchor} />
    </ItemContextProvider>
  );
};
export default ItemMy;
