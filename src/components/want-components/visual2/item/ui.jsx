import { useContext } from "react";
import { ItemContext } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import Previewer from "@/components/previewer";
import ValueMini from "@/components/value/mini";

const ItemVisual2UI = () => {
  const { item } = useContext(ItemContext);
  const { title, elements, value } = item;

  return (
    <div className="sm:p-3 p-1 rounded-lg relative bg-white border-gray-300 shadow-xl">
      <div className="rounded-lg border border-gray-400 relative">
        <Thumbnail elements={elements} className="rounded-lg sm:w-52 w-24" />
        <div className="absolute bg-primary text-white bottom-1 left-1 rounded-full">
          <Previewer />
        </div>
        <div className="absolute bottom-1 right-1">
          <ValueMini currentValue={value} />
        </div>
      </div>
      <div className="text-center px-2 sm:pt-3 pt-1 sm:w-52 w-24 cursor-default">
        <h4 className="text-xs font-bold cropped" title={title}>
          {title}
        </h4>
      </div>
    </div>
  );
};
export default ItemVisual2UI;
