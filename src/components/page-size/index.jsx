import I18N from "@/i18n";
import { pageSizeOptions, page_size_default } from "@/config/pagination";
import { GotoTopContext } from "@/context/goto-top";
import Icon from "../icon";
import { useOptions } from "@/store";
import { useContext, useMemo } from "react";

const PageSize = ({ type = "item" }) => {
  const { gotoTop } = useContext(GotoTopContext);

  /* FILTERS */
  const filters_item = useOptions((state) => state.filters_item);
  const filters_game = useOptions((state) => state.filters_game);
  const filters_collection = useOptions((state) => state.filters_collection);
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTERS */

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

  return (
    <div className="flex items-center">
      <div>
        <select
          name="order"
          className="border border-stroke rounded-md px-1 text-center text-sm w-13 focus:outline-none"
          value={filters?.page_size || page_size_default}
          onChange={(e) => {
            const new_page_size = parseInt(e.target.value, 10);
            gotoTop();
            updateFilters(
              {
                page_size: new_page_size,
                page: 1,
              },
              type
            );
          }}
        >
          {pageSizeOptions.map((ps) => {
            return (
              <option value={ps} key={ps}>
                {ps}
              </option>
            );
          })}
        </select>
      </div>
      <div className="text-sm font-bold text-gray-500 whitespace-nowrap">
        <Icon />
        <I18N id="elementsPerPage.min" />
      </div>
    </div>
  );
};
export default PageSize;
