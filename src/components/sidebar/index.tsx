"use client";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/icon";
import clsx from "clsx";
import { PRIVATE_ROUTES } from "@/config/routes";
import { getI18Ntext } from "@/i18n";
import useSidebarNav from "./useSidebarNav";
import EventStatusCard from "./EventStatusCard";
import NavRows from "./NavRows";
import UtilityRow from "./UtilityRow";
import AccountRow from "./AccountRow";
import { fadeLabelClass } from "./fadeLabel";
import Chip from "@/components/chip";

const Sidebar = () => {
  const { groups, isActive, collapsed, toggleCollapsed, lockedInfo, isAdmin } =
    useSidebarNav();

  return (
    <aside
      data-html2canvas-ignore=""
      className={clsx(
        "hidden lg:flex flex-col h-screen sticky top-0 z-nav overflow-visible bg-black shrink-0 py-2 px-2 transition-[width] duration-300 ease-out motion-reduce:transition-none",
        collapsed ? "w-[68px] items-center" : "w-[244px]"
      )}
    >
      <div
        className={clsx(
          "flex items-center gap-1.5 min-h-9 w-full shrink-0",
          collapsed ? "flex-col" : ""
        )}
      >
        <Link
          href={PRIVATE_ROUTES.HOME.path}
          className={clsx(
            "flex items-center min-w-0",
            collapsed ? "justify-center" : "flex-1"
          )}
        >
          <span className="relative shrink-0">
            <Image
              src="/favicon/apple-icon.png"
              alt="Math Trade"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            {isAdmin && collapsed ? (
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-purple-500 ring-2 ring-black cursor-help"
                data-tooltip={getI18Ntext("sidebar.adminPill.tooltip")}
                data-placement="right"
              />
            ) : null}
          </span>
          <span
            className={clsx(
              "text-white font-bold text-[15px]",
              fadeLabelClass(!collapsed)
            )}
          >
            Math Trade
          </span>
        </Link>
        {isAdmin && !collapsed ? (
          <Chip
            tone="admin"
            placement="right"
            tooltip={getI18Ntext("sidebar.adminPill.tooltip")}
          >
            {getI18Ntext("sidebar.adminPill")}
          </Chip>
        ) : null}
        <button
          type="button"
          onClick={toggleCollapsed}
          className="w-8 h-8 rounded-[10px] bg-[#1c1d21] text-white flex items-center justify-center hover:bg-[#2a2c32] shrink-0"
          aria-expanded={!collapsed}
          aria-label={getI18Ntext(collapsed ? "menu.unfold" : "menu.fold")}
        >
          <Icon
            type="chevron-left"
            className={clsx(
              "text-base transition-transform duration-300 ease-out motion-reduce:transition-none",
              collapsed ? "rotate-180" : "rotate-0"
            )}
          />
        </button>
      </div>

      <EventStatusCard collapsed={collapsed} />

      <NavRows
        groups={groups}
        isActive={isActive}
        collapsed={collapsed}
        lockedInfo={lockedInfo}
        isAdmin={isAdmin}
      />

      <div
        className={clsx(
          "border-t border-white/10 my-1.5 shrink-0 transition-[width,margin] duration-300 ease-out motion-reduce:transition-none",
          collapsed ? "w-8 mx-auto" : "mx-1"
        )}
      />

      <UtilityRow collapsed={collapsed} />
      <AccountRow collapsed={collapsed} />
    </aside>
  );
};

export default Sidebar;
