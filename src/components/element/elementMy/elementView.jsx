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

const ElementView = ({ element, toggleEditingMode }) => {
  const { deleteElement, loading, error } = useDeleteElement(element);

  const {
    type,
    game,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    notGame,
  } = element;

  return (
    <div className="relative flex md:gap-6 gap-3">
      <div className="relative lg:w-52 w-24 lg:h-52 h-24 rounded-lg shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]">
        <Thumbnail elements={[element]} className="rounded-lg lg:w-52 w-24" />
      </div>
      <div className="grow">
        <div className="pr-[60px]">
          <div className="uppercase text-[10px] font-bold text-gray-400">
            {type}
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            {titleLink ? (
              <LinkExternal
                href={titleLink}
                className="flex items-center gap-1 w-fit leading-none text-bgg text-xs mb-3"
                tooltip="element.BGG.OpenGameInBGG"
              >
                BGG
                <Icon type="external-link" />
              </LinkExternal>
            ) : (
              <div className="italic text-gray-500 font-bold text-xs mb-3">
                <I18N id="element-type-badge-3" />
              </div>
            )}
          </div>
        </div>

        {notGame ? null : (
          <BGGinfo
            game={game}
            contextFor="element"
            className="pb-4 border-b border-gray-300 mb-3"
          />
        )}

        <div className="text-sm italic text-gray-500 mb-2 ">
          <LinkExternal
            href={publisherLink}
            tooltip="element.BGG.OpenEditionInBGG"
          >
            {publisher}
          </LinkExternal>
        </div>
        <div className="flex gap-3 items-center mb-3">
          <div className="text-sm text-purple-950 font-bold">{language}</div>
        </div>
        <div className="border-t text-gray-500 pt-4 flex justify-between items-center">
          <button
            className=" bg-primary text-white font-bold text-lg px-6 py-2 text-sm rounded-full hover:bg-sky-800  transition-colors"
            onClick={toggleEditingMode}
          >
            <InnerButton>
              <Icon type="edit" />
              <I18N id="element.Edit" />
            </InnerButton>
          </button>
          <ButtonAlert
            className="border border-danger text-danger font-bold text-xs px-2 py-1 rounded-full hover:bg-danger hover:text-white transition-colors"
            title="Delete.Element"
            onClick={deleteElement}
          >
            <InnerButton>
              <Icon type="trash" />
              <I18N id="btn.Delete" />
            </InnerButton>
          </ButtonAlert>
        </div>
        <ErrorAlert error={error} className="mt-3 mb-0" />
      </div>
      <LoadingBox loading={loading} min />
    </div>
  );
};
export default ElementView;
