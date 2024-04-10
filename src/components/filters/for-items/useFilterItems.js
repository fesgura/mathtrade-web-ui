import { useStore, useOptions } from "@/store";
import { useContext, useMemo, useCallback, useEffect } from "react";
import { getI18Ntext } from "@/i18n";
import { statusList as statusTypes } from "@/config/statusTypes";
import { languagesOptions } from "@/config";
import { dependencyOptions } from "@/config/dependencyTypes";
import { formatLocations } from "@/utils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useFiltersItems = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    itemTags,
    users,
    setUsers,
    loadingUsers,
    setLoadingUsers,
    filterData,
  } = useContext(PageContext);
  /* end PAGE CONTEXT */

  console.log("filterData", filterData);

  /* USERS ****************************************/

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
  const [loadUsers] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    beforeLoad: beforeLoadUsers,
    afterLoad: afterLoadUsers,
  });

  useEffect(() => {
    if (!users.length && !loadingUsers) {
      loadUsers();
    }
  }, [users, loadUsers, loadingUsers]);

  /* end USERS ****************************************/

  const filters = useOptions((state) => state.filters_item);
  const locations = useStore((state) => state.locations);

  const filtersProcessed = useMemo(() => {
    const filtersProc = {
      ...filters,
    };
    if (filters.user && filters.user < 0) {
      filtersProc.hide_my_user = true;
      delete filtersProc.user;
    }

    if (!filters.ignored) {
      filtersProc.ignored = "no";
    } else {
      filtersProc.ignored = "yes";
    }

    return filtersProc;
  }, [filters]);

  const tagList = useMemo(() => {
    return itemTags?.map((tag) => {
      return {
        value: tag.id,
        text: tag.name,
        color: tag.color,
        count: tag.items.length,
      };
    });
  }, [itemTags]);

  const {
    typeList,
    banOptions,
    dependencyList,
    statusList,
    languageList,
    locationList,
  } = useMemo(() => {
    const locs = formatLocations(locations);
    console.log("locs", locs);
    return {
      typeList: [
        {
          value: "1",
          text: `${getI18Ntext("filter.Type.Game")} (${
            filterData?.type?.[1] || 0
          })`,
        },
        {
          value: "2",
          text: `${getI18Ntext("filter.Type.Expansion")} (${
            filterData?.type?.[2] || 0
          })`,
        },
        {
          value: "3",
          text: `${getI18Ntext("filter.Type.Other")} (${
            filterData?.type?.[3] || 0
          })`,
        },
      ],
      banOptions: [
        {
          value: "no",
          text: getI18Ntext("ban.btn-filter.hide.item"),
        },
        {
          value: "yes",
          text: getI18Ntext("ban.btn-filter.show.item"),
        },
      ],
      dependencyList: dependencyOptions
        .map((dep) => {
          const num = filterData?.dependency?.[dep.value] || 0;
          if (!num) {
            return null;
          }
          return {
            ...dep,
            text: `${dep.text} (${num})`,
          };
        })
        .filter((v) => v !== null),
      statusList: statusTypes
        .map((st) => {
          const num = filterData?.status?.[st.value] || 0;
          if (!num) {
            return null;
          }
          return {
            ...st,
            text: `${st.text} (${num})`,
          };
        })
        .filter((v) => v !== null),
      languageList: languagesOptions
        .map((st) => {
          const num = filterData?.language?.[st.value] || 0;
          if (!num) {
            return null;
          }
          return {
            ...st,
            text: `${st.text} (${num})`,
          };
        })
        .filter((v) => v !== null),
      locationList: locs
        .map((st) => {
          if (st?.type === "group") {
            return st;
          }

          const num = filterData?.locations?.[st.value] || 0;

          if (!num) {
            return null;
          }

          return {
            ...st,
            text: `${st.text} (${num})`,
          };
        })
        .filter((v) => v !== null),
    };
  }, [filterData, locations]);

  const userList = useMemo(() => {
    if (!users?.length) {
      return [];
    }

    return [...users]
      .sort((a, b) => {
        return a?.last_name < b?.last_name ? -1 : 1;
      })
      .map((user) => {
        const { id, first_name, last_name, location } = user;
        return {
          value: id,
          text: `${first_name} ${last_name} (${location?.name})`,
        };
      });
  }, [users]);

  return {
    data: filtersProcessed,
    userList,
    loadingUserList: loadingUsers,
    typeList,
    tagList,
    banOptions,
    statusList,
    locationList,
    languageList,
    dependencyList,
  };
};

export default useFiltersItems;
