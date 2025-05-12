import { LoadingBox } from "@/components/loading";
import clsx from "clsx";
import Icon from "../../icon";
import { useContext } from "react";
import { SidebarContext, SidebarContextProvider } from "@/context/sidebar";
import Wrapper from "@/components/wrapper";

export const SidebarGrid = ({ className, children }) => {
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

export const Sidebar = ({ children, topNotRounded }) => {
  const { visibleSidebar, hideSidebar } = useContext(SidebarContext);

  return (
    <aside
      className={clsx("sidebar-aside", {
        "visibleMobile animate-fadeleft": visibleSidebar,
      })}
    >
      <button
        className="absolute right-0 top-0 w-10 h-10 text-lg text-gray-500 lg:hidden bg-white rounded-bl-2xl"
        onClick={hideSidebar}
      >
        <Icon />
      </button>
      <div
        className={clsx(
          "bg-white lg:sticky lg:top-11 lg:h-[calc(100vh-44px)] lg:shadow-lg lg:overflow-y-auto overflow-x-hidden sidebar-aside-inner z-[999]",
          {
            "lg:rounded-tl-main": !topNotRounded,
          }
        )}
      >
        {visibleSidebar ? children : null}
      </div>
    </aside>
  );
};

export const SidebarToggleButton = ({
  className,
  classNameNotHighlighted,
  classNameHighlighted,
  children,
}) => {
  const { visibleSidebar, toggleSidebar } = useContext(SidebarContext);
  return (
    <button
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
  name,
  className,
  loading,
  children,
  topNotRounded,
}) => {
  return (
    <SidebarContextProvider name={name}>
      <Wrapper>
        <section
          className={clsx(
            "relative bg-colorMain shadow-main",
            {
              "rounded-b-main": topNotRounded,
              "rounded-main": !topNotRounded,
            },
            className
          )}
        >
          {children}
          <LoadingBox loading={loading} transparent />
        </section>
      </Wrapper>
    </SidebarContextProvider>
  );
};
export default SectionWithSidebar;
