"use client";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Icon from "@/components/icon";
import I18N from "@/i18n";

export type ToastOptions = {
  text: string;
  actionLabel?: string;
  onAction?: () => void;
  // Auto-hide delay; paused while the pointer or focus is on the toast.
  ms?: number;
};

export type ToastContextValue = {
  show: (options: ToastOptions) => void;
  hide: () => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);

type Toast = ToastOptions & { id: number; ms: number };

const DEFAULT_MS = 8000;

// One toast at a time: a new show() replaces the current one. Dark,
// bottom-centred, above the mobile TabBar (same placement as the bulk
// SelectionBar, which is never visible at the same time).
const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [paused, setPaused] = useState(false);
  const nextId = useRef(1);

  const show = useCallback((options: ToastOptions) => {
    setPaused(false);
    setToast({ ...options, ms: options.ms ?? DEFAULT_MS, id: nextId.current++ });
  }, []);

  const hide = useCallback(() => setToast(null), []);

  useEffect(() => {
    if (!toast || paused) return;
    const timer = setTimeout(() => setToast(null), toast.ms);
    return () => clearTimeout(timer);
  }, [toast, paused]);

  const value = useMemo(() => ({ show, hide }), [show, hide]);

  const onAction = () => {
    const action = toast?.onAction;
    setToast(null);
    action?.();
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* The live region stays mounted so screen readers announce new text. */}
      <div
        role="status"
        aria-live="polite"
        className="fixed z-nav left-4 right-4 bottom-[calc(var(--mt-tabbar-h)+0.75rem)] lg:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-max sm:max-w-[calc(100vw-2rem)] pointer-events-none"
        data-html2canvas-ignore=""
      >
        {toast ? (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center gap-2 rounded-2xl bg-gray-900 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] p-2 pl-4 motion-safe:animate-fadeup"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <span className="grow sm:grow-0 sm:pr-2 text-sm font-semibold">
              {toast.text}
            </span>
            {toast.actionLabel && toast.onAction ? (
              <button
                type="button"
                className="min-h-[44px] px-4 rounded-full text-sm font-semibold text-primary bg-white/10 hover:bg-white/20 transition-colors whitespace-nowrap"
                onClick={onAction}
              >
                {toast.actionLabel}
              </button>
            ) : null}
            <button
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              onClick={hide}
            >
              <Icon type="close" className="text-[13px]" />
              <span className="sr-only">
                <I18N id="toast.close" />
              </span>
            </button>
          </div>
        ) : null}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
