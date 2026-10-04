"use client";
import { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
} from "@floating-ui/react";
import I18N from "@/i18n";
import { Z } from "@/config/zIndex";

/**
 * Offer-card note on an element. CSS data-tooltip clipped off the left edge
 * on mobile and looked like plain underlined text; this is a tappable control
 * with a viewport-aware popover.
 */
const DescriptionNote = ({
  comment,
  isCombo = false,
}: {
  comment: string;
  isCombo?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    strategy: "fixed",
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "top-start",
    middleware: [offset(8), flip(), shift({ padding: 12 })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  return (
    <>
      <button
        type="button"
        ref={refs.setReference}
        {...getReferenceProps()}
        className="inline-flex items-center text-primary font-bold text-[10px] leading-none underline underline-offset-2"
      >
        <I18N
          id={`item.xs.element.description${isCombo ? ".min" : ""}`}
        />
      </button>
      {isOpen ? (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: Z.popover }}
            {...getFloatingProps()}
            className="max-w-[min(280px,calc(100vw-24px))] rounded-md bg-gray-900 text-white text-xs leading-snug px-2.5 py-2 shadow-lg"
          >
            {comment}
          </div>
        </FloatingPortal>
      ) : null}
    </>
  );
};

export default DescriptionNote;
