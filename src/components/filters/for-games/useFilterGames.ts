"use client";
import { useMemo, useContext } from "react";
import { PageContext } from "@/context/page";
import { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import {
  dependencyChipsFromCounts,
  dependencyOptions,
} from "@/config/dependencyTypes";
import { banOptionsValues } from "@/config/banOptions";

const useFilterGames = () => {
  const { filterData } = useContext(PageContext);
  const filters = useOptions((state) => state.filters_game);

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

    return filtersProc;
  }, [filters]);

  const { typeList, banOptions, dependencyList } = useMemo(() => {
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

    return {
      typeList,
      banOptions: [
        {
          value: banOptionsValues.undefined_value,
          text: getI18Ntext("ban.btn-filter.hide.game"),
        },
        {
          value: banOptionsValues.true_value,
          text: getI18Ntext("ban.btn-filter.show.game"),
        },
        {
          value: banOptionsValues.false_value,
          text: getI18Ntext("ban.btn-filter.all.game"),
        },
      ],
      dependencyList:
        dependencyChipsFromCounts(filterData?.dependency) || dependencyOptions,
    };
  }, [filterData]);

  return {
    data: filtersProcessed,
    typeList,
    banOptions,
    dependencyList,
  };
};

export default useFilterGames;
