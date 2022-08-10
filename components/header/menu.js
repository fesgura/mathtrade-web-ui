import { useState, useEffect } from "react";
import classNames from "classnames";
import { mainMenuList, mathtradeMenuList } from "config/routes";
import { IamInMathtrade } from "utils";
import Link from "next/link";
import Icon from "components/icon";

const MainMenu = () => {
  const [mathtrade, set_mathtrade] = useState(null);

  useEffect(() => {
    const mathtradeData = IamInMathtrade();
    if (mathtradeData.mathtrade) {
      const newMathTrade = {
        name: mathtradeData.mathtrade.name || "",
        menu: mathtradeData.IamIn
          ? mathtradeMenuList.enabled
          : mathtradeMenuList.disabled,
      };
      set_mathtrade(newMathTrade);
    }
  }, []);

  return (
    <menu className="main-menu">
      <ul>
        {mainMenuList.map((item, k) => {
          const { path, title, children } = item;
          return (
            <li key={k}>
              {typeof path !== "undefined" ? (
                <Link href={`/${path}`}>
                  <a
                    className={classNames("a-item", {
                      "has-children": children && children.length,
                    })}
                  >
                    {title}
                  </a>
                </Link>
              ) : (
                <span
                  className={classNames("a-item", {
                    "has-children": children && children.length,
                  })}
                >
                  {title}
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
        {mathtrade ? (
          <li>
            <span className="a-item has-children">
              {`Math Trade ${mathtrade.name}`}
            </span>
            <ul>
              {mathtrade.menu.map((m, h) => {
                const { path, title, icon, separator } = m;
                if (separator) {
                  return (
                    <li key={h}>
                      <hr className="m-0" />
                    </li>
                  );
                }
                return (
                  <li key={h}>
                    {path ? (
                      <Link href={`/${path}`}>
                        <a className="a-item">
                          {icon && <Icon type={icon} className="me-1" />}
                          {title}
                        </a>
                      </Link>
                    ) : (
                      <span className="a-item">{title}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </li>
        ) : null}
      </ul>
    </menu>
  );
};

export default MainMenu;
