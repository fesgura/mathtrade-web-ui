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
    //myCollection,
    //setMyCollection,
    //myItemsInMT,
    //setMyItemsInMT,
    setMyCollectionBGGids,
    //mathTradeId,
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

  const [elementsInCollection, setElementsInCollection] = useState([]);

  const afterLoadMyCollection = useCallback(
    (elements) => {
      setElementsInCollection(elements);
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

  const [, , loading, error] = useFetch({
    endpoint: "GET_MYCOLLECTION_ELEMENTS",
    initialState: [],
    afterLoad: afterLoadMyCollection,
    autoLoad: true,
    reloadValue,
  });

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

    return [...elementFiltered].sort((a, b) => {
      return a[key] < b[key] ? -1 * dir : dir;
    });
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
      { text: getI18Ntext("element.Date"), value: "none" },
      { text: getI18Ntext("element.Name"), value: "title" },
      { text: getI18Ntext("element.Value"), value: "value" },
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
    loading,
    error,
    filters_collection,
    searchText,
    optionsOrder,
  };
};

export default useMyCollection;
