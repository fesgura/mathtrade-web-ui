import storage from "utils/storage";
import { getUniqueId } from "utils";

export const order_list = (listToOrder, orderBy, orderByDirection) => {
  if (!orderBy) {
    return listToOrder;
  }

  if (orderBy === "order") {
    listToOrder.list.sort((a, b) => {
      return a.order < b.order ? -1 : 1;
    });
    return listToOrder;
  }

  switch (orderBy) {
    case "value":
      listToOrder.list
        .sort((a, b) => {
          if (a.value === b.value) {
            return a.idkey < b.idkey ? -1 : 1;
          }
          return a.value < b.value ? -1 * orderByDirection : orderByDirection;
        })
        .forEach((elem, k) => {
          elem.order = k;
        });
      return listToOrder;
    case "title":
      listToOrder.list
        .sort((a, b) => {
          if (a.title === b.title) {
            return a.idkey < b.idkey ? -1 : 1;
          }
          return a.title < b.title ? -1 * orderByDirection : orderByDirection;
        })
        .forEach((elem, k) => {
          elem.order = k;
        });
      return listToOrder;
    case "count_want":
      listToOrder.list
        .sort((a, b) => {
          if (a.count_want === b.count_want) {
            return a.idkey < b.idkey ? -1 : 1;
          }
          return a.count_want < b.count_want
            ? -1 * orderByDirection
            : orderByDirection;
        })
        .forEach((elem, k) => {
          elem.order = k;
        });
      return listToOrder;

    default:
      return listToOrder;
  }
};

/**********
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const create_myItemListGrid = (
  myItemList,
  oldMyItemListGrid,
  wantList
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
          order: 0,
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
        order: 0,
      });
    }
  });

  const newGroups = [];

  for (let grpId in newGroupsPool) {
    let valueGroup = 12;
    let isValue = false;
    newGroupsPool[grpId].items.forEach((itm) => {
      if (itm.value && itm.value < valueGroup) {
        valueGroup = itm.value;
        isValue = true;
      }
    });
    newGroupsPool[grpId].value = isValue ? valueGroup : 0;

    newGroups.push(newGroupsPool[grpId]);
  }
  const list = [...newGroups, ...newItems];

  //get Keep variables from OLD MyItemListGrid
  list.forEach((elem) => {
    const oldElem = oldMyItemListGrid.list.find((el) => {
      return el.idkey === elem.idkey;
    });

    if (oldElem) {
      // Keep variables
      if (elem.type === "group") {
        elem.extended = oldElem.extended;
      }
      elem.order = oldElem.order;
    }
  });

  return order_list({ list, version: myItemList.version }, "order");
};

/**********
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

export const create_wantListGrid = (wantList, oldWantListGrid) => {
  if (!wantList) {
    return [];
  }
  const store = storage.get();

  const myUserId = store?.user?.data?.id;

  const list = wantList.list.map((uwg) => {
    const { availables, bgg_id, dup_protection, id, items, name, tags, wants } =
      uwg;

    const itemsList = [...wants, ...availables];
    // const itemsList = type === "game" ? [...wants, ...availables] : [...wants];

    let type = "item";

    // if (itemsList.length > 1) {

    // }

    if (bgg_id) {
      type = "game";
    } else {
      if (tags.length) {
        type = "group";
      }
    }

    const value = (() => {
      let valMax = 12;
      let isValue = false;
      itemsList.forEach((itm) => {
        if (itm.value && itm.value < valMax) {
          valMax = itm.value;
          isValue = true;
        }
      });
      return isValue ? valMax : 0;
    })();

    const itemsListFilteredByUser = itemsList.filter((itm) => {
      return itm.user.id !== myUserId;
    });

    return {
      id,
      idkey: `${id}-want`,
      version: getUniqueId(),
      obj: {
        want_id: id,
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
      title: name,
      value,
      type, // item, group, game
      items: itemsListFilteredByUser,
      extended: false,
      count_want: items.length,
      order: 0,
    };
  });

  //get Keep variables from OLD MyItemListGrid
  list.forEach((elem) => {
    const oldElem = oldWantListGrid.list.find((el) => {
      return el.idkey === elem.idkey;
    });

    if (oldElem) {
      // Keep variables
      if (elem.type === "game" || elem.type === "group") {
        elem.extended = oldElem.extended;
      }
      elem.order = oldElem.order;
    }
  });

  return order_list({ list, version: wantList.version }, "order");
};
