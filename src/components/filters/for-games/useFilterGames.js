import { useMemo, useContext } from "react";
import { PageContext } from "@/context/page";
import { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import { dependencyOptions } from "@/config/dependencyTypes";

const useFilterGames = () => {
  /* PAGE CONTEXT **********************************************/
  const { filterData } = useContext(PageContext);

  const filters = useOptions((state) => state.filters_game);

  /*   useEffect(() => {
    setMyUserHidden(filters?.user && filters.user < 0);
  }, [filters?.user]); */

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

    const { wanted } = filtersProc;
    delete filtersProc.wanted;
    if (wanted === false) {
      filtersProc.hide_wanted = true;
    }

    return filtersProc;
  }, [filters]);

  const { typeList, banOptions, dependencyList } = useMemo(() => {
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
          text: getI18Ntext("ban.btn-filter.hide.game"),
        },
        {
          value: "yes",
          text: getI18Ntext("ban.btn-filter.show.game"),
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
