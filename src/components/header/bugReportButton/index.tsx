"use client";
import { useCallback, useState } from "react";
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

  const openWithCapture = useCallback(async () => {
    // Close chrome overlays first, then capture — preview === payload.
    onAction?.();
    const shot = await captureScreenshot();
    setScreenshot(shot);
    setConsoleLog(getConsoleBuffer().join("\n"));
    setNetworkLog(formatNetworkBuffer());
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
      >
        <Icon type="report" className="text-lg shrink-0" />
        <span className={fadeLabelClass(!collapsed)}>
          <I18N id="bugReport.menu" />
        </span>
      </button>

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
