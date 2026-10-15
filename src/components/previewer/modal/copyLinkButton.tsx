"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import clsx from "clsx";
import copy from "copy-text-to-clipboard";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import { useStore } from "@/store";
import { itemPermalink } from "./useItemFromUrl";

const copyText = async (text: string) => {
  try {
    if (window.isSecureContext && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Permission denied or not focused: try the execCommand fallback.
  }
  return copy(text);
};

type CopyLinkButtonProps = {
  // Item id: copies its permalink, unless `link` is given.
  id?: number | string | null;
  link?: string | null;
  // "modal": labelled pill (modal headers). "compact": round icon button for
  // card headers, next to the favorite/ignore buttons.
  variant?: "modal" | "compact";
  // Idle label/tooltip (e.g. what a game link opens); default "Copiar link".
  labelIdleId?: string;
  className?: string;
};

// Admin-only "Copiar link": copies an item permalink (or `link`, e.g. a
// report or game permalink). Feedback is inline (the toast layer sits under
// modals). If no clipboard works, the link is shown selected so it can be
// copied by hand. The click never reaches the card (cards toggle on click).
const CopyLinkButton = ({
  id = null,
  link = null,
  variant = "modal",
  labelIdleId = "itemLink.copy",
  className = "",
}: CopyLinkButtonProps) => {
  const isAdmin = useStore((state) => !!state.data.user?.math_admin);
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state !== "copied") return undefined;
    const timer = setTimeout(() => setState("idle"), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  useEffect(() => {
    if (state === "manual") inputRef.current?.select();
  }, [state]);

  if (!isAdmin || (!id && !link)) return null;

  const url = link || itemPermalink(id as number | string);
  const labelId = state === "copied" ? "itemLink.copied" : labelIdleId;

  const onClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setState((await copyText(url)) ? "copied" : "manual");
  };

  const manual =
    state === "manual" ? (
      <label
        className="flex items-center gap-2 grow min-w-0 text-sm text-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="whitespace-nowrap">
          <I18N id="itemLink.manual" />
        </span>
        <input
          ref={inputRef}
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
          className="grow min-w-0 border border-stroke rounded-md px-2 py-1 text-sm"
        />
      </label>
    ) : null;

  if (variant === "compact") {
    return (
      <div className={clsx("relative h-7 pointer-events-auto", className)}>
        <div data-tooltip={getI18Ntext(labelId)}>
          <button
            type="button"
            aria-label={getI18Ntext(labelId)}
            className="h-7 w-7 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={onClick}
          >
            <Icon type={state === "copied" ? "check" : "copy"} className="text-[15px]" />
          </button>
        </div>
        {manual ? (
          <div className="absolute right-0 top-full z-20 mt-1 w-72 max-w-[80vw] rounded-md border border-stroke bg-white p-2 shadow-md">
            {manual}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex flex-wrap items-center gap-2 min-w-0",
        className || "-mt-3 mb-3 pr-8"
      )}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1.5 min-h-[36px] rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-4 text-sm font-semibold"
        onClick={onClick}
      >
        <Icon type={state === "copied" ? "check" : "copy"} />
        <span aria-live="polite">
          <I18N id={labelId} />
        </span>
      </button>
      {manual}
    </div>
  );
};

export default CopyLinkButton;
