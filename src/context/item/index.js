"use client";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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
    console.log("DEBUG itemLoaded:", itemLoaded); // DEBUG
    setShowAsIgnored(false);
    if (!itemLoaded) {
      return null;
    }
    const { id, owner, elements, value, matched_bgg_id, user } = itemLoaded;
    const isCombo = elements?.length > 1;

    // const isSameBGGId = (() => { ... })();
    const isSameBGGId = owner ? false : matched_bgg_id && matched_bgg_id > 0;

    return {
      itemLoaded,
      isCombo,
      isSameBGGId,
      user,
      id,
      elements,
      value,
      owner,
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
      {itemRaw.elements && itemRaw.elements.length > 0 ? (
        children
      ) : (
        <article className="bg-item-200 border border-item-300 text-center p-3 text-balance text-red-800 mb-2 text-xs">
          <I18N id="error.item.offer.notFound" />
          <br /> <strong>Ejemplar Id: {itemRaw.id}</strong>
        </article>
      )}
    </ItemContext.Provider>
  );
};
