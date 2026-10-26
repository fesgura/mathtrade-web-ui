import { useCallback, useState, useEffect, useContext } from "react";
import {
  MenuList,
  MenuListDefault,
  MenuListNotSignedToMathtrade,
} from "./config";
import { usePathname } from "next/navigation";
import { useStore } from "@/store";
import { PageContext } from "@/context/page";
import { hasProvisional } from "@/utils/provisionalDates";

type MenuItem = { name: string; disabled?: boolean } & Record<string, unknown>;

const useHeaderMenu = () => {
  const { canI } = useContext(PageContext);

  const { membership, mathtrade } = useStore((state) => state.data);

  const currentPath = usePathname();

  const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
  const [menuListOfItems, setMenuListOfItems] = useState<MenuItem[]>([]);

  const toggleMobileMenu = useCallback(() => {
    setVisibleMobileMenu((v) => !v);
  }, []);

  useEffect(() => {
    let list: MenuItem[] = [];
    if (mathtrade) {
      if (membership) {
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
    setMenuListOfItems(
      list.filter(
        (item) =>
          !item.disabled &&
          // An edition without provisional results has no page for them.
          (item.name !== "provisionalResults" || hasProvisional(mathtrade))
      )
    );
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
