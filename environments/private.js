import { useState, useEffect } from "react";
import _ from "lodash";
import storage from "utils/storage";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import { BggService, MathTradeService } from "api_serv";
import callToAPI from "api_serv/hooks/callToAPI";
import xmlParser from "api_serv/utils/xmlParser";
import { setLogoutAPI } from "api_serv/utils";
import { mtExpireToken } from "config";

const PrivateEnv = ({ children }) => {
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [errors, setErrors] = useState(null);

  const gotoSignIn = () => {
    storage.clear();
    setLogoutAPI();
    Router.push(`/${publicRoutes.signin.path}`);
    return null;
  };

  const loadSignExtraData = async () => {
    const store = storage.get();
    if (!(store && store.auth && store.user.data)) {
      return gotoSignIn();
    }
    const { expires } = store.auth;
    const d = new Date();
    const currentTime = d.getTime();
    if (currentTime >= expires) {
      return gotoSignIn();
    }
    // IS LOGGED
    if (!_.isEmpty(store.user.bgg) && store.mathtrade) {
      //loaded Info
      setShowEnvironment(true);
      return;
    }

    // Load extra info ********************************
    let isErrors = false;
    /*
    if (_.isEmpty(store.user.bgg)) {
      // Load BGG USER
      const [errors_bgg_user, response_bgg_user, responseData_bgg_user] =
        await callToAPI(BggService.getUser(store.user.data.bgg_user));

      let dataBGG = { user: null };

      if (!response_bgg_user.ok) {
        // isErrors = true;
        // setErrors(errors_bgg_user);
      } else {
        dataBGG = xmlParser(responseData_bgg_user);
      }
      storage.setToStorage({ bggUser: dataBGG.user });
    }
    */
    const expireMathtrade = (() => {
      let exp = true;
      if (store.mathtrade && store.mathtrade.expires) {
        const d = new Date();
        const currentTime = d.getTime();
        if (currentTime >= store.mathtrade.expires) {
          exp = false;
        }
      }
      return exp;
    })();

    if (!store.mathtrade || expireMathtrade) {
      // Load MATHTRADES
      const [errors_mathtrade, response_mathtrade, responseData_mathtrade] =
        await callToAPI(MathTradeService.listMathTrades());

      if (!response_mathtrade.ok) {
        isErrors = true;
        setErrors(errors_mathtrade);
      } else {
        if (responseData_mathtrade && responseData_mathtrade.length) {
          const mathtradeActiveArray = responseData_mathtrade.filter((mt) => {
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
              expires: (() => {
                const d = new Date();
                return d.getTime() + +3600000 * mtExpireToken;
              })(),
            };
            storage.setToStorage({
              mathtrade: mathtradeData,
            });
          } else {
            storage.setToStorage({ mathtrade: null });
          }
        } else {
          storage.setToStorage({ mathtrade: null });
        }
      }
    }

    if (!isErrors) {
      setShowEnvironment(true);
    }
    // END extra info ********************************
    return;
  };
  useEffect(() => {
    loadSignExtraData();
  }, []);

  return showEnvironment ? <>{children}</> : errors ? <div>ERRORS</div> : null;
};

export default PrivateEnv;
