"use client";
import { useCallback, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FloatingPortal } from "@floating-ui/react";
import { GOOGLE_RECAPTCHA_CLIENT_KEY } from "@/config";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import Modal from "@/components/modal";
import { fadeLabelClass } from "@/components/sidebar/fadeLabel";
import { captureScreenshot } from "@/utils/screenshot";
import { getConsoleBuffer } from "@/utils/consoleBuffer";
import { formatNetworkBuffer } from "@/utils/networkBuffer";
import BugReportForm from "./form";

type BugReportButtonProps = {
  // "row" mirrors HelpButton's sidebar/more-sheet row layout — this
  // component has no "header" variant since it opens a Modal, not a
  // hover panel, so there is nothing to render inline in the header bar.
  variant?: "row";
  // "dark" for the black sidebar, "light" for the white mobile sheet.
  tone?: "dark" | "light";
  collapsed?: boolean;
  // Same as HelpButton: close the mobile more-sheet before capture so
  // the screenshot is of the page underneath, not the sheet overlay.
  onAction?: () => void;
};

const BugReportButtonInner = ({
  tone = "dark",
  collapsed = false,
  onAction,
}: BugReportButtonProps = {}) => {
  const [open, setOpen] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [consoleLog, setConsoleLog] = useState("");
  const [networkLog, setNetworkLog] = useState("");

  const toggleOpen = useCallback(() => {
    setOpen((v) => !v);
  }, []);

  // html2canvas runs on the main thread and can take seconds on slow
  // phones; without feedback the tap looks like a freeze. `capturing`
  // drives a portaled "Preparando captura…" overlay; the ref blocks
  // repeated taps before React re-renders the disabled button.
  const [capturing, setCapturing] = useState(false);
  const busyRef = useRef(false);

  const openWithCapture = useCallback(async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    // Close chrome overlays first, then capture — preview === payload.
    onAction?.();
    setCapturing(true);
    // Let the browser paint the overlay before html2canvas blocks the
    // thread (rAF fires before paint; the timeout lands after it).
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => setTimeout(resolve, 0));
    });
    let shot: string | null = null;
    try {
      shot = await captureScreenshot();
    } catch {
      // A failed capture must not block the report: open without image.
      shot = null;
    }
    setScreenshot(shot);
    setConsoleLog(getConsoleBuffer().join("\n"));
    setNetworkLog(formatNetworkBuffer());
    setCapturing(false);
    busyRef.current = false;
    setOpen(true);
  }, [onAction]);

  return (
    <div className="relative">
      <button
        className={clsx(
          "flex items-center w-full cursor-pointer peer text-sm py-2 rounded-lg",
          collapsed ? "justify-center px-0" : "text-left px-2",
          tone === "light"
            ? "text-gray-900 hover:bg-gray-50"
            : "text-white/80 hover:text-white hover:bg-white/5"
        )}
        onClick={openWithCapture}
        disabled={capturing}
        aria-busy={capturing}
      >
        <Icon type="report" className="text-lg shrink-0" />
        <span className={fadeLabelClass(!collapsed)}>
          <I18N id="bugReport.menu" />
        </span>
      </button>

      {/* Portaled for the same reason as the modal below: on mobile the
          trigger sits in the closing "Más" sheet. Ignored by html2canvas
          (the /sign fallback captures body, where the portal lives). */}
      {capturing ? (
        <FloatingPortal>
          <div
            data-html2canvas-ignore
            role="status"
            aria-live="polite"
            className="fixed inset-0 z-modal flex items-center justify-center bg-black/20"
          >
            <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-gray-900 shadow-lg">
              <Icon type="loading" className="animate-spin" />
              <I18N id="bugReport.capturing" />
            </div>
          </div>
        </FloatingPortal>
      ) : null}

      {/* Portaled to body: components/modal renders in place, and on mobile
          this button lives in the "Más" sheet, which onAction closes before
          the modal opens. The closed sheet is inert/invisible/opacity-0, and
          those inherit into the fixed dialog, leaving an invisible modal
          whose body{overflow:hidden} still freezes the page. */}
      {open ? (
        <FloatingPortal>
          <Modal isOpen={open} onClose={toggleOpen} size="md">
            <BugReportForm
              toggleEditingMode={toggleOpen}
              screenshot={screenshot}
              consoleLog={consoleLog}
              networkLog={networkLog}
            />
          </Modal>
        </FloatingPortal>
      ) : null}
    </div>
  );
};

const BugReportButton = (props: BugReportButtonProps = {}) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={GOOGLE_RECAPTCHA_CLIENT_KEY}
    language="es"
  >
    <BugReportButtonInner {...props} />
  </GoogleReCaptchaProvider>
);

export default BugReportButton;
