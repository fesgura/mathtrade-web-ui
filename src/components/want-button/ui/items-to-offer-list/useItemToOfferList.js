import { useCallback, useContext, useMemo, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import { WantGroupContext } from "@/context/wantGroup";
import useFetch from "@/hooks/useFetch";
import { useOptions } from "@/store";

const useItemsToOfferList = () => {
  /* OPTIONS */
  const options = useOptions((state) => state.options);
  const updateOptions = useOptions((state) => state.updateOptions);
  /* end OPTIONS */

  /* PAGE CONTEXT **********************************************/
  const {
    myItemsInMT_forWants,
    setMyItemsInMT_forWants,
    myGroups_forWants,
    setMyGroups_forWants,
  } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* WANTGROUP CONTEXT **********************************************/
  const { wantGroup, setItemsOfferList } = useContext(WantGroupContext);
  /* end WANTGROUP CONTEXT **********************************************/

  // My Items in MathTrade ********************************************
  const [myItemsLoaded, setMyItemsLoaded] = useState(false);

  const afterLoadMyItems = useCallback(
    (newMyItemsInMT) => {
      setMyItemsInMT_forWants(newMyItemsInMT);
    },
    [setMyItemsInMT_forWants]
  );

  const [loadMyItemsInMT, , loadingMyItemsInMT, errorMyItemsInMT] = useFetch({
    endpoint: "GET_MYITEMS",
    initialState: [],
    afterLoad: afterLoadMyItems,
  });

  useEffect(() => {
    if (!myItemsLoaded && !myItemsInMT_forWants.length) {
      loadMyItemsInMT();
      setMyItemsLoaded(true);
    }
  }, [myItemsLoaded, myItemsInMT_forWants, loadMyItemsInMT]);
  // END My Items in MathTrade ********************************************

  // MY GROUPS ********************************************
  const afterLoadMyGroups = useCallback(
    (newGroups) => {
      setMyGroups_forWants(newGroups);
    },
    [setMyGroups_forWants]
  );
  const [loadMyGropus, , loadingMyGropus, errorGropusMyGropus] = useFetch({
    endpoint: "GET_MYITEM_GROUPS",
    initialState: [],
    afterLoad: afterLoadMyGroups,
    autoLoad: true,
  });
  /*   useEffect(() => {
    if (!myGroups_forWants.length) {
      loadMyGropus();
    }
  }, [myGroups_forWants, loadMyGropus]); */
  // end MY GROUPS ********************************************

  const list = useMemo(() => {
    const groupObj = myGroups_forWants.reduce((obj, v) => {
      const { id, name, color, item_ids } = v;
      if (item_ids.length) {
        obj[id] = { isGroup: true, id, name, color, items: [] };
      }

      return obj;
    }, {});

    const itemList = [];

    myItemsInMT_forWants.forEach((itm) => {
      const { group } = itm;

      if (group && groupObj[group.id]) {
        groupObj[group.id].items.push(itm);
      } else {
        itemList.push(itm);
      }
    });

    return Object.values(groupObj).concat(itemList);
  }, [myItemsInMT_forWants, myGroups_forWants]);

  /*************************** */

  useEffect(() => {
    if (myItemsInMT_forWants.length) {
      /*
      const itemIds = wantGroup
        ? wantGroup.items.map(({ id }) => {
            return id;
          })
        : [];
*/
      const itemIds = [...(wantGroup?.items || [])];

      const newStatusSelected = myItemsInMT_forWants.reduce((obj, { id }) => {
        obj[id] = itemIds.indexOf(id) >= 0;
        return obj;
      }, {});
      setItemsOfferList(newStatusSelected);
    }
  }, [wantGroup, myItemsInMT_forWants, setItemsOfferList]);

  /****************************/
  const [showAll, setShowAll] = useState(
    options?.showAllItemOfferToWant || false
  );

  const toggleShowAll = useCallback(() => {
    setShowAll((v) => !v);
  }, []);

  useEffect(() => {
    updateOptions({
      showAllItemOfferToWant: showAll,
    });
  }, [updateOptions, showAll]);

  return {
    list,
    loading: loadingMyItemsInMT || loadingMyGropus,
    error: errorMyItemsInMT || errorGropusMyGropus,
    showAll,
    toggleShowAll,
  };
};

export default useItemsToOfferList;
