import useFetch from "@/hooks/useFetch";
import { useCallback, useState, useContext, useMemo, useEffect } from "react";
import { GotoTopContext } from "@/context/goto-top";
import { PageContext } from "@/context/page";
import { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import { normalizeString } from "@/utils";

const asElementList = (elements: unknown = []) =>
  Array.isArray(elements) ? elements : [];

const collectionSearchHaystack = (item: any = {}) => {
  const parts = [
    item.name,
    item.publisher,
    item.year,
    item.game?.primary_name,
    item.game?.bgg_id,
  ];
  const alternates = item.game?.alternate_names;
  if (Array.isArray(alternates)) {
    parts.push(...alternates);
  } else if (alternates) {
    parts.push(alternates);
  }
  return normalizeString(parts.filter(Boolean).join(" "));
};

const useMyCollection = () => {
  const { gotoTop } = useContext(GotoTopContext);

  /* PAGE CONTEXT **********************************************/
  const {
    mathTradeId,
    setPageType,
    reloadValue,
    myItemsInMT,
    setMyItemsInMT,
    setMyCollectionBGGids,
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
    if (Object.keys(filters_collection || {}).length <= 0) {
      updateFilters({ order: "-created_date", page: 1 }, "collection");
    }
  }, [filters_collection, updateFilters]);
  /* end FILTER OPTIONS *********************************************/

  // My Items in MathTrade ********************************************

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT: any) => {
      setMyItemsInMT(newMyItemsInMT);
    },
    [setMyItemsInMT]
  );

  const [, , loadingMyItemsInMT, errorMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    afterLoad: afterLoadMyItems,
    autoLoad: mathTradeId !== null,
    // Without this, forceReloadPage() (called after adding an item to the
    // MT from here) never refetches this list, so a just-offered card kept
    // showing its "Ofertar al Math Trade" button until a hard reload.
    reloadValue,
  });

  // Element id → the Math Trade item that offers it (and how many elements
  // that item has: withdrawing a combo withdraws all of them).
  const offeredByElementId = useMemo(() => {
    return (myItemsInMT || []).reduce(
      (
        map: Record<string, { itemId: number; elementsCount: number }>,
        { id, elements }: any = {}
      ) => {
        (elements || []).forEach(({ element }: any = {}) => {
          if (element?.id != null) {
            map[`${element.id}`] = {
              itemId: id,
              elementsCount: (elements || []).length,
            };
          }
        });
        return map;
      },
      {}
    );
  }, [myItemsInMT]);

  // END My Items in MathTrade ********************************************

  // My Collection ********************************************

  const [elementsInCollectionRaw, setElementsInCollectionRaw] = useState<any[]>(
    []
  );

  const afterLoadMyCollection = useCallback(
    (elements: unknown) => {
      const list = asElementList(elements);
      setElementsInCollectionRaw(list);
      const newMyCollectionBGGids = list.reduce((arr: string[], { game }: any = {}) => {
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
      Object.keys(offeredByElementId).length === 0
    ) {
      return elementsInCollectionRaw;
    }

    return elementsInCollectionRaw.map((element: any = {}) => ({
      ...element,
      // Truthy when offered: which item offers it, for "Retirar".
      offered: offeredByElementId[`${element.id}`] || false,
    }));
  }, [elementsInCollectionRaw, offeredByElementId]);

  const elementList = useMemo(() => {
    const keyword = filters_collection?.keyword || "";
    let elementFiltered = keyword.length
      ? elementsInCollection.filter((item: any = {}) => {
          return collectionSearchHaystack(item).indexOf(normalizeString(keyword)) >= 0;
        })
      : [...elementsInCollection];

    const readyFilter = filters_collection?.ready;
    if (readyFilter === "ready") {
      elementFiltered = elementFiltered.filter((item: any) => item.box_size !== null);
    } else if (readyFilter === "missing") {
      elementFiltered = elementFiltered.filter((item: any) => item.box_size === null);
    }

    const order = filters_collection?.order || "none";
    if (order === "none") {
      return elementFiltered;
    }
    if (order === "-none") {
      return [...elementFiltered].reverse();
    }

    const dir = order.indexOf("-") === 0 ? -1 : 1;
    const key = order.indexOf("-") === 0 ? order.substring(1) : order;

    return [...elementFiltered].sort((a: any, b: any) => {
      return a[key] < b[key] ? -1 * dir : dir;
    });
  }, [elementsInCollection, filters_collection]);

  // END My Collection ********************************************

  // FILTERS ********************************************
  const searchText = (keyword: string = "") => {
    gotoTop();
    updateFilters(
      {
        keyword: keyword || undefined,
      },
      "collection"
    );
  };

  const optionsOrder = useMemo(() => {
    const list = [
      { text: getI18Ntext("element.Date"), value: "created_date" },
      { text: getI18Ntext("element.Name"), value: "name" },
    ];
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
