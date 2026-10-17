"use client";
import { useContext } from "react";
import { ItemContext, ItemContextProvider } from "@/context/item";
import Previewer from "@/components/previewer";
import WantMiniCard from "@/components/want-components/mini-card";
import { resolveItemKind } from "@/components/badgeType/cardKind";
import useItem from "./useItem";

const ItemUI = ({ toAdd = false, onToggle, canIwant = false }) => {
  const { item } = useContext(ItemContext);
  if (!item) return null;
  const { id, title, elements, value, isCombo } = item;
  const typeNum = elements?.[0]?.element?.game?.type || 1;

  return (
    <WantMiniCard
      title={title}
      elements={[
        { thumbnail: elements?.[0]?.element?.thumbnail || "", name: title },
      ]}
      kind={resolveItemKind(item)}
      badgeType="item"
      badgeSubtype={typeNum}
      isCombo={isCombo}
      value={value}
      toAdd={toAdd}
      onAdd={toAdd ? () => onToggle(true) : undefined}
      onRemove={!toAdd && canIwant ? () => onToggle(false) : undefined}
      preview={
        <Previewer
          itemId={id}
          className="w-[18px] h-[18px] rounded-full bg-primary text-white flex items-center justify-center text-[10px]"
        />
      }
    />
  );
};

const ItemToOffer = ({
  item = null,
  toAdd = false,
  wantGroupId = null,
  disabled = false,
}) => {
  const { onToggle, canIwant } = useItem(item, wantGroupId);

  return (
    <ItemContextProvider itemRaw={item}>
      <ItemUI toAdd={toAdd} onToggle={onToggle} canIwant={canIwant && !disabled} />
    </ItemContextProvider>
  );
};

export default ItemToOffer;
