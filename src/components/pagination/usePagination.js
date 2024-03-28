import { useEffect, useMemo, useState } from "react";

import { page_size_default } from "@/config/pagination";
import { useOptions } from "@/store";

const usePagination = (type, count, gotoTop) => {
  /* FILTERS */
  const filters_item = useOptions((state) => state.filters_item);
  const filters_game = useOptions((state) => state.filters_game);
  const filters_collection = useOptions((state) => state.filters_collection);
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const updateFilters = useOptions((state) => state.updateFilters);

  const filters = useMemo(() => {
    switch (type) {
      case "game":
        return { ...filters_game };
      case "collection":
        return { ...filters_collection };
      case "myoffer":
        return { ...filters_myoffer };
      default:
        return { ...filters_item };
    }
  }, [type, filters_item, filters_game, filters_collection, filters_myoffer]);

  /* end FILTERS */

  const [page, setPage] = useState(filters?.page || 1);

  const total = useMemo(() => {
    if (count) {
      const page_size = filters?.page_size || page_size_default;
      return Math.ceil(count / page_size);
    }
    return 1;
  }, [count, filters]);

  useEffect(() => {
    setPage(filters?.page || 1);
  }, [filters]);

  return {
    page,
    onChange: ({ target }) => {
      let newPage = parseInt(target.value, 10);
      newPage = newPage < 1 ? 1 : newPage;
      newPage = newPage > total ? total : newPage;
      setPage(newPage);
    },
    onBlur: ({ target }) => {
      const newPage = parseInt(target.value, 10);
      if (filters?.page !== newPage) {
        gotoTop();
        updateFilters({ page: newPage }, type);
      }
    },
    total,
    prevPage: () => {
      gotoTop();
      const newPage = filters.page - 1;
      updateFilters({ page: newPage }, type);
    },
    nextPage: () => {
      gotoTop();
      const newPage = (filters?.page || 1) + 1;
      updateFilters({ page: newPage }, type);
    },
    showPrevPage: filters?.page && filters?.page > 1,
    notShowNextPage: filters?.page && filters?.page >= total,
    updateFilters,
  };
};

export default usePagination;
