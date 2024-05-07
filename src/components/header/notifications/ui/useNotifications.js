import { useCallback, useEffect, useState, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import { NotificationsContext } from "@/context/notifications";

const page_size = 10;

const useNotifications = (type) => {
  /* CONTEXT *************************************************/
  const {
    setItemNotifUnread,
    //
    setWantNotifUnread,
    //
    setAdminNotifUnread,
  } = useContext(NotificationsContext);
  /* end CONTEXT *************************************************/

  /* FETCH *************************************************/

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList([]);
    setPage(1);
  }, [type]);

  const afterLoad = useCallback(
    (notifications) => {
      const {
        item_count,
        item_unread,
        //
        want_count,
        want_unread,
        //
        admin_count,
        admin_unread,
        //
        results,
      } = notifications;

      setItemNotifUnread(item_unread || 0);
      setWantNotifUnread(want_unread || 0);
      setAdminNotifUnread(admin_unread || 0);

      if (type === "item") {
        setCount(item_count);
      }
      if (type === "want") {
        setCount(want_count);
      }
      if (type === "admin") {
        setCount(admin_count);
      }

      setList((oldList) => {
        const oldListCopy = [...oldList];
        return oldListCopy.concat(results || []);
      });
      setPage((v) => v + 1);
    },
    [type, setItemNotifUnread, setWantNotifUnread, setAdminNotifUnread]
  );

  const [getNotifications, , loadingNotifications] = useFetch({
    endpoint: "GET_NOTIFICATIONS",
    initialState: { count: 0, current: 1, unread: 0, results: [] },
    afterLoad,
  });
  /* end FETCH */

  useEffect(() => {
    getNotifications({
      params: {
        page_size,
        page: 1,
        type,
      },
    });
  }, [getNotifications, type]);

  const loadMore = useCallback(
    (e) => {
      e.preventDefault();
      getNotifications({
        params: {
          page_size,
          page,
          type,
        },
      });
    },
    [page, getNotifications, type]
  );

  /***********************************************/

  const loading = loadingNotifications;

  return {
    list,
    loading,
    showLoadMore: !loading && list.length > 0 && list.length < count,
    loadMore,
  };
};

export default useNotifications;
