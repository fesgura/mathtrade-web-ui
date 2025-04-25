import { useCallback, useState, useEffect, useContext } from "react";
import {
  MenuList,
  MenuListDefault,
  MenuListNotSignedToMathtrade,
} from "./config";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { PageContext } from "@/context/page";

const useHeaderMenu = () => {
  const { canI } = useContext(PageContext);

  const { membership, mathtrade } = useStore((state) => state.data);

  const currentPath = usePathname();

  const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
  const [menuListOfItems, setMenuListOfItems] = useState([]);

  const toggleMobileMenu = useCallback(() => {
    setVisibleMobileMenu((v) => !v);
  }, []);

  useEffect(() => {
    let list = [];
    if (mathtrade) {
      if (membership) {
        list = MenuList;
      } else {
        if (canI.sign) {
          list = MenuListNotSignedToMathtrade;
        }
      }
    } else {
      list = MenuListDefault;
    }
    setMenuListOfItems(list.filter((item) => !item.disabled));
  }, [membership, mathtrade, canI]);

  return {
    visibleMobileMenu,
    toggleMobileMenu,
    setVisibleMobileMenu,
    currentPath,
    menuListOfItems,
  };
};

export default useHeaderMenu;
