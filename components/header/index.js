import { useState } from "react";
import User from "./user";
import Notifications from "./notifications";
import classNames from "classnames";
import storage from "utils/storage";

const Header = ({ sidebarOpen, sidebarAnimationEnabled }) => {
  const storeData = storage.get();
  const [menuMobileVisible, set_menuMobileVisible] = useState(false);

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
          <Notifications />
        </div>
      </div>
    </div>
  );
};
export default Header;
