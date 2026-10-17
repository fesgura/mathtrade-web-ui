"use client";
import { useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import { colorTagStyles } from "@/utils/color";
import WantMiniCard from "@/components/want-components/mini-card";
import { resolveWantGroupKind } from "@/components/badgeType/cardKind";
import TagPendingWants from "@/components/want-components/tag-pending";
import { tagCounter } from "@/components/want-components/utils";

const WantGroupUI = ({ wantGroup = null }) => {
  const { name, type, game_type, tag, wants, bgg_id, value, availables } =
    wantGroup || {};

  const { wantChanges } = useContext(PageContext);
  const isCombo = type === "item" && wants?.[0]?.elements?.length > 1;
  const kind = wantGroup ? resolveWantGroupKind(wantGroup) : null;
  const badgeSubtype =
    type === "game"
      ? game_type || 1
      : wants?.[0]?.elements?.[0]?.element?.game?.type || 1;

  const elementsThumbnails = useMemo(() => {
    let game_thumbnail = null;
    const items = (wants || []).concat(availables || []);

    if (type === "item" || type === "tag") {
      game_thumbnail = items?.[0]?.elements?.[0]?.element?.thumbnail;
      return [{ thumbnail: game_thumbnail || "" }];
    }

    const games = items
      ?.reduce((arr, item) => {
        return arr.concat(item.elements);
      }, [])
      ?.map(({ element }) => element.game);

    if (bgg_id) {
      game_thumbnail = games?.filter(({ bgg_id: bggId }) => {
        return `${bggId}` === `${bgg_id}`;
      })?.[0]?.thumbnail;
    } else {
      game_thumbnail = games?.[0]?.thumbnail;
    }

    return [{ thumbnail: game_thumbnail || "" }];
  }, [type, wants, availables, bgg_id]);

  const tagStyle = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  if (!wantGroup) return null;

  return (
    <>
      <WantMiniCard
        size="anchor"
        title={`${name}${type === "tag" ? ` (${tagCounter(wantGroup)})` : ""}`}
        elements={elementsThumbnails}
        kind={kind}
        badgeType={type}
        badgeSubtype={badgeSubtype}
        isCombo={isCombo}
        value={value}
        // An empty tag isn't an error (nothing wanted yet): the notice below
        // explains it and offers to want its games.
        empty={!wants?.length && type !== "tag"}
        changed={wantChanges.has(wantGroup.id)}
        tagStyle={tagStyle}
        preview={
          <PreviewerWantGroup
            wantGroup={wantGroup}
            className="w-[18px] h-[18px] rounded-full bg-primary text-white flex items-center justify-center text-[10px]"
          />
        }
      />
      {type === "tag" ? <TagPendingWants wantGroup={wantGroup} /> : null}
    </>
  );
};

export default WantGroupUI;
