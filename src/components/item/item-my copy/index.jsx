import { ItemContextProvider } from "@/context/item";
//import ItemUI from "./item-ui";

const ItemMy = ({ itemRaw, type }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      {/* <ItemUI /> */}
      ItemMY
    </ItemContextProvider>
  );
};
export default ItemMy;
