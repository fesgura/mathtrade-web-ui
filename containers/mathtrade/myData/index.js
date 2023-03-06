import { useState, useEffect } from "react";
import Router from "next/router";
import PrivateEnv from "environments/private";
import MyDataView from "views/mathtrade/myData";
import useCanEdit from "hooks/useCanEdit";
import { useApi, LocationService, MathTradeService } from "api_serv";
import storage from "utils/storage";

const MT_MyDataContainer = () => {
  const canEditList = useCanEdit("list");
  const [mathtradeData, set_mathtradeData] = useState(null);

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [
    fetchMathTradeUser,
    MathTradeUserInitial,
    loadingMathTradeUser,
    errorMathTradeUser,
  ] = useApi({
    promise: MathTradeService.getMathTradeUser,
    initialState: {},
  });

  useEffect(() => {
    const storeData = storage.get();
    if (storeData?.mathtrade) {
      set_mathtradeData(storeData?.mathtrade);
    }
    if (storeData?.mathtrade?.IamIn && storeData?.mathtrade?.memberId) {
      fetchMathTradeUser({
        userId: storeData.mathtrade.memberId,
      });
    }
  }, []);

  const [signMathTrade, , loadingSignMathTrade, errorSignMathTrade] = useApi({
    promise: MathTradeService.signInMathTrade,
    afterLoad: (data) => {
      storage.setMathtradeIamIn(true);
      Router.reload(window.location.pathname);
    },
  });
  const [
    editMemberMathTrade,
    ,
    loadingEditMemberMathTrade,
    errorEditMemberMathTrade,
  ] = useApi({
    promise: MathTradeService.editMemberMathTrade,
    afterLoad: (data) => {
      Router.reload(window.location.pathname);
    },
  });
  const [
    cancelMemberMathTrade,
    ,
    loadingCancelMemberMathTrade,
    errorCancelMemberMathTrade,
  ] = useApi({
    promise: MathTradeService.cancelMemberMathTrade,
    afterLoad: (data) => {
      storage.setMathtradeIamIn(false);
      Router.reload(window.location.pathname);
    },
  });

  //////////////////////
  useEffect(() => {
    fetchLocations();
    //getMathTrade();
    //
  }, []);

  return (
    <PrivateEnv>
      <MyDataView
        mathtradeData={mathtradeData}
        MathTradeUserInitial={MathTradeUserInitial}
        dataLocations={dataLocations}
        loadingLocations={loadingLocations}
        loading={
          loadingMathTradeUser ||
          loadingSignMathTrade ||
          // loadingGetMathTrade ||
          loadingEditMemberMathTrade ||
          loadingCancelMemberMathTrade
        }
        errors={
          errorMathTradeUser ||
          errorSignMathTrade ||
          errorEditMemberMathTrade ||
          errorCancelMemberMathTrade
        }
        onSubmit={(IamIn, props) => {
          if (IamIn) {
            editMemberMathTrade(props);
          } else {
            signMathTrade(props);
          }
        }}
        cancelMemberMathTrade={cancelMemberMathTrade}
        canEditList={canEditList}
      />
    </PrivateEnv>
  );
};

export default MT_MyDataContainer;
