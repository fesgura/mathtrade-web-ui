import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  menuBasic,
  menu_no_mathTrade,
  menu_yes_mathTrade,
} from "config/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "components/icon";
import I18N from "i18n";
import storage from "utils/storage";
import { Col, Row } from "reactstrap";

const Menu = ({ menuList, router }) => {
  return (
    <nav className="main-menu">
      {menuList.map((item, k) => {
        const { path, icon, title, disabled } = item;

        return typeof path !== "undefined" && !disabled ? (
          <Link href={`/${path}`} key={k}>
            <a
              className={classNames("main-menu-item", {
                active: router.pathname.indexOf(path) > 0,
              })}
            >
              <Row className="g-0 align-items-center">
                <Col xs="auto">
                  <div className="main-menu-item_icon">
                    <Icon type={icon} />
                  </div>
                </Col>
                <Col>
                  <div className="main-menu-item_text">
                    <I18N id={title} />
                  </div>
                </Col>
              </Row>
            </a>
          </Link>
        ) : (
          <div
            className={classNames("main-menu-item", {
              disabled,
              active: router.pathname.indexOf(path) > 0,
            })}
            key={k}
          >
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="main-menu-item_icon">
                  <Icon type={icon} />
                </div>
              </Col>
              <Col>
                <div className="main-menu-item_text">
                  <I18N id={title} />
                </div>
              </Col>
            </Row>
          </div>
        );
      })}
    </nav>
  );
};

const MainMenu = () => {
  const router = useRouter();
  const storeData = storage.get();

  const [menuMathTrade, set_menuMathTrade] = useState([]);

  useEffect(() => {
    if (storeData) {
      set_menuMathTrade(
        storeData?.mathtrade?.IamIn ? menu_yes_mathTrade : menu_no_mathTrade
      );
    }
  }, [storeData]);

  return (
    <>
      <Menu menuList={menuBasic} router={router} />
      <div className="main-menu-divider">
        <div className="main-menu-divider_line">MathTrade</div>
      </div>
      <Menu menuList={menuMathTrade} router={router} />
    </>
  );
};
export default MainMenu;
