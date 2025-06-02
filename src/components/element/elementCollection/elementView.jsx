import BGGinfo from "@/components/bggInfo";
import Thumbnail from "@/components/thumbnail";
import LinkExternal from "@/components/link-external";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import ButtonAlert from "@/components/buttonAlert";
import InnerButton from "@/components/button/inner-button";
import useDeleteElement from "./useDeleteElement";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";
import BoxSize from "@/components/boxSize";
import { ElementContext } from "@/context/element";
import { PageContext } from "@/context/page";
import { useContext, useMemo } from "react";
import BadgeType from "@/components/badgeType";

const ElementView = ({ toggleEditingMode, insideItem, extraContent }) => {
  const { canI } = useContext(PageContext);

  const { element } = useContext(ElementContext);

  const { deleteElement, loading, error } = useDeleteElement(element);

  const {
    typeNum,
    game,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    notGame,
    offered,
    box_size,
  } = element;

  const showEdition = useMemo(() => {
    if (insideItem) {
      return false;
    }
    if (offered && !canI.offer) {
      return false;
    }
    return true;
  }, [insideItem, canI, offered]);

  return (
    <div className="relative flex sm:flex-row flex-col  md:gap-6 gap-3">
      {offered ? (
        <div className="absolute  -right-4 uppercase font-bold bg-item-500 text-white text-[10px] px-3 py-[2px] rounded-l-full shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
          <I18N id="element.Offered" />
        </div>
      ) : null}
      <div className="relative lg:w-52 w-24 lg:h-52 h-24 rounded-lg shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]">
        <Thumbnail elements={[element]} className="rounded-lg lg:w-52 w-24" />
      </div>
      <div className="grow">
        <div className="border-b border-gray-300 pb-2 pr-16 mb-3">
          <div>
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
            className=" mb-3"
            bggLink={titleLink}
          />
        )}
        <div className="pt-1 flex flex-wrap gap-4 items-start mb-3">
          <div>
            <div className="text-sm italic text-gray-500">
              <LinkExternal
                href={publisherLink}
                tooltip="element.BGG.OpenEditionInBGG"
              >
                {publisher}
              </LinkExternal>
            </div>
            <div className="text-sm text-purple-950 font-bold ">{language}</div>
          </div>
          <div className="flex gap-3 items-center">
            <BoxSize value={box_size} isComplete />
          </div>
        </div>

        {/* <div className="border-t text-gray-500 pt-4 flex justify-between items-center">
       
        </div> */}
        {showEdition ? (
          <div className="flex items-center gap-1 border-t text-gray-500 pt-3">
            <button
              className="bg-primary text-white px-5 py-1 rounded-full font-bold text-sm hover:bg-sky-800  transition-colors"
              onClick={toggleEditingMode}
            >
              <InnerButton>
                <Icon type="edit" />
                <I18N id="element.Edit" />
              </InnerButton>
            </button>
            <ButtonAlert
              className="text-danger font-bold px-5 py-1 text-sm hover:text-red-900 transition-colors"
              title="Delete.Element"
              onClick={deleteElement}
            >
              <InnerButton>
                <Icon type="trash" />
                <I18N id="btn.Delete" />
              </InnerButton>
            </ButtonAlert>
          </div>
        ) : null}
        <ErrorAlert error={error} className="mt-3 mb-0" />
        {extraContent || null}
      </div>
      <LoadingBox loading={loading} min />
    </div>
  );
};
export default ElementView;
