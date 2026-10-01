"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import useSidebarNav from "../useSidebarNav";
import NavItem from "../NavItem";
import MoreSheet from "./MoreSheet";

const TabBar = () => {
  const { items, isActive, lockedInfo, provisionalWindowActive } =
    useSidebarNav();
  const [sheetOpen, setSheetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSheetOpen(false);
  }, [pathname]);

  const primary = useMemo(() => {
    return items.filter((entry) => {
      if (entry.key === "PROVISIONAL_RESULTS") return provisionalWindowActive;
      if (entry.key === "RESULTS") {
        return Boolean(entry.mobilePrimary) && !provisionalWindowActive;
      }
      return Boolean(entry.mobilePrimary);
    });
  }, [items, provisionalWindowActive]);

  const rest = items.filter(
    (entry) => !primary.some((primaryEntry) => primaryEntry.key === entry.key)
  );

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 w-full z-nav bg-black flex shadow-[0_-4px_16px_rgba(0,0,0,0.2)]">
        {primary.map((entry) => {
          const active = isActive(entry.path);
          const locked = lockedInfo[entry.key];
          return (
            <NavItem
              key={entry.key}
              href={entry.path}
              locked={Boolean(locked)}
              onClick={() => setSheetOpen(false)}
              title={
                locked
                  ? getI18Ntext(locked.captionId, [locked.daysLeft])
                  : undefined
              }
              className={clsx(
                "relative flex-1 min-w-0 flex flex-col items-center gap-0.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] text-[10px] font-semibold",
                locked ? "text-[#6b7280]" : active ? "text-primary" : "text-[#b7bcc4]"
              )}
            >
              <Icon type={entry.icon} className="text-lg" />
              {locked ? (
                <Icon
                  type="lock"
                  className="absolute top-1 right-[calc(50%-16px)] text-[9px] text-[#6b7280]"
                />
              ) : null}
              <span className="text-center leading-tight line-clamp-2 px-0.5">
                <I18N id={entry.titleI18nKey} />
              </span>
            </NavItem>
          );
        })}
        <button
          type="button"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
          aria-controls="mobile-more-sheet"
          className={clsx(
            "flex-1 min-w-0 flex flex-col items-center gap-0.5 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] text-[10px] font-semibold",
            sheetOpen ? "text-primary" : "text-[#b7bcc4]"
          )}
        >
          <Icon type="more" className="text-lg" />
          <span className="text-center leading-tight">
            <I18N id="menu.More" />
          </span>
        </button>
      </nav>

      <MoreSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        restItems={rest}
        isActive={isActive}
        lockedInfo={lockedInfo}
      />
    </>
  );
};

export default TabBar;
