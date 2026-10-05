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
    if (Array.isArray(filters.best_players)) {
      filtersProc.best_players = filters.best_players.join(",");
    }
    if (Array.isArray(filters.players)) {
      filtersProc.players = filters.players.join(",");
    }
    if (Array.isArray(filters.category)) {
      filtersProc.category = filters.category.join(",");
    }
    if (Array.isArray(filters.mechanic)) {
      filtersProc.mechanic = filters.mechanic.join(",");
    }

    return filtersProc;
  }, [filters]);

  const {
    typeList,
    banOptions,
    dependencyList,
    bestPlayersList,
    playersList,
    categoryList,
    mechanicList,
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

    const bestPlayersList = (() => {
      const counts = filterData?.best_players || {};
      return Object.keys(counts)
        .map((value) => ({
          value,
          text: `${value} (${counts[value]})`,
          num: counts[value],
        }))
        .filter(({ num }) => num > 0)
        .sort((a, b) => Number(a.value) - Number(b.value));
    })();

    const playersList = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
      value: `${n}`,
      text: `${n}`,
    }));

    const categoryList = (filterData?.categories || []).map(
      (row: { bgg_id: number; name: string; count: number }) => ({
        value: `${row.bgg_id}`,
        text: `${row.name} (${row.count})`,
      })
    );

    const mechanicList = (filterData?.mechanisms || []).map(
      (row: { bgg_id: number; name: string; count: number }) => ({
        value: `${row.bgg_id}`,
        text: `${row.name} (${row.count})`,
      })
    );

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
      bestPlayersList,
      playersList,
      categoryList,
      mechanicList,
    };
  }, [filterData]);

  return {
    data: filtersProcessed,
    typeList,
    banOptions,
    dependencyList,
    bestPlayersList,
    playersList,
    categoryList,
    mechanicList,
  };
};

export default useFilterGames;
