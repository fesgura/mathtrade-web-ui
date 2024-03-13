"use client";
import Link from "next/link";
import I18N from "@/i18n";
import clsx from "clsx";
import Icon from "@/components/icon";
import useHeaderMenu from "./useHeaderMenu";
import { PRIVATE_ROUTES } from "@/config/routes";
import ItemMenu from "./itemMenu";

const MainMenu = () => {
  const {
    visibleMobileMenu,
    toggleMobileMenu,
    setVisibleMobileMenu,
    menuListOfItems,
    currentPath,
  } = useHeaderMenu();

  return (
    <>
      <button
        className="relative cursor-pointer lg:hidden block w-9 h-9 text-xl text-center text-white"
        onClick={toggleMobileMenu}
      >
        <Icon type="menu" />
      </button>
      <menu
        className={clsx(
          `
        lg:block
        lg:pl-2
        lg:relative lg:top-auto lg:left-auto lg:w-auto lg:h-auto lg:z-auto lg:bg-transparent
        lg:animate-none
        animate-fadeleft
        lg:overflow-y-visible lg:overflow-x-visible
        fixed top-0 left-0 w-full max-w-full h-full z-[25000] lg:py-0 py-10 overflow-y-auto overflow-x-hidden bg-white `,
          {
            hidden: !visibleMobileMenu,
            block: visibleMobileMenu,
          }
        )}
      >
        <button
          className="absolute top-0 right-0 w-10 h-10 text-gray-600 block lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Icon />
        </button>
        <ul className="lg:flex lg:items-center  text-center">
          {menuListOfItems.map((menuItem) => {
            return (
              <li key={menuItem.title} className="relative group">
                <ItemMenu
                  menuItem={menuItem}
                  currentPath={currentPath}
                  setVisibleMobileMenu={setVisibleMobileMenu}
                />
              </li>
            );
          })}
        </ul>
      </menu>
    </>
  );
};

export default MainMenu;
