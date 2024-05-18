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

    if (filters.dependency) {
      filtersProc.dependency = filters.dependency.join(",");
    }

    return filtersProc;
  }, [filters]);

  const { typeList, banOptions, dependencyList } = useMemo(() => {
    const o = {
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

    return o;
  }, [filterData]);

  return {
    data: filtersProcessed,
    typeList,
    banOptions,
    dependencyList,
  };
};

export default useFilterGames;
