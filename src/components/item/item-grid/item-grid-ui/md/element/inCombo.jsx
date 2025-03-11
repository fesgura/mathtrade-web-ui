import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import StatusBadge from "@/components/status-badge";
import { ElementContext } from "@/context/element";
import { useContext } from "react";

const ElementInCombo = ({ onToggleExpanse }) => {
  const { element } = useContext(ElementContext);

  const { title, language, extraData } = element;

  const { box_status, component_status } = extraData;

  return (
    <div className="flex items-center">
      <div>
        <div className="relative bg-black rounded-l-lg w-16">
          <Thumbnail elements={[element]} className="rounded-l-lg" />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-l-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            onClick={onToggleExpanse}
          >
            <div className="text-center text-white">
              <Icon type="plus" className="text-3xl" />
              <div className="font-bold uppercase text-[10px]">
                <I18N id="Enlarge" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2">
        <div
          data-tooltip={getI18Ntext("Enlarge")}
          className="cursor-pointer mb-1"
          onClick={onToggleExpanse}
        >
          <h3 className="text-sm font-bold cropped_1 hover:opacity-70 leading-none">
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1 items-center mb-1">
          <StatusBadge status={box_status} type="box" min />
          <StatusBadge status={component_status} min />
        </div>
        <div className="text-xs cropped_1 text-purple-950 font-bold">
          {language}
        </div>
      </div>
    </div>
  );
};

export default ElementInCombo;
