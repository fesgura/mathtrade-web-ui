import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MyItemsView from "views/my-items";
import { useApi, ItemService, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

const MyItems = () => {
  const [IamInMathTrade, setIamInMathTrade] = useState(false);
  /* Math Trade */
  const [
    getMyItemsInMathTrade,
    itemsInMathTradeList,
    loadingItemsInMathTradeList,
    errorItemsInMathTradeList,
  ] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
    // afterLoad: (data) => {
    //   console.log("data", data);
    // },
  });

  /* END Math Trade */

  const [listItems, itemList, loadingItemsList, errorItemsList] = useApi({
    promise: ItemService.listMyItems,
    initialState: [],
    afterLoad: () => {
      const mathtradeStored = getMathtradeStored();
      if (mathtradeStored && mathtradeStored.IamIn) {
        setIamInMathTrade(true);
        const mathTradeId = mathtradeStored.data.id;
        getMyItemsInMathTrade({ mathTradeId });
      }
    },
  });

  useEffect(() => {
    listItems();
  }, []);

  return (
    <PrivateEnv>
      <MyItemsView
        IamInMathTrade={IamInMathTrade}
        itemList={loadingItemsList ? [] : itemList}
        itemsInMathTradeList={itemsInMathTradeList}
        loading={loadingItemsList || loadingItemsInMathTradeList}
        errors={errorItemsList || errorItemsInMathTradeList}
        listItems={listItems}
      />
    </PrivateEnv>
  );
};

export default MyItems;
