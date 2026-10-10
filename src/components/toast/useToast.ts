import { useContext } from "react";
import { ToastContext, type ToastContextValue } from "./ToastProvider";

const noop = () => {};
const OUTSIDE: ToastContextValue = { show: noop, hide: noop };

// show({ text, actionLabel?, onAction?, ms = 8000 }) / hide(). Outside a
// ToastProvider (public pages) both are no-ops.
const useToast = (): ToastContextValue => useContext(ToastContext) || OUTSIDE;

export default useToast;
