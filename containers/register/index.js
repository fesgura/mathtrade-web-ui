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
      // setTimeout(() => {
      //   set_dataInitial({
      //     username: "math2",
      //     password: "MeepleLand",
      //     //"pbkdf2_sha256$320000$VAsLul4gDbcrCU7cBfDTud$3UxjELJDOx1WXoO3H8MhkshT7JN5Nxgxqdv5ibs/Rwg="
      //     password2: "MeepleLand",
      //     first_name: "Math",
      //     last_name: "Trade",
      //     email: "mathtradearg2@gmmail.com",
      //     phone: "+549262544781",
      //     whatsapp: "+549262544781",
      //     telegram: "MT2022",
      //     location: "3",
      //     bgg_user: "davicazu",
      //   });
      // }, 500);
    }
  }, [verifingAuth]);

  const handleSubmit = useCallback(
    (formData) => {
      onGetCaptcha("sign_up", (recaptcha) => {
        delete formData.password2;
        const dataToSend = {
          ...formData,
          // location: `https://mathtrade-back.herokuapp.com/api/locations/${formData.location}/`,
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
