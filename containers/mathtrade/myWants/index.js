import { useState, useEffect } from "react";
import { useApi, MathTradeService } from "api_serv";
import PrivateEnv from "environments/private";
import MyWantsView from "views/mathtrade/myWants";

const MyWants = () => {
  const [firstLoadedWants, set_firstLoadedWants] = useState(false);
  const [firstLoadedMyItems, set_firstLoadedMyItems] = useState(false);

  const [wantList, set_wantList] = useState([]);
  const [myItemList, set_myItemList] = useState([]);

  const [getWants, , loadingWantList, errorsWantList] = useApi({
    promise: MathTradeService.getWants,
    // initialState: [],
    afterLoad: (d) => {
      set_wantList(d);
      set_firstLoadedWants(true);
    },
  });
  const [getMyItems, , loadingMyItems, errorsMyItems] = useApi({
    promise: MathTradeService.listMyItems,
    // initialState: [],
    afterLoad: (d) => {
      set_myItemList(d);
      set_firstLoadedMyItems(true);
    },
  });
  const [putWant, , putLoading, putErrors] = useApi({
    promise: MathTradeService.putWant,
    afterLoad: () => {
      getWants();
    },
  });

  // const [deleteWant, , deleteLoading, deleteErrors] = useApi({
  //   promise: MathTradeService.deleteWant,
  // });

  useEffect(() => {
    getMyItems();
    getWants();
    // deleteWant({ id: 28 });
  }, []);

  return (
    <PrivateEnv>
      <MyWantsView
        wantList={wantList}
        myItemList={myItemList}
        putWant={putWant}
        firstLoaded={firstLoadedWants && firstLoadedMyItems}
        loading={loadingWantList || loadingMyItems || putLoading}
        reloadMyItems={() => {
          getMyItems();
        }}
        reloadWants={() => {
          getWants();
        }}
        errors={errorsWantList || errorsMyItems || putErrors}
      />
    </PrivateEnv>
  );
};

export default MyWants;
