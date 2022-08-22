import { useState, useEffect } from "react";
import Router from "next/router";
import PrivateEnv from "environments/private";
import MT_MyDataView from "views/mathtrade/my-data";
import { useApi, LocationService, MathTradeService } from "api";
import { getMathtradeStored } from "utils";
import storage from "utils/storage";

const MT_MyDataContainer = () => {
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
          storage.setToStorage({ "mathtrade.data": mathtrade });
        } else {
          storage.setToStorage({ "mathtrade.data": null });
        }
      } else {
        storage.setToStorage({ "mathtrade.data": null });
      }
      setTimeout(() => {
        const newMathtradeStored = getMathtradeStored();

        if (newMathtradeStored.IamIn) {
          fetchMathTradeUser({
            mathTradeId: newMathtradeStored.data.id,
            userId: newMathtradeStored.memberId,
          });
        }
        set_mathtradeData(newMathtradeStored);
      }, 200);
    },
  });

  const [signMathTrade, , loadingSignMathTrade, errorSignMathTrade] = useApi({
    promise: MathTradeService.signInMathTrade,
    afterLoad: (data) => {
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
      Router.reload(window.location.pathname);
    },
  });

  //////////////////////
  useEffect(() => {
    fetchLocations();
    getMathTrade();
    //
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

export default MT_MyDataContainer;
