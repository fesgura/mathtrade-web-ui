import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import StatusBadge from "@/components/status-badge";
import { ElementContext } from "@/context/element";
import { useContext } from "react";
import BadgeType from "@/components/badgeType";

const ElementComplete = ({ onToggleExpanse }) => {
  const { element } = useContext(ElementContext);

  const {
    //type,
    typeNum,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    extraData,
  } = element;

  const { box_status, component_status } = extraData;

  return (
    <>
      <div className="relative bg-black rounded-t-lg">
        <Thumbnail elements={[element]} className="rounded-t-lg" />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-t-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
          onClick={onToggleExpanse}
        >
          <div className="text-center text-white">
            <Icon type="plus" className="text-5xl" />
            <div className="font-bold uppercase text-xs">
              <I18N id="Enlarge" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between gap-2 mb-1">
          <BadgeType
            className="text-[9px]"
            type="item"
            subtype={typeNum || 1}
          />
          {titleLink ? (
            <LinkExternal
              href={titleLink}
              className="flex items-center gap-1 w-fit leading-none text-bgg text-xs"
              tooltip="element.BGG.OpenGameInBGG"
            >
              BGG
              <Icon type="external-link" />
            </LinkExternal>
          ) : null}
        </div>

        <div
          data-tooltip={getI18Ntext("Enlarge")}
          className="cursor-pointer mb-3"
          onClick={onToggleExpanse}
        >
          <h3 className="text-lg font-bold cropped hover:opacity-70 leading-tight">
            {title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1 items-center mb-2">
          <StatusBadge status={box_status} type="box" />
          <StatusBadge status={component_status} />
        </div>
        <div className="text-sm text-purple-950 font-bold mb-3">{language}</div>
        <div className="text-xs italic text-gray-500">
          <LinkExternal
            href={publisherLink}
            tooltip="element.BGG.OpenEditionInBGG"
          >
            {publisher}
          </LinkExternal>
        </div>
      </div>
    </>
  );
};

export default ElementComplete;
