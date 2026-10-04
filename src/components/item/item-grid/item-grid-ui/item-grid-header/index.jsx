import { useContext } from "react";
import { ItemContext } from "@/context/item";
import I18N from "@/i18n";
import BanButton from "@/components/ban/button";
import FavoriteButton from "@/components/favorite/button";
import Value from "@/components/value";
import ItemTagList from "@/components/item-tags/item-taglist";

const ItemGridHeader = ({
  onChangeValue = undefined,
  hideTags = false,
  className = "mb-2",
}) => {
  const { item } = useContext(ItemContext);
  const { isCombo, ban_id, isOwned } = item;

  return (
    <header className={className}>
      <div className="flex items-start justify-between gap-3 min-w-0 w-full">
        {ban_id || hideTags ? (
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
          <FavoriteButton type="item" />
          <BanButton size="xl" type="item" />
          {ban_id ? null : (
            <>
              {isOwned ? null : <div className="w-[1px] h-4 bg-gray-500"></div>}
              <Value size="xl" type="item" onChange={onChangeValue} />
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
