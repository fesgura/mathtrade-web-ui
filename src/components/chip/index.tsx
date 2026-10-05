import clsx from "clsx";
import type { ReactNode } from "react";

const TONES: Record<string, string> = {
  // White-ish fill + near-black text: these chips sit on the card-kind tints
  // (#d2d2d4 and neighbours), where gray-on-gray (text-gray-500 / colorMain)
  // disappeared. White still reads as a pill on white wrappers.
  neutral: "text-gray-800 bg-white/85",
  // For a value that asks the user to do something rather than describing the
  // copy. Tinted instead of solid: these chips sit inside cards that already
  // carry a background tint of their own, and a solid fill at this size ends up
  // competing with the card's title.
  alert: "text-red-800 font-bold bg-danger/10",
  want: "text-[#0a7a4d] font-bold bg-want/10",
  done: "text-gray-800 font-bold bg-gray-200",
  // Same hue as the "en disputa" status badge: purple is reserved for team
  // intervention. Tinted, not solid — this marks a role, not an irreversible
  // state. Contrast is tuned for the dark sidebar surface.
  admin: "text-purple-300 bg-purple-600/20",
};

const Chip = ({
  children = null,
  tooltip = "",
  className = "",
  tone = "neutral",
  placement = "",
}: {
  children?: ReactNode;
  tooltip?: string;
  className?: string;
  tone?: keyof typeof TONES;
  placement?: "top" | "bottom" | "left" | "right" | "";
}) => {
  // Tooltip attribute lives on this wrapper, not on the truncated pill.
  // Tailwind `truncate` is overflow:hidden — keeping data-tooltip off that
  // node avoids clipping the trigger; the bubble itself is portaled.
  return (
    <div
      className={clsx(
        "inline-flex max-w-full min-w-0",
        tooltip ? "cursor-help" : null
      )}
      data-tooltip={tooltip || undefined}
      data-placement={placement || undefined}
    >
      <span
        className={clsx(
          "text-caption px-2.5 py-1 rounded-md text-nowrap truncate max-w-full",
          TONES[tone] || TONES.neutral,
          className
        )}
      >
        {children}
      </span>
    </div>
  );
};

export default Chip;
