import { useContext } from "react";
import { ItemContext } from "@/context/item";
import I18N from "@/i18n";
import BanButton from "@/components/ban/button";
import FavoriteButton from "@/components/favorite/button";
import Value from "@/components/value";
import ItemTagList from "@/components/item-tags/item-taglist";
import SelectTick from "@/components/ban/bulk/SelectTick";
import useBulkSelect from "@/components/ban/bulk/useBulkSelect";
import { itemDisabledReason } from "@/components/ban/bulk/itemDisabledReason";
import CopyLinkButton from "@/components/previewer/modal/copyLinkButton";

type ItemGridHeaderProps = {
  onChangeValue?: (value: unknown) => void;
  hideTags?: boolean;
  className?: string;
  // The header is the card's top edge (combo card, expanded card): while
  // selecting, the tick pill sits over the tag chips, so they step aside.
  atCardTop?: boolean;
  // Admin-only "Copiar link" (item permalink) on grid cards. The preview
  // modal has its own, bigger one in the modal header.
  copyLink?: boolean;
};

type ItemHeaderData = {
  id?: number;
  isCombo?: boolean;
  ban_id?: number | string | null;
  isOwned?: boolean;
};

const ItemGridHeader = ({
  onChangeValue = undefined,
  hideTags = false,
  className = "mb-2",
  atCardTop = false,
  copyLink = false,
}: ItemGridHeaderProps) => {
  const { item, showAsIgnored } = useContext(ItemContext);
  const { id, isCombo, ban_id, isOwned } = (item || {}) as ItemHeaderData;
  const { selecting } = useBulkSelect();

  return (
    <header className={className}>
      {/* While selecting, the tick replaces the ignore button; it is placed
          at the card's top-left corner (same as the game cards). */}
      {selecting ? (
        <SelectTick
          id={id}
          disabledReason={itemDisabledReason({ isOwned, ban_id, showAsIgnored })}
        />
      ) : null}
      <div className="flex items-start justify-between gap-3 min-w-0 w-full">
        {ban_id || hideTags || (selecting && atCardTop) ? (
          <div className="min-w-0" />
        ) : (
          <div className="min-w-0 flex-1">
            <ItemTagList />
          </div>
        )}
        <div className="flex items-center gap-3 shrink-0">
          {/* hideTags only means "no tag chips" — it shouldn't also hide
              the ignore/ban control, which both preview modals need
              (they pass hideTags for the tags, not to hide this). */}
          {copyLink && !selecting ? (
            <CopyLinkButton id={id} variant="compact" />
          ) : null}
          <FavoriteButton type="item" />
          {selecting ? null : <BanButton size="xl" type="item" />}
          {ban_id ? null : (
            <>
              {isOwned ? null : <div className="w-[1px] h-4 bg-gray-500"></div>}
              <Value type="item" onChange={onChangeValue} />
            </>
          )}
        </div>
      </div>
      {isCombo ? (
        <h3 className="uppercase text-sm font-bold text-gray-900 border-t border-gray-500 border-dotted leading-none mt-2 pt-2">
          <I18N id="element-type-badge-0" />
        </h3>
      ) : null}
    </header>
  );
};

export default ItemGridHeader;
