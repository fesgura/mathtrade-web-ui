import { useState, useEffect } from "react";
import _ from "lodash";
import storage from "utils/storage";
import Router from "next/router";
import { useDispatch } from "react-redux";
import { publicRoutes } from "config/routes";
import { useApi, BggService, MathTradeService } from "api";
import { setStoreData, setUserBGG, setMathtrade } from "store/slices/storeData";

const PrivateEnv = ({ children }) => {
  const dispatch = useDispatch();

  const [getBGGuser] = useApi({
    promise: BggService.getUser,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        const bggData = { bggUser: data.user };

        storage.setToStorage(bggData);
        dispatch(setUserBGG(data.user));
      }
    },
  });
  const [getMathTrade] = useApi({
    promise: MathTradeService.listMathTrades,
    afterLoad: (data) => {
      if (data && data.length) {
        const mathtradeActiveArray = data.filter((mt) => {
          return mt.active;
        });
        const mathtrade = mathtradeActiveArray[0] || null;
        if (mathtrade) {
          const store = storage.get();
          const memberId = store.user.data.id;

          const arrExistUserInMathtrade = mathtrade.users.filter((userMT) => {
            return memberId == userMT;
          });

          const mathtradeData = {
            IamIn: arrExistUserInMathtrade.length > 0,
            data: mathtrade,
            memberId,
          };

          storage.setToStorage({
            mathtrade: mathtradeData,
          });
          dispatch(setMathtrade(mathtradeData));
        } else {
          storage.setToStorage({ mathtrade: null });
          dispatch(setMathtrade(null));
        }
      } else {
        storage.setToStorage({ mathtrade: null });
        dispatch(setMathtrade(null));
      }
    },
  });

  useEffect(() => {
    const store = storage.get();
    if (store && store.auth) {
      const { expires } = store.auth;
      const d = new Date();
      const currentTime = d.getTime();
      if (currentTime < expires) {
        dispatch(setStoreData(store));
        if (_.isEmpty(store.user.bgg)) {
          getBGGuser(store.user.data.bgg_user);
        }
        if (!store.mathtrade) {
          getMathTrade();
        }
      } else {
        storage.clear();
        Router.push(`/${publicRoutes.signin.path}`);
      }
    } else {
      storage.clear();
      Router.push(`/${publicRoutes.signin.path}`);
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default PrivateEnv;
