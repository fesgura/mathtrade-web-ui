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
import useCanEdit from "hooks/useCanEdit";

const Menu = ({ menuList, router }) => {
  return (
    <nav className="main-menu">
      {menuList.map((item, k) => {
        if (item?.hidden) {
          return null;
        }

        const { path, icon, title, disabled, hot, storeQuery } = item;

        let disabledItem = false;

        let query = {};
        let pathComplete = path;

        if (storeQuery) {
          const storeOptions = storage.getOptions();
          const listPageType = storeOptions?.listPageType || "gameList";
          if (listPageType === "gameList") {
            query = storeOptions?.gameListFilters || {};
            pathComplete += "/games";
          } else {
            query = storeOptions?.itemListFilters || {};
            pathComplete += "/items";
          }
        }

        return typeof path !== "undefined" && !disabledItem ? (
          <Link
            href={{
              pathname: `/${pathComplete}`,
              query,
            }}
            key={k}
          >
            <a
              className={classNames("main-menu-item", {
                active: router.pathname.indexOf(path) > 0,
                hot,
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
              {hot ? <div className="main-menu-item-tag">Nuevo</div> : null}
            </a>
          </Link>
        ) : (
          <div
            className={classNames("main-menu-item", {
              disabled: true,
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
  const canEditList = useCanEdit("list");
  const router = useRouter();
  const storeData = storage.get();

  const [menuMathTrade, set_menuMathTrade] = useState([]);

  useEffect(() => {
    if (storeData && storeData.mathtrade) {
      set_menuMathTrade(
        storeData?.mathtrade?.IamIn
          ? menu_yes_mathTrade
          : canEditList
          ? menu_no_mathTrade
          : []
      );
    }
  }, [storeData, canEditList]);

  return (
    <>
      <Menu menuList={menuBasic} router={router} />
      {menuMathTrade.length ? (
        <>
          <div className="main-menu-divider">
            <div className="main-menu-divider_line">MathTrade</div>
          </div>
          <Menu menuList={menuMathTrade} router={router} />
        </>
      ) : null}
    </>
  );
};
export default MainMenu;
