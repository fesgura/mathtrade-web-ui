import { useState, useEffect } from "react";
import PrivateEnv from "environments/private";
import MT_MyDataView from "views/mathtrade/my-data";
import { useApi, LocationService, UserService, MathTradeService } from "api";
import storage from "utils/storage";

const MT_MyData = () => {
  const [dataInitial, set_dataInitial] = useState(null);

  useEffect(() => {
    fetchLocations();
    //
    const user = storage.getFromStore("user");
    const mathtrade = storage.getFromStore("mathtrade");
    if (mathtrade) {
      const arrExistUserInMathtrade = mathtrade.users.filter((userMT) => {
        return user.id == userMT;
      });
      const isUserInMT = arrExistUserInMathtrade[0] ? true : false;
      set_dataInitial({
        mathtrade,
        user,
        isUserInMT,
      });
    }
  }, []);

  ////////////

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [editUser, , loadingEditUser, errorEditUser] = useApi({
    promise: UserService.put,
    initialState: {},
    afterLoad: (user) => {
      storage.setToStorage({ user });
      set_dataInitial((v) => {
        return {
          ...v,
          user,
        };
      });
      // if(){

      // }
      const mathtrade = storage.getFromStore("mathtrade");
      if (user.mathtrades.indexOf(mathtrade.id) < 0) {
        signMathTrade(mathtrade.id);
      }
      //
    },
  });
  const [signMathTrade, , loadingSignMathTrade, errorSignMathTrade] = useApi({
    promise: MathTradeService.signInMathTrade,
    //initialState: {},
    afterLoad: (data) => {
      // console.log("signIn", data);
    },
  });

  return (
    <PrivateEnv>
      <MT_MyDataView
        dataInitial={dataInitial}
        dataLocations={dataLocations}
        loadingLocations={loadingLocations}
        loading={loadingEditUser || loadingSignMathTrade}
        errors={errorEditUser || errorSignMathTrade}
        onSubmit={(id, data) => {
          editUser({ id, data });
        }}
        signOutMathTrade={() => {
          const mathtrade = storage.getFromStore("mathtrade");
          signMathTrade(mathtrade.id, { remove_user: true });
        }}
      />
    </PrivateEnv>
  );
};

export default MT_MyData;
