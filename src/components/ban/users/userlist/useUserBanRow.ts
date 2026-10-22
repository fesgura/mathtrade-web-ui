import { useCallback, useMemo, useContext, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import useReloadWantsAndTags from "@/hooks/useReloadWantsAndTags";

type UserBans = Record<string, number>;

const useUserBanRow = (
  user: { id: number },
  userBans: UserBans,
  setUserBans: Dispatch<SetStateAction<UserBans>>
) => {
  const { forceReloadPage } = useContext(PageContext);
  const updateFilters = useOptions((state) => state.updateFilters);
  // Ignoring a user removes their copies from your wants (BE).
  const { reload } = useReloadWantsAndTags();

  /* POST BAN  **********************************************/
  const afterLoadBan = useCallback(
    (res: { id: number; identity: number }) => {
      const { id, identity } = res;
      setUserBans((oldUserBans) => {
        const oldUserBansCopy = { ...oldUserBans };
        oldUserBansCopy[identity] = id;
        return oldUserBansCopy;
      });
      // Banning a user hides all their items/games from the offer lists.
      // Force both lists to refetch so the change is reflected immediately
      // without requiring a manual filter interaction (same pattern as
      // useBanButton.ts — updateFilters creates a new filter reference so
      // the useFetch dependency array sees a change even if the filter
      // values haven't changed).
      updateFilters({}, "item");
      updateFilters({}, "game");
      forceReloadPage();
      reload();
    },
    [setUserBans, updateFilters, forceReloadPage, reload]
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
    updateFilters({}, "item");
    updateFilters({}, "game");
    forceReloadPage();
    reload();
  }, [user, setUserBans, updateFilters, forceReloadPage, reload]);

  const [unbanUser, , loadingUnBan] = useFetch({
    endpoint: "DELETE_BAN_USER",
    method: "DELETE",
    afterLoad: afterLoadUnBan,
  });
  /* end DELETE (UNBAN)  **********************************************/

  const ban_id = useMemo(() => {
    return userBans[user.id] || null;
  }, [user, userBans]);

  // Ignoring someone is explained before it's done: their copies leave your
  // wants, but they can still receive something of yours.
  const [confirmOpen, setConfirmOpen] = useState(false);

  const onClick = useCallback(() => {
    if (ban_id) {
      unbanUser({ urlParams: [ban_id] });
    } else {
      setConfirmOpen(true);
    }
  }, [ban_id, unbanUser]);

  const onConfirm = useCallback(() => {
    setConfirmOpen(false);
    banUser({ params: { type: "U", identity: user?.id } });
  }, [user, banUser]);

  const onCancel = useCallback(() => setConfirmOpen(false), []);

  return {
    ban_id,
    onClick,
    confirmOpen,
    onConfirm,
    onCancel,
    loading: loadingBan || loadingUnBan,
  };
};

export default useUserBanRow;
