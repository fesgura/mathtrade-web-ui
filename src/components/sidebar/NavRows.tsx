"use client";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import clsx from "clsx";
import type { LockedInfo, NavGroup } from "./useSidebarNav";
import NavItem from "./NavItem";
import { fadeLabelClass } from "./fadeLabel";

type NavRowsProps = {
  groups: NavGroup[];
  isActive: (path: string) => boolean;
  collapsed: boolean;
  lockedInfo?: Record<string, LockedInfo>;
  isAdmin?: boolean;
};

const NavRows = ({
  groups = [],
  isActive,
  collapsed = false,
  lockedInfo = {},
  isAdmin = false,
}: NavRowsProps) => {
  return (
    <nav className="sidebar-nav-scroll flex flex-col gap-0.5 w-full">
      {groups.map((group, groupIndex) => (
        <div key={group.id} className="flex flex-col gap-px">
          <p
            className={clsx(
              "px-2.5 text-[11px] leading-tight font-semibold text-[#8a92a0] overflow-hidden transition-[max-height,opacity,margin] duration-200 ease-out motion-reduce:transition-none",
              collapsed
                ? "max-h-0 opacity-0 mt-0 mb-0"
                : clsx(
                    "max-h-6 opacity-100 mb-0.5",
                    groupIndex === 0 ? "mt-1" : "mt-2"
                  )
            )}
          >
            <I18N id={group.labelI18nKey} />
          </p>
          {group.items.map((entry) => {
            const active = isActive(entry.path);
            const locked = lockedInfo[entry.key];
            // Admins see the same lock icon/caption (nothing hides that this
            // section isn't really open yet) but can still click through —
            // the backend enforces read-only for them regardless.
            const navLocked = Boolean(locked) && !isAdmin;
            const lockedValue = locked?.displayValue ?? locked?.daysLeft;
            const entryLabel = getI18Ntext(
              entry.titleI18nKey,
              entry.titleValues || []
            );
            const title = locked
              ? `${entryLabel} — ${getI18Ntext(locked.captionId, [lockedValue])}`
              : collapsed
                ? entryLabel
                : undefined;

            return (
              <div key={entry.key}>
                <NavItem
                  href={entry.path}
                  locked={navLocked}
                  title={title}
                  className={clsx(
                    "flex items-center rounded-[10px] text-sm font-semibold transition-colors relative h-9 w-full [@media(max-height:800px)]:h-8",
                    collapsed ? "justify-center px-0" : "px-2.5",
                    navLocked
                      ? "text-[#6b7280] cursor-default"
                      : active
                        ? "bg-primary text-white"
                        : "text-[#c9ced4] hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span className="relative shrink-0">
                    <Icon type={entry.icon} className="text-lg" />
                    {locked ? (
                      <Icon
                        type="lock"
                        className={clsx(
                          "absolute -right-1.5 -bottom-0.5 text-[9px] transition-opacity duration-200",
                          collapsed ? "opacity-80" : "opacity-0"
                        )}
                      />
                    ) : null}
                  </span>
                  <span className={fadeLabelClass(!collapsed)}>
                    <I18N id={entry.titleI18nKey} values={entry.titleValues} />
                  </span>
                  {locked ? (
                    <Icon
                      type="lock"
                      className={clsx(
                        "text-sm opacity-80 shrink-0 overflow-hidden transition-[opacity,max-width,margin] duration-200 ease-out",
                        collapsed
                          ? "max-w-0 opacity-0 ml-0"
                          : "ml-auto"
                      )}
                    />
                  ) : null}
                </NavItem>
                {locked ? (
                  <div
                    className={clsx(
                      "text-[11px] leading-tight text-[#8a92a0] px-2.5 ml-7 truncate overflow-hidden transition-[max-height,opacity,padding] duration-200 ease-out motion-reduce:transition-none",
                      collapsed
                        ? "max-h-0 opacity-0 pb-0"
                        : "max-h-5 opacity-100 pb-0.5 [@media(max-height:800px)]:max-h-0 [@media(max-height:800px)]:opacity-0 [@media(max-height:800px)]:pb-0"
                    )}
                  >
                    <I18N id={locked.captionId} values={[lockedValue]} />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </nav>
  );
};

export default NavRows;
