import { ItemContextProvider } from "@/context/item";
import ItemUI from "./item-ui";

const ItemMy = ({ itemRaw }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemUI />
    </ItemContextProvider>
  );
};
export default ItemMy;
