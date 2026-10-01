"use client";
import { useContext } from "react";
import { PageContext } from "@/context/page";
import { GotoTopContext } from "@/context/goto-top";
import I18N, { getI18Ntext } from "@/i18n";
import Pagination from "@/components/pagination";
import OrderBy from "@/components/orderBy";
import PageSize from "@/components/page-size";
import FilterToggleButton from "@/components/filters/filterToggleButton";
import ActiveFilterChips from "@/components/filters/activeChips";
import ListToolbar from "@/components/list-toolbar";
import ListSearch from "@/components/list-toolbar/search";
import { useOptions } from "@/store";

const Header = () => {
  const { items } = useContext(PageContext);
  const { count } = items;
  const { gotoTop } = useContext(GotoTopContext);
  const filters = useOptions((state) => state.filters_item);
  const updateFilters = useOptions((state) => state.updateFilters);

  return (
    <ListToolbar
      leading={
        <>
          <FilterToggleButton type="item" />
          <ActiveFilterChips type="item" />
        </>
      }
      search={
        <ListSearch
          value={filters?.keyword || ""}
          onChange={(keyword) => {
            gotoTop();
            updateFilters({ keyword: keyword || undefined, page: 1 }, "item");
          }}
        />
      }
      count={
        <I18N
          id={`itemCount.${count === 1 ? "one" : "many"}`}
          values={[count]}
        />
      }
      sort={
        <OrderBy
          type="item"
          options={[
            { text: getI18Ntext("element.Date"), value: "added_mt" },
            { text: getI18Ntext("element.Name"), value: "name" },
            { text: getI18Ntext("element.Value"), value: "value" },
            { text: getI18Ntext("element.Language"), value: "language" },
            { text: getI18Ntext("element.Status"), value: "status" },
          ]}
        />
      }
      trailing={
        <>
          <PageSize type="item" />
          <Pagination type="item" count={count} />
        </>
      }
    />
  );
};

export default Header;
