import { useStore, useOptions } from "@/store";
import { useContext, useMemo, useCallback, useEffect } from "react";
import { getI18Ntext } from "@/i18n";
import { boxStatusList, componentsStatusList } from "@/config/statusTypes";
import { languagesOptions } from "@/config";
import { dependencyOptions } from "@/config/dependencyTypes";
import { banOptionsValues } from "@/config/banOptions";
import { formatLocations } from "@/utils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useFiltersItems = () => {
  /* PAGE CONTEXT **********************************************/
  const { users, setUsers, loadingUsers, setLoadingUsers, filterData } =
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
      if (typeof filters.ignored === "boolean") {
        filtersProc.ignored = banOptionsValues.false_value;
      } else {
        filtersProc.ignored = banOptionsValues.undefined_value;
      }
    } else {
      filtersProc.ignored = banOptionsValues.true_value;
    }

    const { wanted } = filtersProc;
    delete filtersProc.wanted;
    if (wanted === false) {
      filtersProc.hide_wanted = true;
    }
    const { wantable } = filtersProc;
    delete filtersProc.wantable;
    if (wantable === "true") {
      filtersProc.wantable = true;
    }

    if (filters.dependency) {
      filtersProc.dependency = filters.dependency.join(",");
    }
    if (filters.location) {
      filtersProc.location = filters.location.join(",");
    }

    return filtersProc;
  }, [filters]);

  const {
    typeList,
    banOptions,
    dependencyList,
    statusBoxOptions,
    statusComponentsOptions,
    languageList,
    locationList,
  } = useMemo(() => {
    const o = {
      banOptions: [
        {
          value: banOptionsValues.undefined_value,
          text: getI18Ntext("ban.btn-filter.hide.item"),
        },
        {
          value: banOptionsValues.true_value,
          text: getI18Ntext("ban.btn-filter.show.item"),
        },
        {
          value: banOptionsValues.false_value,
          text: getI18Ntext("ban.btn-filter.all.item"),
        },
      ],
    };

    o.typeList = (() => {
      const li = [
        {
          value: "1",
          text: `${getI18Ntext("filter.Type.Game")}`,
        },
        {
          value: "2",
          text: `${getI18Ntext("filter.Type.Expansion")}`,
        },
        {
          value: "3",
          text: `${getI18Ntext("filter.Type.Other")}`,
        },
      ];
      if (filterData?.type) {
        return li
          .map((elem) => {
            const value = parseInt(elem.value, 10);
            return {
              ...elem,
              text: elem.text + ` (${filterData?.type?.[value] || 0})`,
              num: filterData?.type?.[value] || 0,
            };
          })
          .filter(({ num }) => num > 0);
      }
      return li;
    })();

    o.dependencyList = (() => {
      const li = [...dependencyOptions];
      if (filterData?.dependency) {
        return li
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
          .filter((v) => v !== null);
      }
      return li;
    })();

    o.statusBoxOptions = (() => {
      const li = [...boxStatusList];
      if (filterData?.box_status) {
        return li
          .map((st) => {
            const num = filterData?.box_status?.[st.value] || 0;
            if (!num) {
              return null;
            }
            return {
              ...st,
              text: `${st.text} (${num})`,
            };
          })
          .filter((v) => v !== null);
      }
      return li;
    })();
    o.statusComponentsOptions = (() => {
      const li = [...componentsStatusList];
      if (filterData?.component_status) {
        return li
          .map((st) => {
            const num = filterData?.component_status?.[st.value] || 0;
            if (!num) {
              return null;
            }
            return {
              ...st,
              text: `${st.text} (${num})`,
            };
          })
          .filter((v) => v !== null);
      }
      return li;
    })();
    /*

    */

    o.languageList = (() => {
      const li = [...languagesOptions];
      if (filterData?.language) {
        li.map((st) => {
          const num = filterData?.language?.[st.value] || 0;
          if (!num) {
            return null;
          }
          return {
            ...st,
            text: `${st.text} (${num})`,
          };
        }).filter((v) => v !== null);
      }
      return li;
    })();

    o.locationList = (() => {
      const li = formatLocations(locations, filterData?.locations);

      if (filterData?.locations) {
        return li
          .map((st) => {
            if (!st.num) {
              return null;
            }
            if (st?.type === "group") {
              return st;
            }
            return {
              ...st,
              text: `${st.text} (${st.num})`,
            };
          })
          .filter((v) => v !== null);
      }
      return li;
    })();

    return o;
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
    banOptions,
    statusBoxOptions,
    statusComponentsOptions,
    locationList,
    languageList,
    dependencyList,
  };
};

export default useFiltersItems;
