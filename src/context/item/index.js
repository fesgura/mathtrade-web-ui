"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { processElements } from "./utils";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";

export const ItemContext = createContext({
  itemRaw: null,
  item: null,
  reloadItem: () => {},
  loadingItem: false,
  //
  wantGroup: null,
  otherWantGroups: [],
});

export const ItemContextProvider = ({ itemRaw, children }) => {
  /* PAGE CONTEXT **********************************************/
  const { myWants, userId } = useContext(PageContext);
  /* end PAGE CONTEXT */

  const [itemLoaded, setItemLoaded] = useState(itemRaw);

  const [showAsIgnored, setShowAsIgnored] = useState(false);

  /* RELOAD ITEM ***************************/

  const urlParamsItem = useMemo(() => {
    return itemRaw ? [itemRaw.id] : [];
  }, [itemRaw]);

  const afterLoad = useCallback((newItemLoaded) => {
    setItemLoaded(newItemLoaded);
  }, []);

  const [reloadItem, , loadingItem] = useFetch({
    endpoint: "GET_ITEM",
    urlParams: urlParamsItem,
    afterLoad,
  });

  useEffect(() => {
    setItemLoaded(itemRaw);
  }, [itemRaw]);

  /* end RELOAD ITEM ***************************/

  const item = useMemo(() => {
    setShowAsIgnored(false);
    if (!itemLoaded) {
      return null;
    }
    const {
      id,
      title,
      user,
      value,
      elements: elementsRaw,
      comments: commentsCount,
      ban_id,
      reported,
    } = itemLoaded;

    const elements = processElements(elementsRaw);

    console.log("elements", id, elements);

    const { titleLink, publisher, publisherLink, language, status } =
      elements[0];

    const typeNum = elements?.length > 1 ? 0 : elements[0].typeNum;

    const isCombo = !typeNum;

    const statusCombo = (() => {
      if (isCombo) {
        const statusObj = {};

        elements.forEach(({ status }) => {
          statusObj[status] = true;
        });
        return Object.keys(statusObj);

        //return elements.map();
      }
      return null;
    })();

    return {
      id,
      isCombo,
      typeNum,
      //type: getI18Ntext(`element-type-badge-${typeNum}`),
      title,
      titleLink,
      value,
      publisher,
      publisherLink,
      language,
      status,
      statusCombo,
      user: {
        avatar: user?.avatar || "",
        name: `${user?.first_name || ""} ${user?.last_name || ""}`,
        locationId: user?.location || "none",
      },
      isOwned: user.id === userId,
      elements,
      commentsCount,
      ban_id,
      reported,
    };
  }, [itemLoaded, userId]);

  const { wantGroup, otherWantGroups } = useMemo(() => {
    if (!myWants.length || itemRaw?.user?.id === userId) {
      return { wantGroup: null, otherWantGroups: [] };
    }

    const wantsFiltered = myWants.filter((w) => {
      if (w.wants && w.wants.length && itemRaw?.id) {
        return (
          w.wants.filter((itm) => {
            return itm.id === itemRaw.id;
          }).length > 0
        );
      }
    });

    let wantGroup = null;
    const otherWantGroups = [];

    wantsFiltered.forEach((w) => {
      if (w.type === "item") {
        wantGroup = { ...w };
      } else {
        otherWantGroups.push({ ...w });
      }
    });

    return { wantGroup, otherWantGroups };
  }, [itemRaw, myWants, userId]);

  return (
    <ItemContext.Provider
      value={{
        itemRaw: itemLoaded,
        item,
        reloadItem,
        loadingItem,
        showAsIgnored,
        setShowAsIgnored,
        //
        wantGroup,
        otherWantGroups,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
