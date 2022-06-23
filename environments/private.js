import { useState, useEffect } from "react";
import _ from "lodash";
import storage from "utils/storage";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import { useApi, BggUserService } from "api";

const PrivateEnv = ({ Container }) => {
  const [store, updateStore] = useState(null);

  const [getBGGuser] = useApi({
    promise: BggUserService.get,
    forBGG: true,
    afterLoad: (data) => {
      if (data && data.user && data.user.id && data.user.id !== "") {
        const bggData = { bggUser: data.user };
        storage.setToStorage(bggData);
        updateStore((s) => {
          return storage.mergeStore(s, bggData);
        });
      }
    },
  });

  useEffect(() => {
    const newStore = storage.get();
    const auth = storage.getFromStore(newStore, "auth");
    if (auth) {
      const { expires } = auth;
      const d = new Date();
      const currentTime = d.getTime();
      if (currentTime < expires) {
        updateStore(newStore);
        const bggUser = storage.getFromStore(newStore, "bggUser");
        if (_.isEmpty(bggUser)) {
          const user = storage.getFromStore(newStore, "user");
          getBGGuser(user.bgg_user);
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

  return <Container store={store} />;
};

export default PrivateEnv;
