"use client";
import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import { useStore } from "@/store";
import { normalizeString } from "@/utils";
import { PageContext } from "../page";

export const ItemPreviousMTContext = createContext({
  onOpen: () => {},
  onClose: () => {},
  openModal: false,
  mathTradePrevious: null,
  itemList: [],
  keyword: "",
  setKeyword: () => {},
  setItems: () => {},
  setItemsIdAdded: () => {},
});

export const ItemPreviousMTContextProvider = ({ children }) => {
  const { forceReloadPage } = useContext(PageContext);

  const { mathtrade_history } = useStore((state) => state.data);

  const [openModal, setOpenModal] = useState(false);

  const mathTradePrevious = useMemo(() => {
    return mathtrade_history?.[0] ?? null;
  }, [mathtrade_history]);

  const [keyword, setKeyword] = useState("");

  const [items, setItems] = useState([]);

  const [itemsIdAdded, setItemsIdAdded] = useState([]);

  const itemList = useMemo(() => {
    const itemsNotAdded = items.filter((item) => {
      return !itemsIdAdded.includes(item.id);
    });

    const itemsFiltered = keyword.length
      ? (() => {
          const keyLow = normalizeString(keyword);

          return itemsNotAdded.filter((item) => {
            return normalizeString(item.title).indexOf(keyLow) >= 0;
          });
        })()
      : itemsNotAdded;

    return itemsFiltered;
  }, [items, itemsIdAdded, keyword]);

  const onOpen = useCallback(() => {
    setOpenModal(true);
  }, []);
  const onClose = useCallback(() => {
    setOpenModal(false);
    if (itemsIdAdded.length) {
      forceReloadPage();
    }
  }, [forceReloadPage, itemsIdAdded]);

  return (
    <ItemPreviousMTContext.Provider
      value={{
        onOpen,
        onClose,
        openModal,
        mathTradePrevious,
        itemList,
        keyword,
        setKeyword,
        setItems,
        setItemsIdAdded,
      }}
    >
      {children}
    </ItemPreviousMTContext.Provider>
  );
};
