import { useStore, useOptions } from "@/store";
import { useContext, useMemo, useCallback, useEffect } from "react";
import { getI18Ntext } from "@/i18n";
import { statusList } from "@/config/statusTypes";
import { languagesOptions } from "@/config";
import { dependencyOptions } from "@/config/dependencyTypes";
import { formatLocations } from "@/utils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useFiltersItems = () => {
  /* PAGE CONTEXT **********************************************/
  const { itemTags, users, setUsers, loadingUsers, setLoadingUsers } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

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

  const { typeList, banOptions } = useMemo(() => {
    return {
      typeList: [
        {
          value: "1",
          text: getI18Ntext("filter.Type.Game"),
        },
        {
          value: "2",
          text: getI18Ntext("filter.Type.Expansion"),
        },
        {
          value: "3",
          text: getI18Ntext("filter.Type.Other"),
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
    };
  }, []);

  const userList = useMemo(() => {
    if (!users?.length) {
      return [];
    }

    return users.map((user) => {
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
    locationList: formatLocations(locations),
    languageList: languagesOptions,
    dependencyList: dependencyOptions,
  };
};

export default useFiltersItems;
