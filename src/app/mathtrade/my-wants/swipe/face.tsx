"use client";
import clsx from "clsx";
import Thumbnail from "@/components/thumbnail";
import BadgeType from "@/components/badgeType";
import ValueMini from "@/components/value/mini";
import { cardKindBorderClass } from "@/components/badgeType/cardKind";
import type { Face } from "./model";

const SwipeFace = ({
  face,
  size = "deck",
  fill = false,
}: {
  face: Face;
  size?: "deck" | "mini";
  fill?: boolean;
}) => {
  const deck = size === "deck";
  return (
    <div
      className={clsx(
        "relative rounded-2xl border border-gray-200 overflow-hidden flex flex-col min-w-0 w-full bg-white",
        fill && "max-lg:flex-1 max-lg:min-h-0",
        face.tagStyle ? null : cardKindBorderClass(face.kind, 4),
        face.empty && "shadow-[inset_0_0_0_3px_red]",
        face.changed && "ring-2 ring-amber-400"
      )}
      style={face.tagStyle || undefined}
    >
      <div
        className={clsx(
          "relative overflow-hidden",
          deck
            ? "h-[26dvh] min-h-[7.5rem] max-h-72 sm:h-64"
            : "h-28 sm:h-32",
          fill && deck && "max-lg:h-auto max-lg:max-h-none max-lg:min-h-0 max-lg:flex-1"
        )}
      >
        <Thumbnail
          fill
          contain
          elements={[{ thumbnail: face.thumbnail, name: face.title }]}
          className="h-full rounded-none"
        />
        <div className="absolute left-1.5 right-1.5 bottom-1.5 z-raised flex justify-end pointer-events-none">
          <ValueMini currentValue={face.value} />
        </div>
      </div>
      <div className={clsx("px-3 py-2 flex flex-col gap-1 min-w-0", deck ? "py-3" : "py-2")}>
        <h3
          className={clsx(
            "font-bold leading-snug break-words",
            deck ? "text-base sm:text-lg line-clamp-3" : "text-[11px] leading-[14px] line-clamp-3"
          )}
          title={face.title}
        >
          {face.title}
        </h3>
        <BadgeType
          size="compact"
          type={face.badgeType}
          subtype={face.badgeSubtype}
          isCombo={face.isCombo}
          className="max-w-full"
        />
      </div>
    </div>
  );
};

export default SwipeFace;
