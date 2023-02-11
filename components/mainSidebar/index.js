import { useState } from "react";
import { Col, Row } from "reactstrap";
import Link from "next/link";
// import UserHeader from "./user";
// import MainMenu from "./menu";
import Icon from "components/icon";
import classNames from "classnames";
import storage from "utils/storage";
import Image from "next/image";
import logoSrc from "assets/img/logo.svg";
import MainMenu from "./menu";
import SignOut from "./signOut";

const MainSidebar = ({
  sidebarOpen,
  toggleSidebar,
  sidebarAnimationEnabled,
}) => {
  return (
    <>
      <aside
        className={classNames("main-sidebar", {
          "sidebar-open": sidebarOpen,
          "sidebar-animation-enabled": sidebarAnimationEnabled,
        })}
      >
        <div className="main-sidebar-container">
          <div className="main-sidebar-top">
            <Link href={"/"}>
              <a className="main-logo">
                <Row className="g-0 align-items-center">
                  <Col xs="auto">
                    <div className="main-logo_img">
                      <Image
                        src={logoSrc}
                        alt="Math Trade Argentina"
                        // width={logoWidth}
                        // height={logoWidth}
                        priority
                      />
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div className="main-logo_text">
                      <div className="main-logo_text_1">MathTrade</div>
                      <div className="main-logo_text_2">Argentina</div>
                    </div>
                  </Col>
                </Row>
              </a>
            </Link>
          </div>
          <div className="main-sidebar-center">
            <MainMenu />
          </div>
          <div className="main-sidebar-bottom">
            <SignOut />
          </div>
        </div>
      </aside>

      <div
        className={classNames("main-sidebar-toggler", {
          "sidebar-open": sidebarOpen,
          "sidebar-animation-enabled": sidebarAnimationEnabled,
        })}
        onClick={toggleSidebar}
      >
        <div className="main-sidebar-toggler-cont">
          <Icon type="chevron-right" />
        </div>
      </div>
    </>
  );
};
export default MainSidebar;
