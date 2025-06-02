import BGGinfo from "@/components/bggInfo";
import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import StatusBadge from "@/components/status-badge";
import PhotoGallery from "@/components/photoGallery";
import ElementWrapperInside from "../elementCollection/elementWrapperInside";
import { ElementContext } from "@/context/element";
import { useContext } from "react";
import BadgeType from "@/components/badgeType";

const ElementCompleteUI = () => {
  const { element } = useContext(ElementContext);

  const {
    typeNum,
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
    <ElementWrapperInside>
      <div className="relative flex sm:flex-row flex-col md:gap-6 gap-3">
        <div className="relative lg:w-52 w-24 lg:h-52 h-24 rounded-lg shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]">
          <Thumbnail elements={[element]} className="rounded-lg lg:w-52 w-24" />
        </div>
        <div className="grow">
          <div className="border-b border-gray-300 sm:flex items-end justify-between pb-2 mb-3">
            <div className="">
              <BadgeType
                className="text-[9px]"
                type="item"
                subtype={typeNum || 1}
              />
              <h3 className="text-lg font-bold">{title}</h3>
            </div>
          </div>

          {titleLink ? null : (
            <div className="italic text-gray-500 font-bold text-xs mb-3">
              <I18N id="element-type-badge-3" />
            </div>
          )}

          {notGame ? null : (
            <BGGinfo
              game={game}
              contextFor="element"
              bggLink={titleLink}
              className=" mb-3"
            />
          )}
          <div className="pt-1">
            <div className="text-sm italic text-gray-500">
              <LinkExternal
                href={publisherLink}
                tooltip="element.BGG.OpenEditionInBGG"
              >
                {publisher}
              </LinkExternal>
            </div>
            <div className="flex gap-3 items-center mb-3">
              <div className="text-sm text-purple-950 font-bold">
                {language}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-300 pt-3">
            <div className="flex gap-6">
              <div className="flex flex-col gap-1">
                <div className="text-[10px] opacity-90 leading-none">
                  <I18N id="status.label.box" />
                </div>
                <StatusBadge status={box_status || ""} type="box" />
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[10px] opacity-90  leading-none">
                  <I18N id="status.label.components" />
                </div>
                <StatusBadge status={component_status || ""} />
              </div>
            </div>

            {comment && (
              <div className="text-sm text-gray-600 mt-3">{comment}</div>
            )}
            <PhotoGallery
              images={images || ""}
              className="mt-3 border-t  border-gray-300 py-3"
            />
          </div>
        </div>
      </div>
    </ElementWrapperInside>
  );
};

export default ElementCompleteUI;
