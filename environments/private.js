import { useState, useEffect } from "react";
import _ from "lodash";
import storage from "utils/storage";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import { useApi, BggUserService } from "api";

const PrivateEnv = ({ children }) => {
  const [getBGGuser] = useApi({
    promise: BggUserService.get,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        const bggData = { bggUser: data.user };
        storage.setToStorage(bggData);
        Router.reload(window.location.pathname);
      }
    },
  });

  useEffect(() => {
    const store = storage.get();
    if (store.auth) {
      const { expires } = store.auth;
      const d = new Date();
      const currentTime = d.getTime();
      if (currentTime < expires) {
        if (_.isEmpty(store.user.bgg)) {
          getBGGuser(store.user.data.bgg_user);
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

  return <>{children}</>;
};

export default PrivateEnv;
