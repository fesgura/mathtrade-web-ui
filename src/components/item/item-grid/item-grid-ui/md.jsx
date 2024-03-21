import clsx from "clsx";
import { useContext } from "react";
import { ItemContext } from "@/context/item";
import I18N, { getI18Ntext } from "@/i18n";
import LinkExternal from "@/components/link-external";
import UserBox from "@/components/userBox";
import StatusBadge from "@/components/status-badge";
import ItemCommentTitle from "@/components/item-comments/title";
import Thumbnail from "@/components/thumbnail";
import Icon from "@/components/icon";
import Value from "@/components/value";
import ItemTagList from "@/components/item-tags/item-taglist";
import WantButton from "@/components/want-button";
import BanButton from "@/components/ban/button";

const ItemMD = ({ onToggleExpanse }) => {
  const { item, showAsIgnored } = useContext(ItemContext);

  const {
    ban_id,
    isCombo,
    typeNum,
    title,
    titleLink,
    publisher,
    publisherLink,
    language,
    status,
    elements,
    user,
    commentsCount,
  } = item;

  return (
    <div
      className={clsx(
        "flex flex-col justify-between h-full p-3 transition-opacity",
        {
          "opacity-30": showAsIgnored,
        }
      )}
    >
      <div>
        <div className="relative w-52 h-52 rounded-lg shadow-[0_2px_6px_rgba(0,0,0,0.2)]">
          <Thumbnail elements={elements} className="rounded-lg w-52" />
          <div
            className="absolute top-0 left-0 w-full h-full bg-black/40 rounded-lg grid place-content-center backdrop-blur-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
            onClick={onToggleExpanse}
          >
            <div className="text-center text-white">
              <Icon type="plus" className="text-5xl" />
              <div className="font-bold uppercase text-xs">
                <I18N id="Ampliar" />
              </div>
            </div>
          </div>
          {ban_id ? null : <Value size="md" type="item" />}
          <BanButton size="md" type="item" />
        </div>
        <div className="p-3 px-1">
          <div
            className={clsx("uppercase text-[10px] font-bold", {
              "text-gray-400": !isCombo,
              "text-gray-900": isCombo,
            })}
          >
            <I18N id={`element-type-badge-${typeNum}`} />
          </div>

          <div
            data-tooltip={getI18Ntext("Ampliar")}
            className="cursor-pointer"
            onClick={onToggleExpanse}
          >
            <h3 className="text-lg font-bold cropped hover:opacity-70">
              {title}
            </h3>
          </div>

          {!isCombo && (
            <>
              <LinkExternal
                href={titleLink}
                className="flex items-center gap-1 w-fit leading-none text-bgg text-xs mb-3"
                tooltip="element.BGG.OpenGameInBGG"
              >
                BGG
                <Icon type="external-link" />
              </LinkExternal>
              <div className="text-sm italic text-gray-500 mb-2">
                <LinkExternal
                  href={publisherLink}
                  tooltip="element.BGG.OpenEditionInBGG"
                >
                  {publisher}
                </LinkExternal>
              </div>

              <div className="text-sm text-purple-950 font-bold">
                {language}
              </div>
              <StatusBadge status={status} />
            </>
          )}
          {commentsCount ? (
            <div className="text-xs font-bold text-gray-500 mb-2 pt-1">
              <ItemCommentTitle />
            </div>
          ) : null}

          <div className="border-t border-gray-300 border-dotted mt-3 pt-2">
            <UserBox userForce={user} />
          </div>
        </div>
      </div>
      {ban_id ? null : (
        <div className="pt-1">
          <ItemTagList />
          <WantButton contextSize="md" />
        </div>
      )}
    </div>
  );
};

export default ItemMD;
