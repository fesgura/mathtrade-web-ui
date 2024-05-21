import { useContext } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import Previewer from "@/components/previewer";

const ItemChangeUI = () => {
  const { item } = useContext(ItemContext);
  const { title, elements } = item;
  return (
    <div className="relative rounded-lg bg-white shadow-xl">
      <div className=" border-b border-gray-300 relative">
        <Thumbnail
          elements={elements || []}
          className="rounded-tl-lg rounded-tr-lg sm:w-32 w-16"
        />

        <div className="absolute bg-primary text-white sm:bottom-1 bottom-0 sm:right-1 right-0 rounded-full">
          <Previewer />
        </div>
      </div>
      <div className="text-center p-1 sm:w-32 w-16">
        <h4
          className="text-[10px] leading-3 font-bold cropped cursor-default"
          title={title}
        >
          {title}
        </h4>
      </div>
    </div>
  );
};

const ItemChange = ({ item }) => {
  return item ? (
    <ItemContextProvider itemRaw={item}>
      <ItemChangeUI />
    </ItemContextProvider>
  ) : null;
};

export default ItemChange;
