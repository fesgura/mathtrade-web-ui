"use client";
import { useCallback, useEffect, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
} from "@floating-ui/react";
import { Z } from "@/config/zIndex";

type Placement = "top" | "bottom" | "left" | "right";

type TipState = {
  text: string;
  placement: Placement;
  reference: HTMLElement;
};

const PLACEMENTS = new Set<Placement>(["top", "bottom", "left", "right"]);

const triggerFrom = (target: EventTarget | null): HTMLElement | null => {
  if (!(target instanceof Element)) return null;
  const el = target.closest("[data-tooltip]");
  return el instanceof HTMLElement ? el : null;
};

const readTip = (el: HTMLElement): TipState | null => {
  const text = el.getAttribute("data-tooltip");
  if (!text) return null;
  const raw = el.getAttribute("data-placement") || "top";
  const placement = PLACEMENTS.has(raw as Placement)
    ? (raw as Placement)
    : "top";
  return { text, placement, reference: el };
};

/**
 * Renders every `data-tooltip` bubble in a fixed FloatingPortal.
 * CSS ::before/::after tooltips clip inside cardSurfaceClass
 * (overflow-x-hidden); portaling keeps the same attribute API without
 * that clipping.
 */
const Bubble = ({ tip }: { tip: TipState }) => {
  const { refs, floatingStyles } = useFloating({
    strategy: "fixed",
    placement: tip.placement,
    middleware: [offset(8), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
    elements: { reference: tip.reference },
  });

  return (
    <FloatingPortal>
      <div
        ref={refs.setFloating}
        style={{ ...floatingStyles, zIndex: Z.tooltip }}
        role="tooltip"
        className="pointer-events-none max-w-[min(260px,calc(100vw-24px))] rounded-md bg-[#222] px-2.5 py-1.5 text-left text-xs font-medium leading-snug text-white shadow-lg"
      >
        {tip.text}
      </div>
    </FloatingPortal>
  );
};

const DataTooltipRoot = () => {
  const [tip, setTip] = useState<TipState | null>(null);

  const hide = useCallback(() => setTip(null), []);

  useEffect(() => {
    const showFrom = (target: EventTarget | null) => {
      const el = triggerFrom(target);
      if (!el) return;
      const next = readTip(el);
      if (!next) return;
      setTip((prev) =>
        prev &&
        prev.reference === next.reference &&
        prev.text === next.text &&
        prev.placement === next.placement
          ? prev
          : next
      );
    };

    const onPointerOver = (e: PointerEvent) => showFrom(e.target);

    const onPointerOut = (e: PointerEvent) => {
      const from = triggerFrom(e.target);
      const to = triggerFrom(e.relatedTarget);
      if (from && from !== to) {
        setTip((prev) => (prev?.reference === from ? null : prev));
      }
    };

    const onFocusIn = (e: FocusEvent) => showFrom(e.target);

    const onFocusOut = (e: FocusEvent) => {
      const from = triggerFrom(e.target);
      const to = triggerFrom(e.relatedTarget);
      if (from && from !== to) {
        setTip((prev) => (prev?.reference === from ? null : prev));
      }
    };

    // Capture scroll on any scroller so the bubble does not linger mid-page.
    const onScroll = () => hide();

    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [hide]);

  return tip ? <Bubble tip={tip} /> : null;
};

export default DataTooltipRoot;
