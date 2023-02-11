import { useState } from "react";
import { Col, Row } from "reactstrap";
import Link from "next/link";
import UserHeader from "./user";
import MainMenu from "./menu";
import Logo from "components/logo";
import Icon from "components/icon";
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
      <div className="main-container"></div>
    </div>
  );
};
export default Header;
