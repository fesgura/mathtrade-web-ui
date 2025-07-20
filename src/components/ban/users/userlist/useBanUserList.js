import { useContext, useMemo, useCallback, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useBanUserList = () => {
  /* PAGE CONTEXT **********************************************/
  const { userId, users, setUsers, loadingUsers, setLoadingUsers } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* GET USERS ****************************************/
  const beforeLoadUsers = useCallback(() => {
    setLoadingUsers(true);
  }, [setLoadingUsers]);

  const afterLoadUsers = useCallback(
    (newUsers) => {
      setUsers(newUsers);
      setLoadingUsers(false);
    },
    [setUsers, setLoadingUsers]
  );
  const [loadUsers, , , errorLoadingUsers] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    autoLoad: true,
    beforeLoad: beforeLoadUsers,
    afterLoad: afterLoadUsers,
  });

  useEffect(() => {
    if (!users.length && !loadingUsers) {
      loadUsers();
    }
  }, [users, loadUsers, loadingUsers]);

  /* end GET USERS ****************************************/

  /* GET BAN USERS ****************************************/

  const [userBans, setUserBans] = useState({});

  const afterLoadBanUsers = useCallback((list) => {
    const newUserBan = list
      .filter((ban) => ban.type === "U")
      .reduce((obj, value) => {
        const { id, identity } = value;

        obj[identity] = id;

        return obj;
      }, {});

    setUserBans(newUserBan);
  }, []);

  const banParams = useMemo(() => {
    return { users: true };
  }, []);

  const [, , loadingBanUsers, errorBanUsers] = useFetch({
    endpoint: "GET_BANS",
    initialState: {},
    params: banParams,
    autoLoad: true,

    afterLoad: afterLoadBanUsers,
  });

  /* end GET BAN USERS ****************************************/

  const userList = useMemo(() => {
    if (!users.length) {
      return [];
    }

    return users
      .filter((user) => {
        if (user.id === userId) {
          return false;
        }
        return true;
      })
      .map((user) => {
        const { id, /*ban_id,*/ avatar, full_name, location } =
          user;

        return {
          id,
          avatar,
          name: `${full_name}`,
          location: location?.name || "-",
        };
      });
  }, [users, userId]);

  return {
    userList,
    userBans,
    setUserBans,
    loading: loadingUsers || loadingBanUsers,
    error: errorLoadingUsers || errorBanUsers,
  };
};

export default useBanUserList;
