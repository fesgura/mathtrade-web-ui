import { useCallback, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { NotificationsContext } from "@/context/notifications";

const useBulkReadNotifications = () => {
  /* CONTEXT *************************************************/
  const {
    setItemNotifUnread,
    //
    setWantNotifUnread,
    //
    setAdminNotifUnread,
  } = useContext(NotificationsContext);
  /* end CONTEXT *************************************************/

  /* FETCH BULK *************************************************/

  const afterLoadNotificationsBulk = useCallback(() => {
    setItemNotifUnread(0);
    setWantNotifUnread(0);
    setAdminNotifUnread(0);
  }, [setItemNotifUnread, setWantNotifUnread, setAdminNotifUnread]);

  const [setNotificationsBulk, , loading] = useFetch({
    endpoint: "POST_NOTIFICATIONS_BULK",
    method: "POST",
    afterLoad: afterLoadNotificationsBulk,
  });
  /* end FETCH BULK */

  const setNotificationsBulkReaded = useCallback(() => {
    setNotificationsBulk({
      params: {},
    });
  }, [setNotificationsBulk]);

  return { setNotificationsBulkReaded, loading };
};

export default useBulkReadNotifications;
