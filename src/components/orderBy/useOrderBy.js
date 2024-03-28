import { useContext, useCallback, useId, useMemo } from "react";
import { GotoTopContext } from "@/context/goto-top";
import { useOptions } from "@/store";

const useOrderBy = (type) => {
  const { gotoTop } = useContext(GotoTopContext);

  /* FILTERS */
  const filters_item = useOptions((state) => state.filters_item);
  const filters_game = useOptions((state) => state.filters_game);
  const filters_collection = useOptions((state) => state.filters_collection);
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const filters_wants = useOptions((state) => state.filters_wants);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS */

  const idOrderBy = useId();

  const data = useMemo(() => {
    let value = "",
      desc = false;

    let filters = {};

    switch (type) {
      case "game":
        filters = { ...filters_game };
        break;
      case "collection":
        filters = { ...filters_collection };
        break;
      case "myoffer":
        filters = { ...filters_myoffer };
        break;
      case "wants":
        filters = { ...filters_wants };
        break;
      default:
        filters = { ...filters_item };
    }

    if (filters && filters.order) {
      desc = filters.order.indexOf("-") === 0;
      value = filters.order.replace("-", "");
    }
    return {
      value,
      desc,
    };
  }, [
    type,
    filters_item,
    filters_game,
    filters_collection,
    filters_myoffer,
    filters_wants,
  ]);

  const onChangeOrderBy = useCallback(
    ({ target }) => {
      const { desc } = data;
      const orderVal = `${desc ? "-" : ""}${target.value}`;
      gotoTop();
      updateFilters(
        {
          order: orderVal === "added_mt" ? undefined : orderVal,
          page: 1,
        },
        type
      );
    },
    [data, type, updateFilters, gotoTop]
  );

  const onChangeDesc = useCallback(
    ({ target }) => {
      const { value } = data;
      const orderVal = `${target.checked ? "-" : ""}${value || "added_mt"}`;
      gotoTop();
      updateFilters(
        {
          order: orderVal === "added_mt" ? undefined : orderVal,
          page: 1,
        },
        type
      );
    },
    [data, type, updateFilters, gotoTop]
  );

  return {
    idOrderBy,
    data,
    onChangeOrderBy,
    onChangeDesc,
  };
};

export default useOrderBy;
