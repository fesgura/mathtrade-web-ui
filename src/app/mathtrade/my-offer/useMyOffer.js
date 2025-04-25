import useFetch from "@/hooks/useFetch";
import { useCallback, useContext, useMemo, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";
import { NEW_USER_OFFER_LIMIT } from "@/config/newUserOfferLimit";

const useMyOffer = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    setPageType,
    reloadValue,
    //
    myItemsInMT,
    setMyItemsInMT,
    setMyCollection,
    myGroups,
    setMyGroups,
    //
    isNewUser,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("myOffer");
  }, [setPageType]);
  /* end PAGE CONTEXT *********************************************/

  /* FILTER OPTIONS **********************************************/
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  /* end FILTER OPTIONS *********************************************/

  // My Collection ********************************************
  const afterLoadMyCollection = useCallback(
    (elements) => {
      setMyCollection(elements);
    },
    [setMyCollection]
  );

  const [, , loadingMyCollection, errorMyCollection] = useFetch({
    endpoint: "GET_MYCOLLECTION_ELEMENTS",
    initialState: [],
    afterLoad: afterLoadMyCollection,
    autoLoad: true,
  });
  // END My Collection ********************************************

  // My Items in MathTrade ********************************************

  const [isLoaded, setIsLoaded] = useState(false);

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
      setIsLoaded(true);
      setMyItemsInMT(newMyItemsInMT);
    },
    [setMyItemsInMT]
  );

  const [, , loadingMyItemsInMT, errorMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    afterLoad: afterLoadMyItems,
    autoLoad: true,
    reloadValue,
  });
  // END My Items in MathTrade ********************************************

  // MY GROUPS ********************************************
  const afterLoadMyGroups = useCallback(
    (newGroups) => {
      setMyGroups(newGroups);
    },
    [setMyGroups]
  );
  const [, , loadingMyGropus, errorGropusMyGropus] = useFetch({
    endpoint: "GET_MYITEM_GROUPS",
    initialState: [],
    afterLoad: afterLoadMyGroups,
    autoLoad: true,
    // reloadValue,
  });
  // end MY GROUPS ********************************************

  // Order Items ********************************************

  const items = useMemo(() => {
    // GROUP_ID
    const groupId = filters_myoffer?.groupId || null;

    const itemsByGroup = (() => {
      if (!groupId || !myGroups.length) {
        return [...myItemsInMT];
      }

      const { item_ids } = myGroups.filter((g) => g.id === groupId)[0];

      return [...myItemsInMT].filter((item) => {
        return item_ids.indexOf(item.id) >= 0;
      });
    })();

    // SEARCH
    const keyword = filters_myoffer?.keyword || "";
    const itemsFiltered = keyword.length
      ? (() => {
          const keyLow = normalizeString(keyword);

          return itemsByGroup.filter((item) => {
            return normalizeString(item.title).indexOf(keyLow) >= 0;
          });
        })()
      : itemsByGroup;

    // ORDER
    const order = filters_myoffer?.order || "none";
    if (order === "none") {
      return itemsFiltered;
    }
    if (order === "-none") {
      return [...itemsFiltered].reverse();
    }

    const dir = order.indexOf("-") === 0 ? -1 : 1;
    const key = order.indexOf("-") === 0 ? order.substring(1) : order;

    return [...itemsFiltered].sort((a, b) => {
      return a[key] < b[key] ? -1 * dir : dir;
    });
  }, [myItemsInMT, myGroups, filters_myoffer]);

  // END Order Items ********************************************

  return {
    isLoaded,
    items,
    loading: loadingMyItemsInMT || loadingMyCollection || loadingMyGropus,
    error: errorMyItemsInMT || errorMyCollection || errorGropusMyGropus,
    canAddNewElement: !isNewUser
      ? true
      : myItemsInMT.length < NEW_USER_OFFER_LIMIT,
  };
};

export default useMyOffer;
