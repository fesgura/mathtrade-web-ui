import { useState, useEffect } from "react";
import Router from "next/router";
import PrivateEnv from "environments/private";
import MT_MyDataView from "views/mathtrade/my-data";
import { useApi, LocationService, MathTradeService } from "api";
import { IamInMathtrade } from "utils";
import storage from "utils/storage";

const MT_MyData = () => {
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

  const [getMathTrade, , loadingGetMathTrade] = useApi({
    promise: MathTradeService.listMathTrades,
    afterLoad: (data) => {
      if (data && data.length) {
        const mathtradeActiveArray = data.filter((mt) => {
          return mt.active;
        });
        const mathtrade = mathtradeActiveArray[0] || null;
        if (mathtrade) {
          storage.setToStorage({ mathtrade });
        } else {
          storage.setToStorage({ mathtrade: "none" });
        }
      } else {
        storage.setToStorage({ mathtrade: "none" });
      }
      Router.reload(window.location.pathname);
    },
  });

  const [signMathTrade, , loadingSignMathTrade, errorSignMathTrade] = useApi({
    promise: MathTradeService.signInMathTrade,
    afterLoad: (data) => {
      getMathTrade();
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
      getMathTrade();
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
      getMathTrade();
    },
  });

  //////////////////////
  useEffect(() => {
    fetchLocations();
    //
    const newMathtradeData = IamInMathtrade();

    if (newMathtradeData.IamIn) {
      fetchMathTradeUser({
        mathTradeId: newMathtradeData.mathtrade.id,
        userId: newMathtradeData.user.id,
      });
    }
    set_mathtradeData(newMathtradeData);
  }, []);

  return (
    <PrivateEnv>
      <MT_MyDataView
        mathtradeData={mathtradeData}
        MathTradeUserInitial={MathTradeUserInitial}
        dataLocations={dataLocations}
        loadingLocations={loadingLocations}
        loading={
          loadingMathTradeUser ||
          loadingSignMathTrade ||
          loadingGetMathTrade ||
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
      />
    </PrivateEnv>
  );
};

export default MT_MyData;
