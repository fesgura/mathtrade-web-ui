import { useCallback, useMemo } from "react";
import useFetch from "@/hooks/useFetch";

const useUserBanRow = (user, userBans, setUserBans) => {
  const { avatar, name, location } = user;

  /* POST BAN  **********************************************/
  const afterLoadBan = useCallback(
    (res) => {
      const { id, identity } = res;
      setUserBans((oldUserBans) => {
        const oldUserBansCopy = { ...oldUserBans };
        oldUserBansCopy[identity] = id;
        return oldUserBansCopy;
      });
    },
    [setUserBans]
  );

  const [banUser, , loadingBan] = useFetch({
    endpoint: "POST_BAN",
    method: "POST",
    afterLoad: afterLoadBan,
  });
  /* end POST BAN  **********************************************/

  /* DELETE (UNBAN)  **********************************************/
  const afterLoadUnBan = useCallback(() => {
    const { id } = user;
    setUserBans((oldUserBans) => {
      const oldUserBansCopy = { ...oldUserBans };
      delete oldUserBansCopy[id];
      return oldUserBansCopy;
    });
  }, [user, setUserBans]);

  const [unbanUser, , loadingUnBan] = useFetch({
    endpoint: "DELETE_BAN",
    method: "DELETE",
    afterLoad: afterLoadUnBan,
  });
  /* end DELETE (UNBAN)  **********************************************/

  const ban_id = useMemo(() => {
    return userBans[user.id] || null;
  }, [user, userBans]);

  const onClick = useCallback(() => {
    if (ban_id) {
      unbanUser({ urlParams: [ban_id] });
    } else {
      const params = { type: "U", identity: user?.id };
      banUser({ params });
    }
  }, [user, ban_id, banUser, unbanUser]);

  return {
    avatar,
    name,
    location,
    ban_id,
    onClick,
    loading: loadingBan || loadingUnBan,
  };
};

export default useUserBanRow;
