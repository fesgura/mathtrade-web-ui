"use client";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
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
  const { myWants /*, userId*/ } = useContext(PageContext);
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

  /* ITEM ***************************/
  const item = useMemo(() => {
    setShowAsIgnored(false);
    if (!itemLoaded) {
      return null;
    }
    const {
      id,
      title,
      membership: user,
      copies,
      elements,
      value,
      owner,
      group,
      tags,
      comments: commentsCount,
      ban_id,
      reported,
    } = itemLoaded;

    const isCombo = elements?.length > 1;

    return {
      id,
      title,
      copies,
      elements,
      value,
      isOwned: owner || false, //: user.id === userId,
      group,
      tags,
      commentsCount,
      ban_id,
      reported,
      isCombo,
      user: {
        avatar: user?.avatar || "",
        name: `${user?.first_name || ""} ${user?.last_name || ""}`,
        locationId: user?.location || "none",
      },
      // DEPRECATED
      typeNum: 1,
      titleLink: "",
      publisher: "",
      publisherLink: "",
      language: "",
      status: "",
      statusCombo: "",
      // end DEPRECATED
    };
  }, [itemLoaded]);

  /* end ITEM ***************************/

  const { wantGroup, otherWantGroups } = useMemo(() => {
    if (!myWants.length || itemLoaded?.owner /*itemRaw?.user?.id === userId*/) {
      return { wantGroup: null, otherWantGroups: [] };
    }

    const wantsFiltered = myWants.filter((w) => {
      if (w.wants && w.wants.length && itemLoaded?.id) {
        return (
          w.wants.filter((itm) => {
            return itm.id === itemLoaded.id;
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
  }, [itemLoaded, myWants]);

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
