import Chip from "@/components/chip";
import {
  boxStatusTypes,
  componentsStatusTypes,
  INVALID_STATUS_KEY,
  statusTone,
} from "@/config/statusTypes";
import type { StatusTone } from "@/config/statusTypes";
import { getI18Ntext } from "@/i18n";

type StatusTypeMap = Record<string, { min?: string } | undefined>;

// Chip's tooltip is plain text on `data-tooltip` (DataTooltipRoot portal) —
// it can never render HTML, unlike <I18N>'s dangerouslySetInnerHTML. Some
// status descriptions carry <b> markup meant for <I18N> usage elsewhere
// (e.g. the item editor), so strip tags here rather than showing them as
// literal text (MAT-121).
const stripHtml = (text: string) => text.replace(/<[^>]*>/g, "");

// The dot in front of each value carries the condition color (same scale as
// the tones of StatusBadge) while the chip itself stays neutral, so the chip
// keeps one background even when box and components differ.
const DOT_CLASS: Record<StatusTone, string> = {
  good: "bg-green-600",
  used: "bg-orange-500",
  none: "bg-gray-400",
  alert: "bg-red-600",
  neutral: "bg-gray-300",
};

const shortValue = (types: StatusTypeMap, status: string) =>
  types[status]?.min || types[INVALID_STATUS_KEY]?.min || "";

type StatusChipProps = {
  boxStatus?: string;
  componentStatus?: string;
  className?: string;
};

// Box + components condition in a single chip. As two separate chips they
// shared a wrapping row with language, dependency and box size, which broke
// into three ragged lines and left sibling cards at different heights.
const StatusChip = ({
  boxStatus,
  componentStatus,
  className,
}: StatusChipProps) => {
  const parts: { text: string; tone: StatusTone }[] = [];
  const tooltips: string[] = [];

  if (boxStatus) {
    parts.push({
      text: `${getI18Ntext("status.label.box")} ${shortValue(
        boxStatusTypes as StatusTypeMap,
        boxStatus
      )}`,
      tone: statusTone(boxStatus),
    });
    tooltips.push(
      `${getI18Ntext("status.label.box")}: ${stripHtml(
        getI18Ntext(`statusType.box.desc.${boxStatus}`)
      )}`
    );
  }

  if (componentStatus) {
    parts.push({
      text: `${getI18Ntext("status.label.components.min")} ${shortValue(
        componentsStatusTypes as StatusTypeMap,
        componentStatus
      )}`,
      tone: statusTone(componentStatus),
    });
    tooltips.push(
      `${getI18Ntext("status.label.components")}: ${stripHtml(
        getI18Ntext(`statusType.components.desc.${componentStatus}`)
      )}`
    );
  }

  if (!parts.length) {
    return null;
  }

  // "Revisar" keeps the copy out of the offer listings, so it should not appear
  // on a card in practice — but if it ever does, it reads as a pending task
  // here too instead of blending in with language and box size.
  const needsReview =
    boxStatus === INVALID_STATUS_KEY || componentStatus === INVALID_STATUS_KEY;

  return (
    <Chip
      tone={needsReview ? "alert" : "neutral"}
      tooltip={tooltips.join(" — ")}
      className={className}
    >
      {parts.map(({ text, tone }, index) => (
        <span key={text}>
          {index ? <span className="mx-1.5 text-gray-400">·</span> : null}
          <span
            aria-hidden
            className={`inline-block w-2 h-2 rounded-full mr-1 align-middle ${DOT_CLASS[tone]}`}
          />
          {text}
        </span>
      ))}
    </Chip>
  );
};

export default StatusChip;
