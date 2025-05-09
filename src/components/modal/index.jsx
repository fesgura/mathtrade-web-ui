import clsx from "clsx";
import Icon from "../icon";

const Modal = ({
  isOpen,
  onClose,
  children,
  className = "py-7 px-5 w-full",
  size = "lg",
  canNotClose,
}) => {
  return isOpen ? (
    <>
      <style>{"body{overflow:hidden !important}"}</style>
      <dialog className="fixed z-[99999] w-screen h-screen block overflow-x-hidden overflow-y-auto text-inherit font-[inherit] leading-[inherit] bg-transparent m-0 p-0 border-0 left-0 top-0">
        <div className="w-full min-h-full flex flex-col justify-center relative sm:p-2.5">
          <div
            className="absolute w-full h-full backdrop-blur-sm bg-[rgba(213,220,226,0.7)] left-0 top-0 sm:block hidden animate-dialog-in"
            onClick={canNotClose ? null : onClose}
          />
          <article
            className={clsx(
              "bg-white w-full sm:min-h-0 min-h-[100vh] relative mx-auto my-0 sm:rounded-2xl shadow-lg sm:block flex flex-column items-center animate-dialog-in-article",
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
                className="absolute z-50 top-2 right-2 w-8 h-8 leading-none text-center bg-white/60 text-[gray] rounded-full transition-[color] duration-[0.1s] text-xl"
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
  ) : null;
};
export default Modal;
