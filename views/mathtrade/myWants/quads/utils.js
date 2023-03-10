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

  list.sort((a, b) => {
    return a.wantGroups.length > b.wantGroups.length ? -1 : 1;
  });

  return list;
};
