import { ElementContextProvider } from "@/context/element";
import { useContext } from "react";
import { ElementContext } from "@/context/element";
import StatusBadge from "@/components/status-badge";
import Thumbnail from "@/components/thumbnail";

const ElementXSSUI = () => {
  const { element } = useContext(ElementContext);

  const {
    type,
    game,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    notGame,
    extraData,
  } = element;

  const { box_status, component_status, comment, images } = extraData;

  return (
    <div className="flex items-center gap-x-3 gap-y-2 border border-gray-700 rounded-md">
      <Thumbnail elements={[element]} className="w-10 rounded-l-md" />
      <div className="">
        <div data-tooltip={title}>
          <h3 className="text-xs font-bold cropped_1 mb-1">{title}</h3>
        </div>
        <div className="flex items-center gap-x-3">
          <StatusBadge status={box_status || ""} type="box" min />
          <StatusBadge status={component_status || ""} min />
          <div className="text-[10px] text-purple-200 font-bold">
            {language}
          </div>
        </div>
      </div>
    </div>
  );
};

const ElementXSS = ({ element }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementXSSUI />
    </ElementContextProvider>
  );
};

export default ElementXSS;
