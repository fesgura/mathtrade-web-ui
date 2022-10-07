import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/mathtrade/myItems";
import { useApi, ItemService, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

const MyItems = () => {
  const [
    listItemGroups,
    itemGroupList,
    loadingItemGroupList,
    errorItemGroupList,
  ] = useApi({
    promise: MathTradeService.listMyItemGroups,
    initialState: [],
    afterLoad: () => {
      // const mathtradeStored = getMathtradeStored();
      // if (mathtradeStored && mathtradeStored.IamIn) {
      //   setIamInMathTrade(true);
      //   const mathTradeId = mathtradeStored.data.id;
      //   getMyItemsInMathTrade({ mathTradeId });
      // }
    },
  });

  useEffect(() => {
    const mathtradeStored = getMathtradeStored();
    if (mathtradeStored && mathtradeStored.IamIn) {
      const mathTradeId = mathtradeStored.data.id;
      listItemGroups({ mathTradeId });
    }
  }, []);

  //console.log(itemGroupList);

  return (
    <PrivateEnv>
      <MyItemsView />
    </PrivateEnv>
  );
};

export default MyItems;
