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
  const { games } = useContext(PageContext);
  const { count } = games;
  const { gotoTop } = useContext(GotoTopContext);
  const filters = useOptions((state) => state.filters_game);
  const updateFilters = useOptions((state) => state.updateFilters);

  return (
    <ListToolbar
      leading={
        <>
          <FilterToggleButton type="game" />
          <ActiveFilterChips type="game" />
        </>
      }
      search={
        <ListSearch
          value={filters?.keyword || ""}
          onChange={(keyword) => {
            gotoTop();
            updateFilters({ keyword: keyword || undefined, page: 1 }, "game");
          }}
        />
      }
      count={
        <I18N
          id={`gameCount.${count === 1 ? "one" : "many"}`}
          values={[count]}
        />
      }
      sort={
        <OrderBy
          type="game"
          options={[
            { text: getI18Ntext("element.Name"), value: "name" },
            { text: getI18Ntext("element.Date"), value: "last_update" },
            { text: getI18Ntext("element.Value"), value: "value" },
            { text: getI18Ntext("element.Year"), value: "year" },
            { text: getI18Ntext("element.BGG.rank"), value: "rank" },
            { text: getI18Ntext("element.BGG.weight"), value: "weight" },
            { text: getI18Ntext("element.BGG.rating"), value: "rate" },
            { text: getI18Ntext("element.BGG.id"), value: "bgg_id" },
          ]}
        />
      }
      trailing={
        <>
          <PageSize type="game" />
          <Pagination type="game" count={count} />
        </>
      }
    />
  );
};

export default Header;
