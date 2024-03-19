import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";

const useNotifications = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  /* FETCH *************************************************/
  const [num, setNum] = useState(0);
  const [list, setList] = useState([]);

  const afterLoad = useCallback((xnotifications) => {
    const notifications = {
      count: 1,
      current: 1,
      unread: 1,
      results: [
        {
          id: 1,
          type: "WGR",
          message: "lalala",
          unread: true,
          uwg_id: 2,
          item_id: 3,
          mt_id: 4,
          created: "2024-03-19T01:09:39Z",
        },
      ],
    };
    //console.log(xnotifications);
    setNum(notifications?.count || 0);
    setList(notifications?.results || []);
  }, []);

  const [getNotifications, , loading] = useFetch({
    endpoint: "GET_NOTIFICATIONS",
    initialState: { count: 0, current: 1, unread: 0, results: [] },
    afterLoad,
  });
  /* end FETCH */

  useEffect(() => {
    getNotifications();
  }, [getNotifications]);

  return {
    visibleMobile,
    toggleMobile,
    num,
    list,
    loading,
  };
};

export default useNotifications;
