import { useContext, useMemo, useCallback, useEffect, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { normalizeString } from "@/utils";

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

  const [searchValue, setSearchValue] = useState("");

  const [order, setOrder] = useState("name");

  const userListUnordered = useMemo(() => {
    if (!users.length) {
      return [];
    }

    const keyLow = normalizeString(searchValue);

    return users
      .filter((user) => {
        if (user.id === userId) {
          return false;
        }
        if (keyLow === "") {
          return true;
        }
        return (
          normalizeString(
            `${user?.first_name || ""} ${user?.last_name || ""}`
          ).indexOf(keyLow) >= 0
        );
      })
      .map((user) => {
        const { id, /*ban_id,*/ avatar, first_name, last_name, location } =
          user;

        return {
          id,
          avatar,
          name: `${first_name} ${last_name}`,
          last_name,
          location: location?.name || "-",
        };
      });
  }, [users, userId, searchValue]);

  const userList = useMemo(() => {
    return userListUnordered.sort((a, b) => {
      const dir = order.indexOf("-") === 0 ? -1 : 1;

      const orderKey = order.replace("-", "");

      switch (orderKey) {
        case "status":
          return typeof userBans[a.id] !== "undefined" ? -1 * dir : dir;

        case "location":
          return a.location < b.location ? -1 * dir : dir;
        default:
          return a.last_name < b.last_name ? -1 * dir : dir;
      }
    });
  }, [userListUnordered, order, userBans]);

  return {
    userList,
    userBans,
    setUserBans,
    loading: loadingUsers || loadingBanUsers,
    error: errorLoadingUsers || errorBanUsers,
    order,
    setOrder,
    searchValue,
    setSearchValue,
  };
};

export default useBanUserList;
