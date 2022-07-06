import { useState, useEffect, useCallback } from "react";
import RegisterView from "views/register";
import PublicEnv from "environments/public";
import { useApi, LocationService, UserService } from "api";

const RegisterContainer = ({ verifingAuth, onGetCaptcha }) => {
  const [dataInitial, set_dataInitial] = useState(null);

  const [isSuccess, set_isSuccess] = useState(false);

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  const [createUser, , loadingUser, errorUser] = useApi({
    promise: UserService.create,
    afterLoad: (data) => {
      set_isSuccess(true);
    },
  });

  useEffect(() => {
    if (!verifingAuth) {
      fetchLocations();
    }
  }, [verifingAuth]);

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("sign_up", (recaptcha) => {
        delete formData.password2;
        const dataToSend = {
          ...formData,
          recaptcha,
        };
        console.log("dataToSend", dataToSend);
        createUser(dataToSend);
      });
    },
    [onGetCaptcha, createUser]
  );

  return (
    <RegisterView
      onSubmit={handleSubmit}
      dataLocations={dataLocations}
      loadingLocations={loadingLocations}
      loading={loadingUser}
      dataInitial={dataInitial}
      errors={errorUser}
      isSuccess={isSuccess}
    />
  );
};

export default () => {
  return <PublicEnv Container={RegisterContainer} />;
};
