const getWantGroupsByItem = (item, wantList) => {
  const list = [];

  wantList.list.forEach((wg) => {
    wg.items.forEach((itm) => {
      if (itm.id === item.id) {
        list.push(wg);
      }
    });
  });
  return list;
};

export const getMyItemGroups = (myItemList, wantList) => {
  if (
    !myItemList ||
    !wantList ||
    !myItemList?.list.length ||
    !wantList?.list.length
  ) {
    return [];
  }

  const list = [];

  myItemList.list.forEach((myItem) => {
    list.push({
      id: myItem.id,
      item: myItem,
      wantGroups: getWantGroupsByItem(myItem, wantList),
    });
  });

  // list.sort((a, b) => {
  //   return a.wantGroups.length > b.wantGroups.length ? -1 : 1;
  // });

  return list;
};

export const orderGroups = (groups, value, desc) => {
  const newGroups = [...groups];

  const dir = desc ? 1 : -1;

  switch (value) {
    case "title":
      newGroups.sort((a, b) => {
        return a.item.title.toLowerCase() > b.item.title.toLowerCase()
          ? -1 * dir
          : dir;
      });
      break;
    case "value":
      newGroups.sort((a, b) => {
        return parseFloat(a.item.value) > parseFloat(b.item.value)
          ? -1 * dir
          : dir;
      });
      break;
    case "count_want":
      newGroups.sort((a, b) => {
        return a.wantGroups.length > b.wantGroups.length ? -1 * dir : dir;
      });
      break;
    default:
    //
  }
  return newGroups;
};
