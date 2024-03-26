import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { ItemContextProvider } from "@/context/item";
import StatusBadge from "@/components/status-badge";

const ItemContent = () => {
  const { item } = useContext(ItemContext);

  const { language, status } = item;

  return (
    <div className="pt-3">
      <div className="text-sm text-purple-400 font-bold">{language}</div>
      <StatusBadge status={status} />
    </div>
  );
};

const ItemNoBGG = ({ itemRaw }) => {
  return (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemContent />
    </ItemContextProvider>
  );
};

export default ItemNoBGG;
