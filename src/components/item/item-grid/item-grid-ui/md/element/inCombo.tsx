import Thumbnail from "@/components/thumbnail";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";
import StatusBadge from "@/components/status-badge";
import LanguagePills from "@/components/chip/languagePills";
import { ElementContext } from "@/context/element";
import { useContext } from "react";

type ElementInComboProps = {
  onToggleExpanse: () => void;
};

const ElementInCombo = ({ onToggleExpanse }: ElementInComboProps) => {
  const { element } = useContext(ElementContext);

  const { title, language, languageRaw, extraData } = element as {
    title: string;
    language?: string;
    languageRaw?: string;
    extraData: { box_status?: string; component_status?: string };
  };

  const { box_status, component_status } = extraData;

  return (
    <div className="flex items-start gap-3 min-w-0">
      <div className="relative w-16 h-16 shrink-0">
        <Thumbnail
          contain
          elements={[element]}
          className="rounded-lg w-full h-full"
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
          onClick={onToggleExpanse}
        >
          <Icon type="plus" className="text-lg text-white" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div data-tooltip={title} className="min-w-0 max-w-full">
          <h3
            className="text-body font-bold cursor-pointer hover:opacity-70 leading-tight truncate"
            onClick={onToggleExpanse}
          >
            {title}
          </h3>
        </div>
        <div className="flex flex-wrap gap-1 items-center mt-1 w-full min-w-0 max-w-full">
          <StatusBadge
            status={box_status}
            type="box"
            min
            label={getI18Ntext("status.label.box")}
          />
          <StatusBadge
            status={component_status}
            min
            label={getI18Ntext("status.label.components")}
          />
          <LanguagePills
            languageRaw={languageRaw}
            language={language}
            maxVisible={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ElementInCombo;
