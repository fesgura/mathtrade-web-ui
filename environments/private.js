import { useState, useEffect } from "react";
import _ from "lodash";
import storage from "utils/storage";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import { useApi, BggUserService, MathTradeService } from "api";

const PrivateEnv = ({ children }) => {
  const [loadedBGG, set_loadedBGG] = useState(false);
  const [loadedMT, set_loadedMT] = useState(false);

  const [getBGGuser] = useApi({
    promise: BggUserService.get,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        const bggData = { bggUser: data.user };
        storage.setToStorage(bggData);
      }
      set_loadedBGG(true);
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
          storage.setToStorage({ mathtrade });
        } else {
          storage.setToStorage({ mathtrade: "none" });
        }
      } else {
        storage.setToStorage({ mathtrade: "none" });
      }
      set_loadedMT(true);
    },
  });

  useEffect(() => {
    const store = storage.get();

    if (store && store.auth) {
      const { expires } = store.auth;
      const d = new Date();
      const currentTime = d.getTime();
      if (currentTime < expires) {
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
  }, []);

  useEffect(() => {
    if (loadedBGG && loadedMT) {
      Router.reload(window.location.pathname);
    }
  }, [loadedBGG, loadedMT]);

  return <>{children}</>;
};

export default PrivateEnv;
