import { useState, useEffect } from "react";
import storage from "utils/storage";
import Router from "next/router";
import { publicRoutes } from "config/routes";

const PrivateEnv = ({ Container }) => {
  const [store, updateStore] = useState(null);

  useEffect(() => {
    const newStore = storage.get();
    if (newStore && newStore.auth) {
    } else {
      Router.push(`/${publicRoutes.signin.path}`);
    }
  }, []);

  return <Container store={store} />;
};

export default PrivateEnv;
