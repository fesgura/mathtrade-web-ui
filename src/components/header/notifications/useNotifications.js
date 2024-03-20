import { useCallback, useEffect, useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";

const temp = {
  count: 6,
  current: 1,
  unread: 6,
  results: [
    {
      id: 11,
      type: "WGC",
      message: { uwg_id: 42716, uwg_name: "Calico (2020)" },
      unread: true,
      created: "2024-03-19T18:21:44.010633Z",
    },
    {
      id: 10,
      type: "WGC",
      message: { uwg_id: 42884, uwg_name: "T.I.M.E Stories (2015)" },
      unread: true,
      created: "2024-03-19T18:21:23.851567Z",
    },
    {
      id: 7,
      type: "COMC",
      message: {
        item_id: 5142,
        item_name: "1923 Cotton Club (2021)",
        user_first_name: "Sergio",
        user_last_name: "Soria",
        comment: "Buena música",
      },
      unread: true,
      created: "2024-03-19T18:13:08.834966Z",
    },
    {
      id: 6,
      type: "COMC",
      message: {
        item_id: 1491,
        item_name: "Arkwright: The Card Game (2021)",
        user_first_name: "Sergio",
        user_last_name: "Soria",
        comment: "lalala",
      },
      unread: true,
      created: "2024-03-19T18:12:22.537079Z",
    },
    {
      id: 5,
      type: "COMC",
      message: {
        item_id: 4950,
        item_name: "Aliens: Hadley's Hope (2018)",
        user_first_name: "Sergio",
        user_last_name: "Soria",
        comment: "no me gustan los aliens",
      },
      unread: true,
      created: "2024-03-19T18:12:13.027536Z",
    },
    {
      id: 4,
      type: "COMC",
      message: {
        item_id: 5142,
        item_name: "1923 Cotton Club (2021)",
        user_first_name: "Sergio",
        user_last_name: "Soria",
        comment: "Buena música",
      },
      unread: true,
      created: "2024-03-19T18:11:49.699639Z",
    },
  ],
};

const useNotifications = () => {
  const [visibleMobile, setVisibleMobile] = useState(false);

  const toggleMobile = useCallback(() => {
    setVisibleMobile((v) => !v);
  }, []);

  /* FETCH *************************************************/
  const [num, setNum] = useState(0);
  const [list, setList] = useState([]);

  const afterLoad = useCallback((notifications) => {
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
    let timer = setInterval(() => {
      getNotifications();
    }, 300000);

    return () => {
      clearInterval(timer);
    };
  }, [getNotifications]);

  /*
  useEffect(() => {
    setNum(temp?.count || 0);
    setList(temp?.results || []);
  }, []);
*/
  return {
    visibleMobile,
    toggleMobile,
    num,
    list,
    loading,
  };
};

export default useNotifications;
