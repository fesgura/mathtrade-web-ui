import { useContext } from "react";
import BGGinfo from "@/components/bggInfo";
import Thumbnail from "@/components/thumbnail";
import StatusBadge from "@/components/status-badge";
import LinkExternal from "@/components/link-external";
import PhotoGallery from "@/components/photoGallery";
import clsx from "clsx";
import Value from "@/components/value";
import { ItemContext } from "@/context/item";
import MyGroupsInItem from "@/components/item-mygroups/header-groups";
import BanButton from "@/components/ban/button";
import Icon from "@/components/icon";
import I18N from "@/i18n";

const ElementXL = ({ element, onChangeValue }) => {
  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { isCombo } = item;
  /* end ITEM CONTEXT */

  const {
    type,
    game,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    status,
    comment,
    images,
    notGame,
  } = element;

  return (
    <div
      className={clsx({
        "py-4 border-t border-gray-300": isCombo,
        "pb-4": !isCombo,
      })}
    >
      <div className="flex md:gap-6 gap-3">
        <div className="relative lg:w-52 w-24 lg:h-52 h-24 rounded-lg shadow-[0_0_2px_1px_rgba(0,0,0,0.2)]">
          <Thumbnail elements={[element]} className="rounded-lg lg:w-52 w-24" />
          {isCombo ? null : (
            <>
              <Value size="md" type="item" onChange={onChangeValue} />
              <BanButton size="md" type="item" />
            </>
          )}
        </div>
        <div>
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

            {isCombo ? null : <MyGroupsInItem className="mb-4" />}
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
            <StatusBadge status={status} />
          </div>

          {comment && (
            <div className="text-sm text-gray-600 mb-3">{comment}</div>
          )}
          <PhotoGallery
            images={images}
            className="mb-3 border-t  border-gray-300 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ElementXL;
