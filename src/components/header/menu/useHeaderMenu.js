import { useCallback, useState, useEffect } from "react";
import {
  MenuList,
  MenuListDefault,
  MenuListNotSignedToMathtrade,
} from "./config";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";

const useHeaderMenu = () => {
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
        list = MenuListNotSignedToMathtrade;
      }
    } else {
      list = MenuListDefault;
    }
    setMenuListOfItems(list.filter((item) => !item.disabled));
  }, [membership, mathtrade]);

  return {
    visibleMobileMenu,
    toggleMobileMenu,
    setVisibleMobileMenu,
    currentPath,
    menuListOfItems,
  };
};

export default useHeaderMenu;
