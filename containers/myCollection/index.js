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
  });

  /* END Math Trade */

  const [listItems, itemList, loadingItemsList, errorItemsList] = useApi({
    promise: myCollectionService.listItems,
    initialState: [],
    // afterLoad: () => {

    // },
  });

  const afterAnyChange = () => {
    listItems();
    if (storeData && storeData.mathtrade) {
      const mathtradeStored = storeData.mathtrade;
      if (mathtradeStored && mathtradeStored.IamIn) {
        getMyItemsInMathTrade();
      }
    }
  };

  useEffect(() => {
    afterAnyChange();
  }, [storeData]);

  return (
    <PrivateEnv>
      <MyCollectionView
        IamInMathTrade={storeData?.mathtrade?.IamIn}
        itemList={loadingItemsList ? [] : itemList}
        itemsInMathTradeList={itemsInMathTradeList}
        loading={loadingItemsList || loadingItemsInMathTradeList}
        errors={errorItemsList || errorItemsInMathTradeList}
        afterAnyChange={afterAnyChange}
      />
    </PrivateEnv>
  );
};

export default MyCollectionContainer;
