import Thumbnail from "@/components/thumbnail";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import { ElementContext, ElementContextProvider } from "@/context/element";
import { useContext } from "react";

const ElementUI = ({ toAdd, onToggle }) => {
  const { element } = useContext(ElementContext);

  return (
    <div className="bg-white border border-gray-400 rounded-lg">
      <div className="relative">
        <Thumbnail elements={[element]} className="rounded-t-lg" />
        {toAdd ? (
          <button
            className="absolute top-0 left-0 w-full h-full bg-black/60 text-white rounded-tl-lg rounded-tr-lg text-5xl opacity-0 hover:opacity-100 transition-opacity"
            title={getI18Ntext("btn.Add")}
            onClick={() => {
              onToggle(true);
            }}
          >
            <Icon type="plus" />
            <div className="uppercase text-xs font-bold leading-none">
              <I18N id="btn.Add" />
            </div>
          </button>
        ) : null}
      </div>

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
