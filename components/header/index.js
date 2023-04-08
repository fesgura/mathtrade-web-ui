import User from "./user";
import TimelineHeader from "./timeline";
import Notifications from "./notifications";
import classNames from "classnames";
import { Col, Row } from "reactstrap";
import Image from "next/image";
import logoSrc from "assets/img/logo.svg";
import Icon from "components/icon";

const Header = ({
  sidebarOpen,
  sidebarAnimationEnabled,
  setShowMobileSidebar,
}) => {
  return (
    <div
      className={classNames("main-header", {
        "sidebar-open": sidebarOpen,
        "sidebar-animation-enabled": sidebarAnimationEnabled,
      })}
    >
      <div className="main-container">
        <div className="main-header-container">
          <Row className="g-0 justify-content-between align-items-center flex-nowrap">
            <Col xs="auto">
              <div className="main-header_logo-mobile">
                <Row className="g-0 align-items-center flex-nowrap">
                  <Col xs="auto">
                    <div className="main-header_logo-mobile-logo">
                      <Image
                        src={logoSrc}
                        alt="Math Trade Argentina"
                        priority
                        width={40}
                        height={40}
                      />
                    </div>
                  </Col>
                  <Col xs="auto">
                    <div
                      className="main-header_logo-mobile-btn"
                      onClick={() => {
                        setShowMobileSidebar((v) => !v);
                      }}
                    >
                      <Icon type="bars" />
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col>
              <Row className="g-0 justify-content-end align-items-center flex-nowrap">
                <Col xs="auto">
                  <TimelineHeader />
                </Col>
                <Col xs="auto">
                  <Notifications />
                </Col>
                <Col xs="auto">
                  <User />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default Header;
