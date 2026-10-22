import { TagContextProvider } from "@/context/tag";
import { WantGroupContextProvider } from "@/context/wantGroup";
import ItemTagHeaderUI from "./ui";

const ItemTagHeader = () => {
  return (
    <TagContextProvider>
      <WantGroupContextProvider contextType="tag">
        <ItemTagHeaderUI />
      </WantGroupContextProvider>
    </TagContextProvider>
  );
};

export default ItemTagHeader;
