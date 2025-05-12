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
    mathTradeId,
    setPageType,
    reloadValue,
    //myCollection,
    //setMyCollection,
    myItemsInMT,
    setMyItemsInMT,
    setMyCollectionBGGids,
    //mathTradeId,
    canI,
  } = useContext(PageContext);

  useEffect(() => {
    setPageType("collection");
  }, [setPageType]);
  /* end PAGE CONTEXT *********************************************/

  /* FILTER OPTIONS **********************************************/
  const filters_collection = useOptions((state) => state.filters_collection);
  const updateFilters = useOptions((state) => state.updateFilters);

  useEffect(() => {
    if (Object.keys(filters_collection).length <= 0) {
      updateFilters({ order: "-created_date", page: 1 }, "collection");
    }
  }, [filters_collection, updateFilters]);
  /* end FILTER OPTIONS *********************************************/

  // My Items in MathTrade ********************************************

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
      setMyItemsInMT(newMyItemsInMT);
    },
    [setMyItemsInMT]
  );

  const [, , loadingMyItemsInMT, errorMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    afterLoad: afterLoadMyItems,
    autoLoad: mathTradeId !== null,
  });

  const elementIdListOffered = useMemo(() => {
    return myItemsInMT.reduce((arr, { elements }) => {
      elements.forEach(({ element }) => {
        arr.push(`${element.id}`);
      });
      return arr;
    }, []);
  }, [myItemsInMT]);

  // END My Items in MathTrade ********************************************

  // My Collection ********************************************

  const [elementsInCollectionRaw, setElementsInCollectionRaw] = useState([]);

  const afterLoadMyCollection = useCallback(
    (elements) => {
      setElementsInCollectionRaw(elements);
      //
      const newMyCollectionBGGids = elements.reduce((arr, { game }) => {
        if (game && game.bgg_id) {
          arr.push(`${game.bgg_id}`);
        }
        return arr;
      }, []);

      setMyCollectionBGGids(newMyCollectionBGGids);
    },
    [setMyCollectionBGGids]
  );

  const [, , loadingCollection, errorCollection] = useFetch({
    endpoint: "GET_MYCOLLECTION_ELEMENTS",
    initialState: [],
    afterLoad: afterLoadMyCollection,
    autoLoad: true,
    reloadValue,
  });

  const elementsInCollection = useMemo(() => {
    if (
      elementsInCollectionRaw.length === 0 ||
      elementIdListOffered.length === 0
    ) {
      return elementsInCollectionRaw;
    }

    return elementsInCollectionRaw.map((element) => {
      const elementOffered = elementIdListOffered.indexOf(`${element.id}`) >= 0;
      return {
        ...element,
        offered: elementOffered,
      };
    });
  }, [elementsInCollectionRaw, elementIdListOffered]);

  const elementList = useMemo(() => {
    // SEARCH
    const keyword = filters_collection?.keyword || "";
    const elementFiltered = keyword.length
      ? (() => {
          const keyLow = normalizeString(keyword);

          return elementsInCollection.filter((item) => {
            return normalizeString(item.name).indexOf(keyLow) >= 0;
          });
        })()
      : [...elementsInCollection];

    // ORDER
    const order = filters_collection?.order || "none";
    if (order === "none") {
      return elementFiltered;
    }
    if (order === "-none") {
      return [...elementFiltered].reverse();
    }

    const dir = order.indexOf("-") === 0 ? -1 : 1;
    const key = order.indexOf("-") === 0 ? order.substring(1) : order;

    return [...elementFiltered].sort((a, b) => {
      return a[key] < b[key] ? -1 * dir : dir;
    });

    // if (key === "offered") {
    //   const offereds = [];
    //   const notOffereds = [];

    //   const myItemsInMT_ids = myItemsInMT.map((item) => item.id);

    //   itemsFiltered.forEach((a) => {
    //     if (myItemsInMT_ids.indexOf(a.id) >= 0) {
    //       offereds.push(a);
    //     } else {
    //       notOffereds.push(a);
    //     }
    //   });
    //   if (dir > 0) {
    //     return offereds.concat(notOffereds);
    //   } else {
    //     return notOffereds.concat(offereds);
    //   }
    // }
  }, [elementsInCollection, filters_collection]);

  // END My Collection ********************************************

  // FILTERS ********************************************
  const searchText = ({ target }) => {
    gotoTop();
    updateFilters(
      {
        keyword: target.value || undefined,
      },
      "collection"
    );
  };

  const optionsOrder = useMemo(() => {
    const list = [
      { text: getI18Ntext("element.Date"), value: "created_date" },
      { text: getI18Ntext("element.Name"), value: "name" },
    ];

    // if (mathTradeId) {
    //   list.push({
    //     text: getI18Ntext("element.Offered-NotOffered"),
    //     value: "offered",
    //   });
    // }
    return list;
  }, []);
  // end FILTERS ********************************************

  return {
    elementList,
    loading: loadingMyItemsInMT || loadingCollection,
    error: errorMyItemsInMT || errorCollection,
    filters_collection,
    searchText,
    optionsOrder,
    canI,
  };
};

export default useMyCollection;
