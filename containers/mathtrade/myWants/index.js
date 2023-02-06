import { useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import { wantsFromAPItoWantList, myItemListFromAPItoMyItemList } from "utils";
import PrivateEnv from "environments/private";
import MyWantsView from "views/mathtrade/myWants";

const MyWants = () => {
  const [getMyWants, myWantsList, loadingMyWants, errorsMyWants] = useApi({
    promise: MathTradeService.getWants,
    initialState: [],
    //format: wantsFromAPItoWantList,
  });
  const [getMyItems, myItemList, loadingMyItems, errorsMyItems] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: [],
    //format: myItemListFromAPItoMyItemList,
  });

  const [deleteWant, , deleteLoading, deleteErrors] = useApi({
    promise: MathTradeService.deleteWant,
  });

  useEffect(() => {
    getMyItems();
    getMyWants();
    // deleteWant({ id: 28 });
  }, []);

  return (
    <PrivateEnv>
      <MyWantsView
        wantListFromAPI={myWantsList}
        myItemListFromAPI={myItemList}
        loading={loadingMyWants || loadingMyItems}
        afterAnyChange={() => {
          getMyWants();
        }}
        errors={errorsMyWants || errorsMyItems}
      />
    </PrivateEnv>
  );
};

export default MyWants;
