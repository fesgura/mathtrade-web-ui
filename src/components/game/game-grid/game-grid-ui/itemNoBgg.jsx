import { useContext } from "react";
import { ItemContext } from "@/context/item";
import { ItemContextProvider } from "@/context/item";
import ElementXSS from "@/components/element/xss";
import Previewer from "@/components/previewer";
import UserBox from "@/components/userBox";

const ItemContent = () => {
  const { item } = useContext(ItemContext);

  const { elements } = item;

  return (
    <>
      <div className="flex flex-col gap-y-2 py-3">
        {elements.map((element, k) => {
          return <ElementXSS element={element} key={k} />;
        })}
      </div>
      <div className="flex items-center gap-3 justify-between">
        <UserBox toLeft />
        <Previewer className="rounded-full bg-primary w-6 sh-5" />
      </div>
      <div className="pt-3 mb-1"></div>
    </>
  );
};

const ItemNoBGG = ({ itemRaw }) => {
  return itemRaw ? (
    <ItemContextProvider itemRaw={itemRaw}>
      <ItemContent />
    </ItemContextProvider>
  ) : null;
};

export default ItemNoBGG;
