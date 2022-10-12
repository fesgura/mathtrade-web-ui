import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, ItemService, MathTradeService } from "api";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MyItems = () => {
  const storeData = useSelector(selectStoreData);
  const [
    listItemGroups,
    itemGroupList,
    loadingItemGroupList,
    errorItemGroupList,
  ] = useApi({
    promise: MathTradeService.listMyItemGroups,
    initialState: [],
    afterLoad: () => {
      // const mathtradeStored = storeData?.mathtrade;
      // if (mathtradeStored && mathtradeStored.IamIn) {
      //   setIamInMathTrade(true);
      //   const mathTradeId = mathtradeStored.data.id;
      //   getMyItemsInMathTrade({ mathTradeId });
      // }
    },
  });

  useEffect(() => {
    const mathtradeStored = storeData?.mathtrade;
    if (mathtradeStored && mathtradeStored.IamIn) {
      const mathTradeId = mathtradeStored.data.id;
      listItemGroups({ mathTradeId });
    }
  }, [storeData]);

  //console.log(itemGroupList);

  return (
    <PrivateEnv>
      <MyItemsView />
    </PrivateEnv>
  );
};

export default MyItems;
