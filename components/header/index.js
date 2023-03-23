import User from "./user";
import TimelineHeader from "./timeline";
import Notifications from "./notifications";
import classNames from "classnames";

const Header = ({ sidebarOpen, sidebarAnimationEnabled }) => {
  return (
    <div
      className={classNames("main-header", {
        "sidebar-open": sidebarOpen,
        "sidebar-animation-enabled": sidebarAnimationEnabled,
      })}
    >
      <div className="main-container">
        <div className="main-header-container">
          <User />
          <TimelineHeader />
          <Notifications />
        </div>
      </div>
    </div>
  );
};
export default Header;
