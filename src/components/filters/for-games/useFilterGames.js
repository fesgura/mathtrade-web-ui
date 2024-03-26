import { useMemo } from "react";
import { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import { dependencyOptions } from "@/config/dependencyTypes";

const useFilterGames = () => {
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

    return filtersProc;
  }, [filters]);

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
          text: getI18Ntext("ban.btn-filter.hide.game"),
        },
        {
          value: "yes",
          text: getI18Ntext("ban.btn-filter.show.game"),
        },
      ],
    };
  }, []);

  return {
    data: filtersProcessed,
    typeList,
    banOptions,
    dependencyList: dependencyOptions,
  };
};

export default useFilterGames;
