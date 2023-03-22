import { useState } from "react";
import User from "./user";
import Notifications from "./notifications";
import classNames from "classnames";
import storage from "utils/storage";
import { Alert } from "reactstrap";

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
          <Alert className="alert-form-header" color="info">
            <a href="https://forms.gle/SypJB9TJ2VkBJJv9A" target="_blank">
              https://forms.gle/SypJB9TJ2VkBJJv9A
            </a>
          </Alert>
          <User />
          <Notifications />
        </div>
      </div>
    </div>
  );
};
export default Header;
