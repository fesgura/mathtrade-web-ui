import useFetch from "@/hooks/useFetch";
import { useCallback, useState, useContext, useMemo, useEffect } from "react";
import { GotoTopContext } from "@/context/goto-top";
import { PageContext } from "@/context/page";
import { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";

const useMyCollection = () => {
  const { gotoTop } = useContext(GotoTopContext);

  /* PAGE CONTEXT **********************************************/
  const {
    setPageType,
    reloadValue,
    myCollection,
    setMyCollection,
    myItemsInMT,
    setMyItemsInMT,
    setMyCollectionBGGids,
    mathTradeId,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("collection");
  }, [setPageType]);
  /* end PAGE CONTEXT *********************************************/

  /* FILTER OPTIONS **********************************************/
  const filters_collection = useOptions((state) => state.filters_collection);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTER OPTIONS *********************************************/

  // My Collection ********************************************
  const afterLoadMyCollection = useCallback(
    (itemsInMyCollection) => {
      setMyCollection(itemsInMyCollection);
      //
      const newMyCollectionBGGids = [];

      itemsInMyCollection.forEach((item) => {
        item.elements.forEach(({ game }) => {
          if (game && game.bgg_id) {
            newMyCollectionBGGids.push(`${game.bgg_id}`);
          }
        });
      });

      setMyCollectionBGGids(newMyCollectionBGGids);
    },
    [setMyCollection, setMyCollectionBGGids]
  );

  const [, , loading, error] = useFetch({
    endpoint: "GET_MYCOLLECTION_ITEMS",
    initialState: [],
    afterLoad: afterLoadMyCollection,
    autoLoad: true,
    reloadValue,
  });
  // END My Collection ********************************************

  // My Items in MathTrade ********************************************

  /*     const formatMyItems = useCallback((items) => {
      return items.map((item) => {
        return item.id;
      });
    }, []); */

  const [isLoadedItems, setIsLoadedItems] = useState(false);

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
      setMyItemsInMT(newMyItemsInMT);
      setIsLoadedItems(true);
    },
    [setMyItemsInMT]
  );

  useFetch({
    endpoint: "GET_MYITEMS",
    afterLoad: afterLoadMyItems,
    autoLoad: true,
    reloadValue,
  });
  // END My Items in MathTrade ********************************************

  // Order Items ********************************************

  const items = useMemo(() => {
    // SEARCH
    const keyword = filters_collection?.keyword || "";
    const itemsFiltered = keyword.length
      ? (() => {
          const keyLow = normalizeString(keyword);

          return myCollection.filter((item) => {
            return normalizeString(item.title).indexOf(keyLow) >= 0;
          });
        })()
      : myCollection;

    // ORDER
    const order = filters_collection?.order || "none";
    if (order === "none") {
      return itemsFiltered;
    }
    if (order === "-none") {
      return [...itemsFiltered].reverse();
    }

    const dir = order.indexOf("-") === 0 ? -1 : 1;
    const key = order.indexOf("-") === 0 ? order.substring(1) : order;

    if (key === "offered") {
      const offereds = [];
      const notOffereds = [];

      const myItemsInMT_ids = myItemsInMT.map((item) => item.id);

      itemsFiltered.forEach((a) => {
        if (myItemsInMT_ids.indexOf(a.id) >= 0) {
          offereds.push(a);
        } else {
          notOffereds.push(a);
        }
      });
      if (dir > 0) {
        return offereds.concat(notOffereds);
      } else {
        return notOffereds.concat(offereds);
      }
    }

    return [...itemsFiltered].sort((a, b) => {
      return a[key] < b[key] ? -1 * dir : dir;
    });
  }, [myCollection, myItemsInMT, filters_collection]);

  const optionsOrder = useMemo(() => {
    const list = [
      { text: getI18Ntext("element.Date"), value: "none" },
      { text: getI18Ntext("element.Name"), value: "title" },
      { text: getI18Ntext("element.Value"), value: "value" },
    ];

    if (mathTradeId) {
      list.push({
        text: getI18Ntext("element.Offered-NotOffered"),
        value: "offered",
      });
    }
    return list;
  }, [mathTradeId]);
  // END Order Items ********************************************

  const searchText = ({ target }) => {
    gotoTop();
    updateFilters(
      {
        keyword: target.value || undefined,
      },
      "collection"
    );
  };

  return {
    items,
    optionsOrder,
    loading,
    error,
    filters_collection,
    updateFilters,
    isLoadedItems,
    myCollection,
    searchText,
  };
};

export default useMyCollection;
