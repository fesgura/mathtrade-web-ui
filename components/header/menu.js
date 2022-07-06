import classNames from "classnames";
import { mainMenuList } from "config/routes";
import Link from "next/link";

const MainMenu = () => {
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
                    const { path, title } = itemSec;
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
