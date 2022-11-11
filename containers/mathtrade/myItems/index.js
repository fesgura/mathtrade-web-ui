import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, MathTradeService } from "api";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MyItems = () => {
  const storeData = useSelector(selectStoreData);

  const [listItems, itemList, loadingItemList, errorItemList] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
  });

  const [listGroups, groups, loadingGroups, errorGroups] = useApi({
    promise: MathTradeService.listMyItemGroups,
    initialState: [],
  });

  useEffect(() => {
    const mathtradeStored = storeData?.mathtrade;
    if (mathtradeStored && mathtradeStored.IamIn) {
      listItems();
      listGroups();
    }
  }, [storeData]);

  return (
    <PrivateEnv>
      <MyItemsView
        itemList={itemList}
        groups={groups}
        errorGroups={errorGroups}
        loading={loadingItemList || loadingGroups}
        errors={errorItemList}
        afterAnyChange={() => {
          listItems();
          listGroups();
        }}
      />
    </PrivateEnv>
  );
};

export default MyItems;
