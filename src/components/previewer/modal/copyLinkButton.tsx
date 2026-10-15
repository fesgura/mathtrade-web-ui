"use client";
import { useEffect, useRef, useState } from "react";
import copy from "copy-text-to-clipboard";
import Icon from "@/components/icon";
import I18N from "@/i18n";
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

// Admin-only "Copiar link" for the item preview modal: copies the item's
// permalink. Feedback is inline (the toast layer sits under modals). If no
// clipboard works, the link is shown selected so it can be copied by hand.
const CopyLinkButton = ({ id = null }: { id?: number | string | null }) => {
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

  if (!isAdmin || !id) return null;

  const link = itemPermalink(id);

  return (
    <div className="flex flex-wrap items-center gap-2 -mt-3 mb-3 pr-8 min-w-0">
      <button
        type="button"
        className="inline-flex items-center gap-1.5 min-h-[36px] rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors px-4 text-sm font-semibold"
        onClick={async () => {
          setState((await copyText(link)) ? "copied" : "manual");
        }}
      >
        <Icon type={state === "copied" ? "check" : "copy"} />
        <span aria-live="polite">
          <I18N id={state === "copied" ? "itemLink.copied" : "itemLink.copy"} />
        </span>
      </button>
      {state === "manual" ? (
        <label className="flex items-center gap-2 grow min-w-0 text-sm text-gray-600">
          <span className="whitespace-nowrap">
            <I18N id="itemLink.manual" />
          </span>
          <input
            ref={inputRef}
            readOnly
            value={link}
            onFocus={(e) => e.currentTarget.select()}
            className="grow min-w-0 border border-stroke rounded-md px-2 py-1 text-sm"
          />
        </label>
      ) : null}
    </div>
  );
};

export default CopyLinkButton;
