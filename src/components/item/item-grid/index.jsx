import { ItemContextProvider } from "@/context/item";
import { WantGroupContextProvider } from "@/context/wantGroup";
import ItemGridUI from "./item-grid-ui";

const ItemGrid = ({ itemRaw, expanded, setExpanded }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <WantGroupContextProvider contextType="item">
        <ItemGridUI expanded={expanded} setExpanded={setExpanded} />
      </WantGroupContextProvider>
    </ItemContextProvider>
  );
};

export default ItemGrid;
