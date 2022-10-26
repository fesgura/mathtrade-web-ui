import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, ItemService, MathTradeService } from "api";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MyItems = () => {
  const storeData = useSelector(selectStoreData);
  const [listItems, itemList, loadingItemList, errorItemList] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
    afterLoad: () => {
      // const mathtradeStored = storeData?.mathtrade;
      // if (mathtradeStored && mathtradeStored.IamIn) {
      //   setIamInMathTrade(true);
      //   getMyItemsInMathTrade();
      // }
    },
  });

  useEffect(() => {
    const mathtradeStored = storeData?.mathtrade;
    if (mathtradeStored && mathtradeStored.IamIn) {
      listItems();
    }
  }, [storeData]);

  return (
    <PrivateEnv>
      <MyItemsView
        itemList={itemList}
        loading={loadingItemList}
        errors={errorItemList}
        listItems={listItems}
      />
    </PrivateEnv>
  );
};

export default MyItems;
