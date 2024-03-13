import clsx from "clsx";
import Icon from "../icon";

const Modal = ({ isOpen, onClose, children, className, size = "lg" }) => {
  return isOpen ? (
    <>
      <style>{"body{overflow:hidden !important}"}</style>
      <dialog className="fixed z-[99999] w-screen h-screen block overflow-x-hidden overflow-y-auto text-inherit font-[inherit] leading-[inherit] bg-transparent m-0 p-0 border-0 left-0 top-0">
        <div className="w-full min-h-full flex flex-col justify-center relative sm:p-2.5">
          <div
            className="absolute w-full h-full backdrop-blur-sm bg-[rgba(213,220,226,0.7)] left-0 top-0 sm:block hidden animate-dialog-in"
            onClick={onClose}
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
            <button
              className="absolute w-10 h-10 leading-10 text-center text-[gray] transition-[color] duration-[0.1s] text-xl right-0 top-0"
              onClick={onClose}
            >
              <Icon />
            </button>
            <div className="py-7 px-5 w-full">{children}</div>
          </article>
        </div>
      </dialog>
    </>
  ) : null;
};
export default Modal;
