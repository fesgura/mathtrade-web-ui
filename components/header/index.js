import { useState } from "react";
import { Col, Row } from "reactstrap";
import Link from "next/link";
import UserHeader from "./user";
import MainMenu from "./menu";
import Logo from "components/logo";
import Icon from "components/icon";
import classNames from "classnames";

const Header = () => {
  const [menuMobileVisible, set_menuMobileVisible] = useState(false);

  return (
    <div className="main-header">
      <div className="main-container">
        <Row className="main-row align-items-center ">
          <Col xs="auto">
            <Link href={"/"}>
              <a className="logo-link">
                <Logo height={45} />
              </a>
            </Link>
          </Col>
          <Col>
            <div
              className={classNames("main-menu-container", {
                visible: menuMobileVisible,
              })}
            >
              <div
                className="main-menu-container_dimmer"
                onClick={() => {
                  set_menuMobileVisible(false);
                }}
              />
              <div
                className={classNames("main-menu-container_pad", {
                  visible: menuMobileVisible,
                })}
              >
                <Row className="align-items-center g-0 justify-content-between">
                  <Col lg="auto" className="order-lg-1 order-2">
                    <MainMenu />
                  </Col>
                  <Col lg="auto" className="order-lg-2 order-1">
                    <UserHeader />
                  </Col>
                </Row>
                <div
                  className="main-menu-mobile-btn"
                  onClick={() => {
                    set_menuMobileVisible(false);
                  }}
                >
                  <Icon type="times" />
                </div>
              </div>
            </div>
            <div
              className="main-menu-mobile-btn"
              onClick={() => {
                set_menuMobileVisible(true);
              }}
            >
              <Icon type="bars" />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Header;
