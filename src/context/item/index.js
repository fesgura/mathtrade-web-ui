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
import I18N from "@/i18n";

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
  const { myWants /* myItemsInMT_forWants , userId*/ } =
    useContext(PageContext);
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
      matched_bgg_id,
    } = itemLoaded;

    const isCombo = elements?.length > 1;

    // const isSameBGGId = (() => {
    //   let isFoundedBGGId = false;

    //   if (owner) {
    //     return false;
    //   }

    //   const bggIdList = elements.map(({ element }) => {
    //     return `${element?.game?.bgg_id}`;
    //   });

    //   myItemsInMT_forWants.forEach(({ elements }) => {
    //     elements.forEach(({ element }) => {
    //       const bggId = `${element?.game?.bgg_id}`;
    //       if (bggIdList.includes(bggId)) {
    //         isFoundedBGGId = true;
    //       }
    //     });
    //   });

    //   return isFoundedBGGId;
    // })();

    const isSameBGGId = owner ? false : matched_bgg_id && matched_bgg_id > 0;

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
      isSameBGGId,
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
      {item.elements && item.elements.length > 0 ? (
        children
      ) : (
        <article className="bg-item-200 border border-item-300 text-center p-3 text-balance text-red-800 mb-2 text-xs">
          <I18N id="error.item.offer.notFound" />
          <br /> <strong>Ejemplar Id: {item.id}</strong>
        </article>
      )}
    </ItemContext.Provider>
  );
};
