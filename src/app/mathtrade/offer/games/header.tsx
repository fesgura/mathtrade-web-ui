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
import ClearAllScores from "@/components/value/clear-all";
import SelectModeButton from "@/components/ban/bulk/SelectModeButton";
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
          <FilterToggleButton type="game" tourAnchor="offer.filters" />
          <ActiveFilterChips type="game" />
        </>
      }
      search={
        <ListSearch
          tourAnchor="offer.search"
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
            {
              text: getI18Ntext("element.BGG.rank"),
              value: "rank",
              inverted: true,
            },
            { text: getI18Ntext("element.BGG.weight"), value: "weight" },
            { text: getI18Ntext("element.BGG.rating.geek"), value: "rate" },
            { text: getI18Ntext("element.BGG.rating.avg"), value: "average_rate" },
          ]}
        />
      }
      trailing={
        <>
          <SelectModeButton />
          <ClearAllScores scope="others" className="" />
          <PageSize type="game" />
          <Pagination type="game" count={count} />
        </>
      }
    />
  );
};

export default Header;
