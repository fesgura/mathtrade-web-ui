import { useCallback, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";

const page_size = 10;

const minutesOfInterval = 8;

const useNotifications = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  /* FETCH *************************************************/

  const [cancelReload, setCancelReload] = useState(0);

  const [page, setPage] = useState(1);

  const [num, setNum] = useState(0);
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);

  const afterLoad = useCallback((notifications) => {
    setCount(notifications?.count || 0);
    setNum(notifications?.unread || 0);
    setList((oldList) => {
      const oldListCopy = [...oldList];

      return oldListCopy.concat(notifications?.results || []);
    });
    setPage((v) => v + 1);
  }, []);

  const [getNotifications, , loadingNotifications] = useFetch({
    endpoint: "GET_NOTIFICATIONS",
    initialState: { count: 0, current: 1, unread: 0, results: [] },
    afterLoad,
  });
  /* end FETCH */

  useEffect(() => {
    let timer = setInterval(() => {
      setPage(1);
      getNotifications({
        params: {
          page_size,
          page: 1,
        },
      });
    }, minutesOfInterval * 60000);

    return () => {
      clearInterval(timer);
    };
  }, [getNotifications, cancelReload]);

  useEffect(() => {
    getNotifications({
      params: {
        page_size,
        page: 1,
      },
    });
  }, [getNotifications]);

  const loadMore = useCallback(
    (e) => {
      e.preventDefault();
      getNotifications({
        params: {
          page_size,
          page,
        },
      });
    },
    [page, getNotifications]
  );

  /***********************************************/

  /* FETCH BULK *************************************************/

  const afterLoadNotificationsBulk = useCallback(() => {
    setNum(0);

    setList((oldList) => {
      return [...oldList].map((n) => {
        return {
          ...n,
          unread: false,
          version_ui: (n?.version_ui || 0) + 1,
        };
      });
    });
  }, []);

  const [setNotificationsBulk, , loadingNotificationsBulk] = useFetch({
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

  const loading = loadingNotifications || loadingNotificationsBulk;

  return {
    visibleMobile,
    toggleMobile,
    num,
    setNum,
    list,
    loading,
    showLoadMore: !loading && list.length > 0 && list.length < count,
    loadMore,
    setCancelReload,
    setNotificationsBulkReaded,
  };
};

export default useNotifications;
