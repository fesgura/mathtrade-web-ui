import { useState, useEffect } from "react";
import classNames from "classnames";
import { menu_no_mathTrade, menu_yes_mathTrade } from "config/routes";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "components/icon";

const MainMenu = ({ storeData }) => {
  const router = useRouter();

  const [menuList, set_menuList] = useState([]);
  const [mathTradeName, set_mathTradeName] = useState("");

  useEffect(() => {
    if (storeData) {
      set_menuList(
        storeData?.mathtrade?.IamIn ? menu_yes_mathTrade : menu_no_mathTrade
      );
      set_mathTradeName(storeData?.mathtrade?.data?.name || "");
    }
  }, [storeData]);

  // console.log("storeData", storeData);

  return (
    <menu className="main-menu">
      <ul>
        {menuList.map((item, k) => {
          const { path, icon, title, children, disabled, bordered } = item;
          const titleComp =
            title === "MT_NAME"
              ? `Inscribite al Math Trade ${mathTradeName}`
              : title;
          return (
            <li key={k}>
              {typeof path !== "undefined" && !disabled ? (
                <Link href={`/${path}`}>
                  <a
                    className={classNames("a-item", {
                      "has-children": children && children.length,
                      active: router.pathname.indexOf(path) > 0,
                      bordered,
                    })}
                  >
                    {icon ? <Icon type={icon} className="me-1" /> : null}
                    {titleComp}
                  </a>
                </Link>
              ) : (
                <span
                  className={classNames("a-item", {
                    "has-children": children && children.length,
                    disabled,
                    active: router.pathname.indexOf(path) > 0,
                    bordered,
                  })}
                >
                  {icon ? <Icon type={icon} className="me-1" /> : null}
                  {titleComp}
                </span>
              )}
              {children && children.length ? (
                <ul>
                  {children.map((itemSec, j) => {
                    const { path, title, separator } = itemSec;
                    if (separator) {
                      return (
                        <li key={j}>
                          <hr className="m-0" />
                        </li>
                      );
                    }
                    return (
                      <li key={j}>
                        {path ? (
                          <Link href={`/${path}`}>
                            <a className="a-item">{title}</a>
                          </Link>
                        ) : (
                          <span className="a-item">{title}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </menu>
  );
};

export default MainMenu;
