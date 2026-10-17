"use client";
import clsx from "clsx";
import { createPortal } from "react-dom";
import Icon from "../icon";

const Modal = ({
  isOpen = false,
  onClose = () => {},
  children = null,
  className = "py-7 px-5 w-full",
  size = "lg",
  canNotClose = false,
}) => {
  if (!isOpen) return null;

  const modal = (
    <>
      {/* Below lg the page scrolls in the [data-bug-report-capture] column
          (app/mathtrade/layout.tsx), not the body, so lock that too. */}
      <style>{`body{overflow:hidden !important}@media not all and (min-width:1024px){[data-bug-report-capture]{overflow:hidden !important}}`}</style>
      <dialog className="fixed z-modal w-screen h-dvh block overflow-x-hidden overflow-y-auto overscroll-contain text-inherit font-[inherit] leading-[inherit] bg-transparent m-0 p-0 border-0 left-0 top-0">
        <div className="w-full min-h-full flex flex-col justify-center relative sm:p-2.5">
          <div
            className="absolute w-full h-full backdrop-blur-sm bg-[rgba(213,220,226,0.7)] left-0 top-0 sm:block hidden animate-dialog-in"
            onClick={canNotClose ? undefined : onClose}
          />
          <article
            className={clsx(
              "bg-white w-full sm:min-h-0 min-h-dvh relative mx-auto my-0 sm:rounded-2xl shadow-lg sm:block flex flex-col items-center pb-[env(safe-area-inset-bottom)] animate-dialog-in-article",
              {
                "sm:max-w-sm": size === "sm",
                "sm:max-w-7xl": size === "lg",
                "sm:max-w-2xl": size === "md",
                "sm:max-w-4xl": size === "md2",
              }
            )}
          >
            {canNotClose ? null : (
              <button
                type="button"
                className="absolute z-raised top-2 right-2 w-8 h-8 leading-none text-center bg-white/60 text-[gray] rounded-full transition-[color] duration-[0.1s] text-xl"
                onClick={onClose}
              >
                <Icon />
              </button>
            )}
            <div className={className}>{children}</div>
          </article>
        </div>
      </dialog>
    </>
  );

  // Rendered in <body>: inline, a parent that creates a stacking context
  // (sticky/relative + z-index) trapped the modal and its blur under other
  // cards. Same React tree, so context and events still work.
  return typeof document === "undefined"
    ? modal
    : createPortal(modal, document.body);
};
export default Modal;
