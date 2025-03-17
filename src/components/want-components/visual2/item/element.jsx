import Thumbnail from "@/components/thumbnail";
import { ElementContext, ElementContextProvider } from "@/context/element";
import { useContext } from "react";

const ElementUI = () => {
  const { element } = useContext(ElementContext);

  return (
    <div className="bg-white border border-gray-400 rounded-lg">
      <Thumbnail elements={[element]} className="rounded-t-lg" />

      <div className="text-center p-1 ">
        <h4
          className="text-[10px] leading-3 cropped_1 font-bold cropped cursor-default"
          title={element?.title}
        >
          {element?.title}
        </h4>
      </div>
    </div>
  );
};

const Element = ({ element, toAdd, onToggle }) => {
  return (
    <ElementContextProvider elementRaw={element}>
      <ElementUI toAdd={toAdd} onToggle={onToggle} />
    </ElementContextProvider>
  );
};

export default Element;
