import { useCallback, useState, useEffect, useContext } from "react";
import type { User } from "@/types/user";
import {
  MenuList,
  MenuListDefault,
  MenuListNotSignedToMathtrade,
} from "./config";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { PageContext } from "@/context/page";
import { StoreData, StoreState } from "@/store/types";

const useHeaderMenu = () => {
  const { canI } = useContext(PageContext);
  const storeData = useStore<StoreData>((state: StoreState) => state.data || {} as StoreData);
  const user = storeData.user ?? { roles: [] };
  const membership = storeData.membership ?? null;
  const mathtrade = storeData.mathtrade ?? null;
  const currentPath = usePathname();
  const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
  const [menuListOfItems, setMenuListOfItems] = useState([]);

  const toggleMobileMenu = useCallback(() => {
    setVisibleMobileMenu((v) => !v);
  }, []);

  const isAdmin = user?.roles?.includes("ADMIN");

  useEffect(() => {
    let list = [];
    if (mathtrade) {
      if (membership || isAdmin) {
        list = MenuList;
      } else {
        if (canI.sign) {
          list = MenuListNotSignedToMathtrade;
        } else {
          list = MenuListDefault;
        }
      }
    } else {
      list = MenuListDefault;
    }
    setMenuListOfItems(list.filter((item) => !item.disabled));
  }, [membership, mathtrade, canI, isAdmin]);

  return {
    visibleMobileMenu,
    toggleMobileMenu,
    setVisibleMobileMenu,
    currentPath,
    menuListOfItems,
  };
};

export default useHeaderMenu;
