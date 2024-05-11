import { ItemContextProvider } from "@/context/item";
import ItemVisual2UI from "./ui";

const ItemVisual2 = ({ itemRaw }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemVisual2UI />
    </ItemContextProvider>
  );
};
export default ItemVisual2;
