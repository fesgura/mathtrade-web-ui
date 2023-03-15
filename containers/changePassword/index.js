import { useCallback, useEffect, useRef, useState } from "react";
import ChangePasswordView from "views/changePassword";
import { useApi, UserService } from "api_serv";
import Router from "next/router";
import { publicRoutes } from "config/routes";
import storage from "utils/storage";

const ChangePasswordContainer = () => {
  const [changePassword, , loading, errorApi] = useApi({
    promise: UserService.changePassword,
    afterLoad: () => {
      storage.clear();
      Router.push(`/${publicRoutes.signin.path}`);
    },
  });

  const old_password = useRef("");

  useEffect(() => {
    const newOld_password = storage.getFromStore("passwordTemporal");
    storage.clearInStorage("passwordTemporal");
    if (newOld_password) {
      old_password.current = newOld_password;
    } else {
      storage.clear();
      Router.push(`/${publicRoutes.signin.path}`);
    }
  }, []);

  const handleSubmit = useCallback(
    (formData) => {
      const dataToSend = {
        ...formData,
        old_password: old_password.current,
      };

      changePassword(dataToSend);
    },
    [changePassword, old_password]
  );

  return (
    <ChangePasswordView
      onSubmit={handleSubmit}
      loading={loading}
      errors={errorApi}
    />
  );
};

export default () => {
  return <ChangePasswordContainer />;
};
