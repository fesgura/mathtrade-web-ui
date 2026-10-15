"use client";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import WantMiniCard from "@/components/want-components/mini-card";
import { resolveWantGroupKind } from "@/components/badgeType/cardKind";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import useWantGroup from "./useWantGroup";

const WantGroupVisual2 = ({
  wantGroup = null,
  itemId = null,
  toAdd = false,
}) => {
  const {
    isCombo,
    elementsThumbnails,
    style,
    name,
    type,
    game_type,
    value,
    onToggle,
    canIwant,
  } = useWantGroup(wantGroup, itemId);
  const { wantChanges } = useContext(PageContext);

  if (!wantGroup) return null;

  return (
    <WantMiniCard
      title={name}
      elements={elementsThumbnails}
      kind={resolveWantGroupKind(wantGroup)}
      badgeType={type}
      badgeSubtype={
        type === "game"
          ? game_type || 1
          : wantGroup?.wants?.[0]?.elements?.[0]?.element?.game?.type || 1
      }
      isCombo={isCombo}
      changed={!toAdd && wantChanges.has(wantGroup.id)}
      value={value}
      tagStyle={type === "tag" ? style : null}
      toAdd={toAdd}
      onAdd={toAdd ? () => onToggle(true) : undefined}
      onRemove={!toAdd && canIwant ? () => onToggle(false) : undefined}
      preview={
        <PreviewerWantGroup
          wantGroup={wantGroup}
          className="w-[18px] h-[18px] rounded-full bg-primary text-white flex items-center justify-center text-[10px]"
        />
      }
    />
  );
};

export default WantGroupVisual2;
