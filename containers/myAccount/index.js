import { useEffect } from "react";
import PrivateEnv from "environments/private";
import MyAccountView from "views/myAccount";
import { useApi, LocationService, UserService } from "api_serv";
import Router from "next/router";
import storage from "utils/storage";

const MyAccountContainer = () => {
  const [getUser, dataGetUser, loadingGetUser, errorGetUser] = useApi({
    promise: UserService.get,
    // format: (data) => {
    //   return data;
    // },
  });

  const [editUser, dataEditUser, loadingEditUser, errorEditUser] = useApi({
    promise: UserService.put,
    afterLoad: (user) => {
      storage.setToStorage({ user, bggUser: {}, mathtrade: null });
      Router.reload(window.location.pathname);
    },
  });

  const [fetchLocations, dataLocations, loadingLocations] = useApi({
    promise: LocationService.getList,
    initialState: [],
  });

  useEffect(() => {
    const user = storage.getFromStore("user");
    getUser(user.id);
    fetchLocations();
  }, []);

  return (
    <PrivateEnv>
      <MyAccountView
        data={dataEditUser ? { ...dataGetUser, ...dataEditUser } : dataGetUser}
        loading={loadingGetUser || loadingEditUser}
        dataLocations={dataLocations}
        loadingLocations={loadingLocations}
        onSubmit={(id, data) => {
          // console.log(id, data);
          //const a = {};
          editUser({ id, data });
        }}
        errors={errorGetUser || errorEditUser}
      />
    </PrivateEnv>
  );
};

export default MyAccountContainer;
