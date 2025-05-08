import Link from "next/link";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import { PRIVATE_ROUTES } from "@/config/routes";
import clsx from "clsx";
import { useMemo } from "react";
import InnerButton from "@/components/button/inner-button";

const IconInMenu = ({ icon }) => {
  return icon ? <Icon type={icon} className="text-xl" /> : null;
};

const ItemMenu = ({ menuItem, currentPath, setVisibleMobileMenu }) => {
  const { title, path, icon, subMenu, name, special } = menuItem;

  const { active, isSubmenu } = useMemo(() => {
    const { path, subMenu, name } = menuItem;

    if (subMenu) {
      const o = subMenu.reduce(
        (obj, s) => {
          if (s.path === currentPath) {
            obj.active = s.name;
          }
          return obj;
        },
        { active: null }
      );

      const isSubmenu =
        currentPath + "/" !== PRIVATE_ROUTES.HOME.path && o.active;

      return {
        ...o,
        isSubmenu,
      };
    }

    return { active: path === currentPath ? name : "NONE", isSubmenu: false };
  }, [menuItem, currentPath]);

  return subMenu ? (
    <>
      <span
        className={clsx(
          "lg:text-white block text-sm leading-9 py-1 px-5 cursor-pointer",

          {
            "bg-sky-600/70": isSubmenu && active === "myOffer",
            "bg-red-700/80": isSubmenu && active === "items",
            "bg-orange-600/80": isSubmenu && active === "offer",
            "bg-want/70": isSubmenu && active === "myWants",
            "bg-teal-600/70": isSubmenu && active === "results",
            "bg-yellow-600/70": isSubmenu && active === "stats",
            "bg-sky-600/70": isSubmenu && active === "myData",
            "hover:bg-sky-400/40": !active,
          }
        )}
      >
        <IconInMenu icon={icon} />
        <I18N id={title} />

        <Icon type="chevron-down" className="text-base" />
      </span>

      <ul className="lg:absolute lg:top-[99%] lg:left-0 lg:min-w-full lg:bg-white bg-gray-100 py-1 lg:hidden lg:group-hover:block lg:animate-fadeup">
        {subMenu.map((subMenuItem) => {
          const { title, path, icon, name: subname } = subMenuItem;
          return (
            <li key={title}>
              <Link
                href={path}
                className={clsx(
                  "block text-sm lg:leading-9 leading-7 py-1 hover:text-white transition",
                  {
                    "hover:bg-red-600": subname === "myOffer",
                    "hover:bg-sky-700": subname === "items",
                    "hover:bg-orange-600": subname === "games",
                    "hover:bg-want": subname === "myWants",
                    "hover:bg-teal-600": subname === "results",
                    "hover:bg-yellow-600": subname === "stats",
                    "hover:bg-sky-600": subname === "myData",
                  }
                )}
                onClick={() => {
                  setVisibleMobileMenu(false);
                }}
              >
                <InnerButton>
                  <IconInMenu icon={icon} />
                  <I18N id={title} />
                </InnerButton>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <Link
      href={path}
      className={clsx("lg:text-white  block text-sm hover:bg-sky-400/30 ", {
        "bg-sky-600/70": active === "myOffer",
        "bg-red-700/90": active === "items",
        "bg-orange-600/80": active === "offer",
        "bg-want/70": active === "myWants",
        "bg-teal-600/70": active === "results",
        "bg-purple-900/80": active === "stats",
        "bg-sky-700/70": active === "myData",
        "leading-9 py-1 px-5": !special,
        "bg-sky-400/50 py-1 px-5 mx-1 rounded-full text-xs font-bold": special,
      })}
      onClick={() => {
        setVisibleMobileMenu(false);
      }}
    >
      <InnerButton>
        <IconInMenu icon={icon} />
        <I18N id={title} />
      </InnerButton>
    </Link>
  );
};

export default ItemMenu;
