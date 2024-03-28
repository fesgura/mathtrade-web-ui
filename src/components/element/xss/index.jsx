import StatusBadge from "@/components/status-badge";
import Previewer from "@/components/previewer";
import UserBox from "@/components/userBox";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import Thumbnail from "@/components/thumbnail";
import clsx from "clsx";
import ValueMini from "@/components/value/mini";

const ElementXSS = ({ element }) => {
  console.log(element);
  const { title } = element;

  return (
    <div className="border-white/20 border-x border-b p-1">
      <div className="flex items-center gap-x-3 gap-y-2">
        <Thumbnail elements={[element]} className="w-5" />
        <div data-tooltip={title}>
          <h3 className="text-xs font-bold cropped_1 xmax-w-[260px]">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ElementXSS;
