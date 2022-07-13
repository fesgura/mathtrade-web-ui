import { useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/my-items";
import { useApi, ItemService } from "api";

const MyItems = () => {
  const [listItems, itemList, loadingItemsList, errorItemsList] = useApi({
    promise: ItemService.list,
    initialState: [],
  });

  useEffect(() => {
    listItems();
  }, []);

  return (
    <PrivateEnv>
      <MyItemsView
        itemList={loadingItemsList ? [] : itemList}
        loading={loadingItemsList}
        errors={errorItemsList}
        listItems={listItems}
      />
    </PrivateEnv>
  );
};

export default MyItems;
