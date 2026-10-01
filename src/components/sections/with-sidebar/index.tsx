"use client";
import { PageLoading } from "@/components/loading";
import clsx from "clsx";
import Icon from "../../icon";
import { useContext, type ReactNode } from "react";
import { SidebarContext, SidebarContextProvider } from "@/context/sidebar";
import Wrapper from "@/components/wrapper";
import I18N, { getI18Ntext } from "@/i18n";

export const SidebarGrid = ({
  className = "",
  children = null,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  const { visibleSidebar } = useContext(SidebarContext);
  return (
    <div
      className={clsx("container-with-sidebar", className, {
        visibleSidebar,
      })}
    >
      {children}
    </div>
  );
};

export const Sidebar = ({
  children = null,
  topNotRounded = false,
  titleId = "filter.Title",
}: {
  children?: ReactNode;
  topNotRounded?: boolean;
  titleId?: string;
}) => {
  const { visibleSidebar, closeSidebar } = useContext(SidebarContext);

  return (
    <aside
      className={clsx("sidebar-aside", {
        "visibleMobile animate-fadeleft": visibleSidebar,
      })}
    >
      <div
        className={clsx(
          "bg-white lg:sticky lg:top-0 lg:h-screen overflow-x-hidden sidebar-aside-inner z-sticky flex flex-col border-r border-gray-200",
          {
            "lg:rounded-tl-main": !topNotRounded,
          }
        )}
      >
        <div className="flex items-center justify-between gap-2 px-3 h-[52px] border-b border-gray-200 shrink-0">
          <strong className="text-sm font-semibold">
            <I18N id={titleId} />
          </strong>
          <button
            type="button"
            className="w-9 h-9 rounded-[10px] bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-200"
            onClick={closeSidebar}
            aria-label={getI18Ntext("filter.close")}
          >
            <Icon type="close" className="text-lg" />
          </button>
        </div>
        <div className="flex-1 min-h-0 flex flex-col">
          {visibleSidebar ? children : null}
        </div>
      </div>
    </aside>
  );
};

export const SidebarToggleButton = ({
  className = "",
  classNameNotHighlighted = "",
  classNameHighlighted = "",
  children = null,
}: {
  className?: string;
  classNameNotHighlighted?: string;
  classNameHighlighted?: string;
  children?: ReactNode;
}) => {
  const { visibleSidebar, toggleSidebar } = useContext(SidebarContext);
  return (
    <button
      type="button"
      className={clsx(
        className,
        visibleSidebar ? classNameHighlighted : classNameNotHighlighted
      )}
      onClick={() => {
        toggleSidebar();
      }}
    >
      {children}
    </button>
  );
};

const SectionWithSidebar = ({
  name = null,
  className = "",
  loading = false,
  children = null,
  topNotRounded = false,
}: {
  name?: string | null;
  className?: string;
  loading?: boolean;
  children?: ReactNode;
  topNotRounded?: boolean;
}) => {
  return (
    <SidebarContextProvider name={name}>
      <Wrapper>
        <section
          className={clsx(
            "relative bg-white shadow-main",
            {
              "rounded-b-main": topNotRounded,
              "rounded-main": !topNotRounded,
            },
            className
          )}
        >
          {children}
          <PageLoading loading={loading} />
        </section>
      </Wrapper>
    </SidebarContextProvider>
  );
};
export default SectionWithSidebar;
