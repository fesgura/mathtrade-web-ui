"use client";
import { useContext } from "react";
import Icon from "@/components/icon";
import I18N from "@/i18n";
import clsx from "clsx";
import { PageContext } from "@/context/page";
import TimelineButton from "@/components/header/timeline";
import NotificationsButton from "@/components/header/notifications";
import HelpButton from "@/components/header/helpButton";
import BugReportButton from "@/components/header/bugReportButton";
import AccountMenuButton from "@/components/header/account";
import type { NavEntry } from "@/config/nav";
import type { LockedInfo } from "../useSidebarNav";
import NavItem from "../NavItem";

type MoreSheetProps = {
  open: boolean;
  onClose: () => void;
  restItems: NavEntry[];
  isActive: (path: string) => boolean;
  lockedInfo?: Record<string, LockedInfo>;
};

// Sit above the tab bar so primary tabs stay tappable. No transform: the
// calendar/help/account panels use position:fixed and a transform here
// would trap and clip them inside the sheet.
const aboveTabBar = "bottom-[var(--mt-tabbar-h)]";

const MoreSheet = ({
  open,
  onClose,
  restItems,
  isActive,
  lockedInfo = {},
}: MoreSheetProps) => {
  const { mathtrade } = useContext(PageContext);
  const hasMathtrade = Boolean(mathtrade && Object.keys(mathtrade).length > 0);

  return (
    <div
      id="mobile-more-sheet"
      data-html2canvas-ignore=""
      className={clsx(
        "lg:hidden fixed inset-x-0 top-0 z-panel",
        aboveTabBar,
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        onClick={onClose}
        className={clsx(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        role="dialog"
        aria-modal={open}
        aria-labelledby="mobile-more-sheet-title"
        className={clsx(
          "absolute left-0 right-0 bottom-0 h-auto max-h-[min(85dvh,calc(100dvh-var(--mt-tabbar-h)))] overflow-y-auto bg-white rounded-t-2xl pb-3 shadow-[0_-8px_32px_rgba(0,0,0,0.3)] transition-[opacity,visibility]",
          open ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="w-9 h-1 rounded-full bg-gray-300 mx-auto mt-3 mb-1" />
        <div
          id="mobile-more-sheet-title"
          className="text-xs font-bold text-gray-400 uppercase tracking-wide px-4 pt-2 pb-1"
        >
          <I18N id="menu.More" />
        </div>

        {restItems.map((entry) => {
          const active = isActive(entry.path);
          const locked = lockedInfo[entry.key];
          return (
            <NavItem
              key={entry.key}
              href={entry.path}
              locked={Boolean(locked)}
              onClick={onClose}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 text-[15px] font-medium",
                locked ? "text-gray-400" : active ? "text-primary" : "text-gray-900"
              )}
            >
              <Icon type={entry.icon} className="text-lg" />
              <span className="flex-1">
                <I18N id={entry.titleI18nKey} />
                {locked ? (
                  <span className="block text-[11px] leading-snug font-normal">
                    <I18N id={locked.captionId} values={[locked.daysLeft]} />
                  </span>
                ) : null}
              </span>
              {locked ? <Icon type="lock" className="text-sm opacity-80" /> : null}
            </NavItem>
          );
        })}

        <div className="h-px bg-gray-100 my-1 mx-4" />

        {hasMathtrade ? (
          <SheetRow>
            <TimelineButton variant="row" tone="light" />
          </SheetRow>
        ) : null}
        <SheetRow>
          <NotificationsButton variant="row" tone="light" />
        </SheetRow>
        <SheetRow>
          <HelpButton variant="row" tone="light" onAction={onClose} />
        </SheetRow>
        <SheetRow>
          <BugReportButton variant="row" tone="light" onAction={onClose} />
        </SheetRow>
        <SheetRow>
          <AccountMenuButton variant="row" tone="light" />
        </SheetRow>
      </div>
    </div>
  );
};

const SheetRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2">{children}</div>;
};

export default MoreSheet;
