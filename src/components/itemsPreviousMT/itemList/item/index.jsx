import { ItemContextProvider } from "@/context/item";
import ItemUI from "./ui";

const ItemPreviousMT = ({ itemRaw, afterAddItem }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemUI afterAddItem={afterAddItem} />
    </ItemContextProvider>
  );
};
export default ItemPreviousMT;
