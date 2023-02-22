import storage from "utils/storage";

export const order_list = (listToOrder, orderBy, orderByDirection) => {
  if (!orderBy) {
    return listToOrder;
  }

  switch (orderBy) {
    case "value":
      listToOrder.list.sort((a, b) => {
        return a.value < b.value ? -1 * orderByDirection : orderByDirection;
      });
      return listToOrder;
    case "title":
      listToOrder.list.sort((a, b) => {
        return a.title < b.title ? -1 * orderByDirection : orderByDirection;
      });
      return listToOrder;
    case "count_want":
      listToOrder.list.sort((a, b) => {
        return a.count_want < b.count_want
          ? -1 * orderByDirection
          : orderByDirection;
      });
      return listToOrder;

    default:
      return listToOrder;
  }
};

export const create_myItemListGrid = (
  myItemList,
  oldMyItemListGrid,
  wantList,
  orderBy,
  orderByDirection
) => {
  if (!myItemList) {
    return [];
  }

  const newGroupsPool = {};
  const newItems = [];

  myItemList.list.forEach((item) => {
    let item_count_want = 0;

    wantList.list.forEach((uwg) => {
      const itm_count_arr = uwg.items.filter((uwg_itm) => {
        return uwg_itm.id === item.id;
      });
      if (itm_count_arr.length) {
        item_count_want++;
      }
    });

    if (item.groups.length) {
      const groupId = item.groups[0].id;
      if (!newGroupsPool[groupId]) {
        newGroupsPool[groupId] = {
          groupId,
          idkey: `${groupId}-group`,
          type: "group",
          title: item.groups[0].name,
          color: item.groups[0].color,
          items: [item],
          value: 0,
          extended: false,
          count_want: item_count_want,
        };
      } else {
        newGroupsPool[groupId].count_want += item_count_want;
        newGroupsPool[groupId].items.push(item);
      }
    } else {
      newItems.push({
        idkey: `${item.id}-item`,
        type: "item",
        title: item.title,
        item,
        value: item.value || 0,
        count_want: item_count_want,
      });
    }
  });

  const newGroups = [];

  for (let grpId in newGroupsPool) {
    let valueGroup = 10;
    newGroupsPool[grpId].items.forEach((itm) => {
      if (itm.value < valueGroup) {
        valueGroup = itm.value;
      }
    });
    newGroupsPool[grpId].value = valueGroup;

    newGroups.push(newGroupsPool[grpId]);
  }
  const list = [...newGroups, ...newItems];

  //get Keep variables from OLD MyItemListGrid
  list.forEach((elem) => {
    if (elem.type === "group") {
      const oldElem = oldMyItemListGrid.list.find((el) => {
        return el.idkey === elem.idkey;
      });

      if (oldElem) {
        // Keep variables
        elem.extended = oldElem.extended;
      }
    }
  });

  return order_list(
    { list, version: myItemList.version },
    orderBy,
    orderByDirection
  );
};

export const create_wantListGrid = (
  wantList,
  oldWantListGrid,
  orderBy,
  orderByDirection
) => {
  if (!wantList) {
    return [];
  }
  const store = storage.get();

  const myUserId = store?.user?.data?.id;

  const list = wantList.list.map((uwg) => {
    const { availables, bgg_id, dup_protection, id, items, name, tags, wants } =
      uwg;

    let type = "item";

    if (!bgg_id) {
      type = wants.length === 1 ? "item" : "group";
    } else {
      type = "game";
    }

    const itemsList = type === "game" ? [...wants, ...availables] : [...wants];

    const value = (() => {
      let valMax = 10;
      wants.forEach((itm) => {
        if (itm.value < valMax) {
          valMax = itm.value;
        }
      });
      return valMax;
    })();

    const itemsListFilteredByUser = itemsList.filter((itm) => {
      return itm.user.id !== myUserId;
    });

    return {
      id,
      idkey: `${id}-want`,
      obj: {
        bgg_id,
        name: name,
        dup_protection,
        want_ids: wants.map((want) => {
          return want.id;
        }),
        item_ids: items.map((item) => {
          return item.id;
        }),
        //tags,
      },
      title: name + "(" + id + ")",
      value,
      type, // item, group, game
      items: itemsListFilteredByUser,
      extended: false,
      count_want: items.length,
    };
  });

  //get Keep variables from OLD MyItemListGrid
  list.forEach((elem) => {
    if (elem.type === "game" || elem.type === "group") {
      const oldElem = oldWantListGrid.list.find((el) => {
        return el.idkey === elem.idkey;
      });

      if (oldElem) {
        // Keep variables
        elem.extended = oldElem.extended;
      }
    }
  });

  return order_list(
    { list, version: wantList.version },
    orderBy,
    orderByDirection
  );
};
