"use client";
import { useStore, useOptions } from "@/store";
import { useContext, useMemo, useCallback, useEffect } from "react";
import { getI18Ntext } from "@/i18n";
import { boxStatusList, componentsStatusList } from "@/config/statusTypes";
import { languagesOptions } from "@/config";
import {
  dependencyChipsFromCounts,
  dependencyOptions,
} from "@/config/dependencyTypes";
import { banOptionsValues } from "@/config/banOptions";
import { formatLocations } from "@/utils";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";

const useFiltersItems = () => {
  const { users, setUsers, loadingUsers, setLoadingUsers, filterData } =
    useContext(PageContext);

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
    const { wantable, favorite } = filtersProc;
    delete filtersProc.wantable;
    if (wantable === "true") {
      filtersProc.wantable = true;
    }
    delete filtersProc.favorite;
    if (favorite === "true") {
      filtersProc.favorite = true;
    }

    if (Array.isArray(filters.dependency)) {
      filtersProc.dependency = filters.dependency.join(",");
    }
    if (Array.isArray(filters.language)) {
      filtersProc.language = filters.language.join(",");
    }
    if (Array.isArray(filters.location)) {
      filtersProc.location = filters.location.join(",");
    }
    if (Array.isArray(filters.tag)) {
      filtersProc.tag = filters.tag.join(",");
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
    const typeList = (() => {
      const li = [
        { value: "1", text: getI18Ntext("filter.Type.Game") },
        { value: "2", text: getI18Ntext("filter.Type.Expansion") },
        { value: "3", text: getI18Ntext("filter.Type.Other") },
      ];
      if (filterData?.type) {
        return li
          .map((elem) => {
            const value = parseInt(elem.value, 10);
            const num = filterData?.type?.[value] || 0;
            return { ...elem, text: `${elem.text} (${num})`, num };
          })
          .filter(({ num }) => num > 0);
      }
      return li;
    })();

    const dependencyList =
      dependencyChipsFromCounts(filterData?.dependency) || dependencyOptions;

    const withStatusCounts = (list, counts) => {
      if (!counts) return list;
      return list
        .map((st) => {
          const num = counts[st.value] || 0;
          if (!num) return null;
          return { ...st, text: `${st.text} (${num})`, count: num };
        })
        .filter(Boolean);
    };

    const fromLang = (() => {
      const counts = filterData?.language;
      if (!counts || typeof counts !== "object") return [];
      const merged: Record<
        string,
        { value: string; text: string; count: number }
      > = {};
      Object.entries(counts).forEach(([rawKey, num]) => {
        const key = `${rawKey}`.trim();
        if (!key || key === "null" || key === "None" || key === "undefined") {
          return;
        }
        const count = Number(num) || 0;
        if (!count) return;
        const known = languagesOptions.find(
          (st) => st.value.toLowerCase() === key.toLowerCase()
        );
        const value = known?.value || key;
        if (!merged[value]) {
          merged[value] = {
            value,
            text: known?.text || key,
            count: 0,
          };
        }
        merged[value].count += count;
      });
      return Object.values(merged)
        .sort((a, b) => b.count - a.count || a.text.localeCompare(b.text, "es"))
        .map((item) => ({
          ...item,
          text: item.count ? `${item.text} (${item.count})` : item.text,
        }));
    })();

    const locationList = (() => {
      const li = formatLocations(locations, filterData?.locations);
      if (filterData?.locations) {
        return li
          .map((st) => {
            if (!st.num) return null;
            if (st?.type === "group") return st;
            return { ...st, text: `${st.text} (${st.num})` };
          })
          .filter((v) => v !== null);
      }
      return li;
    })();

    return {
      typeList,
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
      dependencyList,
      statusBoxOptions: withStatusCounts(boxStatusList, filterData?.box_status),
      statusComponentsOptions: withStatusCounts(
        componentsStatusList,
        filterData?.component_status
      ),
      languageList: fromLang,
      locationList,
    };
  }, [filterData, locations]);

  const userList = useMemo(() => {
    if (!users?.length) return [];
    return [...users]
      .sort((a, b) => (a?.last_name < b?.last_name ? -1 : 1))
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
