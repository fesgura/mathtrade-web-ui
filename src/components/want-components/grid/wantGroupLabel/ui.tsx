"use client";
import { useContext, useEffect, useMemo } from "react";
import PreviewerWantGroup from "@/components/previewerWantGroup";
import { GridContext } from "@/context/myWants/grid";
import { PageContext } from "@/context/page";
import clsx from "clsx";
import { colorTagStyles } from "@/utils/color";
import ValueMini from "@/components/value/mini";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import TagRowControls from "../tagRowControls";
import TagPendingWants from "../../tag-pending";
import { tagCounter, tagPendingCount } from "../../utils";
import {
  cardKindBorderClass,
  resolveWantGroupKind,
} from "@/components/badgeType/cardKind";

const WantGroupLabelUI = ({ wantGroup = null }) => {
  const { setShowNoOptionsAdv, tagsVisible, setTagsVisible } =
    useContext(GridContext);
  const { wantChanges, setPreviewWantGroup, tooglePreviewWantGroupModal } =
    useContext(PageContext);
  const { id, name, type, tag, wants, value } = wantGroup || {};
  // Unread WGD/WGC on this want: a copy was withdrawn or changed.
  const changes = (id && wantChanges.get(id)) || [];
  const changedText = changes
    .map(({ type: changeType, item_name }) =>
      getI18Ntext(`myWants.changed.${changeType}`, [item_name])
    )
    .join("\n");
  const expanded = type === "tag" && !!tagsVisible?.[id];
  const empty = !(wants?.length);
  // A tag is a want from the moment it's created; an empty one isn't an
  // error ("no options"), it just has nothing wanted yet.
  const emptyTag = type === "tag" && empty;
  const hasPending = tagPendingCount(wantGroup) > 0;
  const kind = wantGroup ? resolveWantGroupKind(wantGroup) : null;

  useEffect(() => {
    if (!wantGroup) return;
    if (empty && !emptyTag) {
      setShowNoOptionsAdv(true);
    }
  }, [wantGroup, wants, setShowNoOptionsAdv, empty, emptyTag]);

  const tagStyle = useMemo(() => {
    return type === "tag" ? colorTagStyles(tag?.color) : null;
  }, [type, tag]);

  if (!wantGroup) return null;

  return (
    <div
      className={clsx(
        "relative h-8 w-64 border-b border-r flex items-center justify-between gap-1 pl-2",
        tagStyle ? "bg-white border-gray-300" : cardKindBorderClass(kind, 4),
        { "shadow-[inset_0_0_0_3px_red]": empty && !emptyTag }
      )}
      style={tagStyle || undefined}
    >
      {changes.length ? (
        // Amber stripe next to the kind border (which keeps its color).
        <span
          className="absolute inset-y-0 left-0 w-1 bg-amber-400 pointer-events-none"
          aria-hidden="true"
        />
      ) : null}
      <div className="flex items-center gap-1 min-w-0">
        {changes.length ? (
          // Tapping it opens the preview, which lists the changes (phones
          // have no tooltip) and marks them seen.
          <button
            type="button"
            className="w-5 h-5 shrink-0 rounded-full bg-amber-400 text-amber-950 text-xs leading-none flex items-center justify-center"
            title={changedText}
            aria-label={`${getI18Ntext("myWants.changed.title")}: ${changedText}`}
            onClick={() => {
              setPreviewWantGroup(wantGroup);
              tooglePreviewWantGroupModal();
            }}
          >
            <Icon type="notifications" />
          </button>
        ) : null}
        {type === "tag" ? (
          // Expand to list the tagged items, like item groups in the columns.
          <button
            type="button"
            className={clsx(
              "w-5 h-6 text-lg leading-none shrink-0 transition-transform",
              { "rotate-90": expanded }
            )}
            onClick={() =>
              setTagsVisible((old: Record<string, boolean>) => ({
                ...old,
                [id]: !old?.[id],
              }))
            }
            aria-expanded={expanded}
          >
            <Icon type="arrow-right" />
          </button>
        ) : null}
        {/* What kind of want this row is: the same game can be wanted as a
            game (any copy), as a specific copy, or through a tag. */}
        {wantGroup._showTypeBadge ? (
          <span
            className="text-[8px] font-bold uppercase tracking-wide rounded px-1 bg-white/80 border border-gray-300 text-gray-600 shrink-0"
            title={getI18Ntext(`grid.wantType.${type}.help`)}
          >
            <I18N id={`grid.wantType.${type}`} />
          </span>
        ) : null}
        <h4 className="cropped_1 text-xs font-bold" title={name}>
          {`${name}${type === "tag" ? ` (${tagCounter(wantGroup)})` : ""}`}
        </h4>
        {type === "tag" ? (
          <TagPendingWants wantGroup={wantGroup} variant="chip" />
        ) : null}
        {emptyTag && !hasPending ? (
          <span
            className="text-[10px] text-gray-600 bg-white/70 rounded px-1 shrink-0"
            title={getI18Ntext("tagRow.empty")}
          >
            <I18N id="tagRow.emptyShort" />
          </span>
        ) : null}
        {type === "tag" ? <TagRowControls wantGroup={wantGroup} /> : null}
      </div>
      <div className="flex items-center gap-1">
        <ValueMini currentValue={value} />
        <div className="w-6">
          <PreviewerWantGroup
            wantGroup={wantGroup}
            className="border-l border-gray-300"
          />
        </div>
      </div>
    </div>
  );
};

export default WantGroupLabelUI;
