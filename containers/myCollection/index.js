import { useEffect } from "react";
import PrivateEnv from "environments/private";
import MyCollectionView from "views/myCollection";
import { useApi, ItemService, MathTradeService } from "api";
import { useSelector } from "react-redux";
import { selectStoreData } from "store/slices/storeData";

const MyCollectionContainer = () => {
  const storeData = useSelector(selectStoreData);
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
      const mathtradeStored = storeData?.mathtrade;
      if (mathtradeStored && mathtradeStored.IamIn) {
        getMyItemsInMathTrade();
      }
    },
  });

  useEffect(() => {
    listItems();
  }, []);

  return (
    <PrivateEnv>
      <MyCollectionView
        IamInMathTrade={storeData?.mathtrade?.IamIn}
        itemList={loadingItemsList ? [] : itemList}
        itemsInMathTradeList={itemsInMathTradeList}
        loading={loadingItemsList || loadingItemsInMathTradeList}
        errors={errorItemsList || errorItemsInMathTradeList}
        listItems={listItems}
      />
    </PrivateEnv>
  );
};

export default MyCollectionContainer;
