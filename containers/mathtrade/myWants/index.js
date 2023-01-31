import { useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import { getUniqueId, formatUserWantGroup } from "utils";
import PrivateEnv from "environments/private";
import MyWantsView from "views/mathtrade/myWants";

const MyWants = () => {
  const [getMyWants, myWantsList, loadingMyWants, errorsMyWants] = useApi({
    promise: MathTradeService.getWants,
    initialState: [],
    // format: (mw) => {
    //   return mw.map(formatUserWantGroup);
    // },
  });
  const [getMyItems, myItemList, loadingMyItems, errorsMyItems] = useApi({
    promise: MathTradeService.listMyItems,
    initialState: null,
  });

  useEffect(() => {
    getMyItems();
    getMyWants();
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
