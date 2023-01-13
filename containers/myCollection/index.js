import { useEffect } from "react";
import PrivateEnv from "environments/private";
import MyCollectionView from "views/myCollection";
import { useApi, myCollectionService, MathTradeService } from "api_serv";
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
    promise: myCollectionService.listItems,
    initialState: [],
    // afterLoad: () => {

    // },
  });

  useEffect(() => {
    listItems();
  }, []);

  useEffect(() => {
    if (storeData && storeData.mathtrade) {
      const mathtradeStored = storeData.mathtrade;
      if (mathtradeStored && mathtradeStored.IamIn) {
        getMyItemsInMathTrade();
      }
    }
  }, [storeData]);

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
