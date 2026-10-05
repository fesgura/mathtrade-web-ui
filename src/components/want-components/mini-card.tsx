"use client";
import clsx from "clsx";
import Thumbnail from "@/components/thumbnail";
import BadgeType from "@/components/badgeType";
import ValueMini from "@/components/value/mini";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import {
  cardKindBorderClass,
  type CardKind,
} from "@/components/badgeType/cardKind";
import type { CSSProperties, ReactNode } from "react";

type ThumbnailEl = { thumbnail?: string; name?: string };

type WantMiniCardProps = {
  title: string;
  elements?: ThumbnailEl[];
  kind?: CardKind;
  badgeType?: "game" | "item" | "tag";
  badgeSubtype?: number;
  isCombo?: boolean;
  value?: number | string | null;
  preview?: ReactNode;
  size?: "mini" | "anchor";
  /** Stretch to the parent width (results columns on mobile). */
  fill?: boolean;
  toAdd?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  empty?: boolean;
  tagStyle?: CSSProperties | null;
  className?: string;
};

const WantMiniCard = ({
  title,
  elements = [{ thumbnail: "" }],
  kind = "base",
  badgeType = "game",
  badgeSubtype = 1,
  isCombo = false,
  value = null,
  preview = null,
  size = "mini",
  fill = false,
  toAdd = false,
  onAdd,
  onRemove,
  empty = false,
  tagStyle = null,
  className = "",
}: WantMiniCardProps) => {
  const isAnchor = size === "anchor";

  return (
    <div
      className={clsx(
        "relative rounded-lg border border-gray-200 min-w-0 max-w-full w-full overflow-x-hidden flex flex-col",
        fill
          ? "w-full h-full"
          : isAnchor
            ? "w-full sm:w-52"
            : "w-[8.5rem] sm:w-32",
        tagStyle ? null : cardKindBorderClass(kind, 4),
        {
          "shadow-[inset_0_0_0_3px_red]": empty,
        },
        className
      )}
      style={tagStyle || undefined}
    >
      {empty ? (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white text-center z-raised py-1 px-2 text-[10px] font-semibold">
          <I18N id="noOptionsInWant" />
        </div>
      ) : null}
      {onRemove ? (
        <button
          type="button"
          className="absolute top-1.5 right-1.5 z-raised w-4 h-4 rounded-full bg-danger text-white text-[10px] leading-none flex items-center justify-center"
          title={getI18Ntext("wantview.RemoveItems")}
          onClick={onRemove}
        >
          <Icon />
        </button>
      ) : null}
      <div
        className={clsx(
          "relative overflow-hidden rounded-t-lg",
          isAnchor ? "h-[7.5rem] sm:h-[148px]" : "h-[5.75rem] sm:h-[108px]"
        )}
      >
        <Thumbnail
          fill
          contain
          elements={elements}
          className="h-full rounded-none"
        />
        {toAdd ? (
          <button
            type="button"
            className="absolute inset-0 bg-black/60 text-white text-4xl sm:text-5xl opacity-0 hover:opacity-100 transition-opacity flex flex-col items-center justify-center"
            title={getI18Ntext("btn.Add")}
            onClick={onAdd}
          >
            <Icon type="plus" />
            <span className="uppercase text-[10px] font-bold leading-none mt-1 hidden sm:block">
              <I18N id="btn.Add" />
            </span>
          </button>
        ) : null}
        <div className="absolute left-1.5 right-1.5 bottom-1.5 z-raised flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto">{preview}</div>
          <ValueMini currentValue={value} />
        </div>
      </div>
      <div className="px-2 py-1.5 flex flex-col items-start gap-1 min-w-0 flex-1">
        <h4
          className="text-[11px] leading-[14px] font-bold line-clamp-3 sm:line-clamp-2 cursor-default w-full break-words"
          title={title}
        >
          {title}
        </h4>
        <BadgeType
          size="compact"
          type={badgeType}
          subtype={badgeSubtype}
          isCombo={isCombo}
          className="max-w-full mt-auto"
        />
      </div>
    </div>
  );
};

export default WantMiniCard;

type WantAddTileProps = {
  open?: boolean;
  onToggle?: () => void;
  size?: "mini" | "anchor";
  caption?: string;
  className?: string;
};

export const WantAddTile = ({
  open = false,
  onToggle,
  size = "mini",
  caption = "",
  className = "",
}: WantAddTileProps) => {
  const isAnchor = size === "anchor";

  return (
    <button
      type="button"
      className={clsx(
        "relative rounded-lg border-[1.5px] border-dashed transition-colors flex flex-col items-center justify-center gap-2 px-2 sm:px-3 py-4 text-center",
        isAnchor
          ? "w-full min-w-0 sm:w-52 sm:shrink-0 min-h-[10.25rem] sm:min-h-[12.5rem]"
          : "w-[8.5rem] sm:w-32 shrink-0 min-h-[10.5rem] sm:min-h-[12rem]",
        open
          ? "border-want bg-want text-white"
          : "border-want/40 bg-want/5 text-want hover:bg-want/15",
        className
      )}
      onClick={onToggle}
    >
      <span
        className={clsx(
          "leading-none opacity-70 transition-transform",
          isAnchor ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl",
          { "rotate-45": open }
        )}
      >
        <Icon type="plus" />
      </span>
      {caption ? (
        <span className="text-[11px] sm:text-caption leading-snug font-medium break-words text-balance">
          <I18N id={caption} />
        </span>
      ) : (
        <span className="hidden sm:block text-caption font-bold">
          <I18N id="btn.Add" />
        </span>
      )}
    </button>
  );
};
