import storage from "utils/storage";

export const filterEmptyWants = (wantList) => {
  if (!wantList || !wantList.length) {
    return [];
  }

  const store = storage.get();
  const myUserId = store?.user?.data?.id;

  return wantList.filter((uwg) => {
    const allItems = [...uwg.wants, ...uwg.availables];

    const allItemsNoOwned = allItems.filter((itm) => {
      return itm.user.id !== myUserId;
    });

    return allItemsNoOwned.length > 0;
  });
};
