import { useContext } from "react";
import { ItemContext } from "@/context/item";
import I18N from "@/i18n";
import BanButton from "@/components/ban/button";
import Value from "@/components/value";
import ItemTagList from "@/components/item-tags/item-taglist";

const ItemGridHeader = ({ onChangeValue }) => {
  const { item } = useContext(ItemContext);
  const { isCombo, ban_id } = item;

  return (
    <header className="mb-2">
      <div className="flex items-start justify-between gap-3">
        {ban_id ? null : <ItemTagList />}
        <div className="flex items-center gap-1">
          <BanButton size="xl" type="item" />
          {ban_id ? null : (
            <Value size="xl" type="item" onChange={onChangeValue} />
          )}
        </div>
      </div>
      {isCombo ? (
        <h3 className="uppercase text-sm font-bold text-gray-900 border-t border-gray-400 border-dotted leading-none mt-2 pt-2">
          <I18N id="element-type-badge-0" />
        </h3>
      ) : null}
    </header>
  );
};

export default ItemGridHeader;
