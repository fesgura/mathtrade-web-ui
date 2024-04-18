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
    if (mathtrade) {
      if (membership) {
        setMenuListOfItems(MenuList);
      } else {
        setMenuListOfItems(MenuListNotSignedToMathtrade);
      }
    } else {
      setMenuListOfItems(MenuListDefault);
    }
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
