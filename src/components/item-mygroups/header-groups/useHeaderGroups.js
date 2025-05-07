import { useCallback, useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import useFetch from "@/hooks/useFetch";

const useHeaderGroups = () => {
  /* PAGE CONTEXT **********************************************/
  const { myGroups, setMyGroups, canI } = useContext(PageContext);
  /* end PAGE CONTEXT *********************************************/

  /* ITEM CONTEXT **********************************************/
  const { item } = useContext(ItemContext);
  const { id: itemId } = item;
  /* end ITEM CONTEXT *********************************************/

  const [visible, setVisible] = useState(false);

  const { groupAdded, groupsToAdd } = useMemo(() => {
    let groupsAdded = [];
    let groupsToAdd = [];

    myGroups.forEach((group) => {
      if (group.item_ids.indexOf(itemId) >= 0) {
        groupsAdded.push(group);
      } else {
        groupsToAdd.push(group);
      }
    });

    groupsToAdd.sort((a, b) => {
      return a.item_ids.length > b.item_ids.length ? -1 : 1;
    });

    return {
      groupAdded: groupsAdded[0] || null,
      groupsToAdd,
    };
  }, [myGroups, itemId]);

  // MY GROUPS ********************************************
  const afterLoadMyGroups = useCallback(
    (newGroups) => {
      setMyGroups(newGroups);
    },
    [setMyGroups]
  );
  const [loadMyGroups, , loadingMyGropus, errorGropusMyGropus] = useFetch({
    endpoint: "GET_MYITEM_GROUPS",
    initialState: [],
    afterLoad: afterLoadMyGroups,
  });
  // end MY GROUPS ********************************************

  /* PUT GROUP ************************************************/

  const afterLoadPutMyItemGroup = useCallback(() => {
    loadMyGroups();
  }, [loadMyGroups]);

  const [putMyItemGroup, , loading] = useFetch({
    endpoint: "PUT_MYITEM_GROUPS",
    method: "PUT",
    afterLoad: afterLoadPutMyItemGroup,
  });
  /* end PUT GROUP ************************************************/

  const onAdd = useCallback(
    (groupToAdd) => {
      const groupToAddClone = { ...groupToAdd };
      const { id, item_ids } = groupToAdd;
      delete groupToAddClone.id;
      delete groupToAddClone.item_ids;

      const new_item_ids = [...item_ids].concat([itemId]);

      putMyItemGroup({
        urlParams: [id],
        params: {
          ...groupToAddClone,
          item_ids: new_item_ids,
        },
      });
    },
    [putMyItemGroup, itemId]
  );

  const onDelete = useCallback(() => {
    const groupAddedClone = { ...groupAdded };
    const { id, item_ids } = groupAdded;

    delete groupAddedClone.id;

    const new_item_ids = [...item_ids].filter((itmId) => {
      return itmId !== itemId;
    });

    putMyItemGroup({
      urlParams: [id],
      params: {
        ...groupAddedClone,
        item_ids: new_item_ids,
      },
    });
  }, [putMyItemGroup, groupAdded, itemId]);

  return {
    visible,
    setVisible,
    groupAdded,
    groupsToAdd,
    onAdd,
    onDelete,
    loading,
    canIEdit: canI.want || canI.offer,
  };
};

export default useHeaderGroups;
