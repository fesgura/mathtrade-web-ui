import { useEffect, useContext } from "react";
import { PageContext } from "@/context/page";
import I18N, { getI18Ntext } from "@/i18n";
import OrderBy from "@/components/orderBy";
import { SidebarToggleButton } from "@/components/sections/with-sidebar";
import InnerButton from "@/components/button/inner-button";
import Icon from "@/components/icon";
import { useOptions } from "@/store";
import ListToolbar from "@/components/list-toolbar";
import ListSearch from "@/components/list-toolbar/search";
import OptionChips from "@/components/filters/optionChips";

const HeaderMyOffer = ({ count }) => {
  const filters_myoffer = useOptions((state) => state.filters_myoffer);
  const updateFilters = useOptions((state) => state.updateFilters);

  useEffect(() => {
    if (Object.keys(filters_myoffer).length <= 0) {
      updateFilters({ order: "-added_mt", page: 1 }, "myoffer");
    }
  }, [filters_myoffer, updateFilters]);

  const { myGroups } = useContext(PageContext);

  return (
    <ListToolbar
      className="rounded-t-main"
      leading={
        <SidebarToggleButton
          className="h-[34px] px-3 rounded-full text-caption font-bold transition-colors shrink-0"
          classNameNotHighlighted="text-primary bg-primary/10"
          classNameHighlighted="text-white bg-primary"
        >
          <InnerButton>
            <Icon type="collection" className="text-sm" />
            {/* Labelled on every size: an icon-only toggle on mobile made
                groups hard to find. */}
            <span>
              <span className="sm:hidden">
                <I18N id="myGroups.groupHeaderShort" />
              </span>
              <span className="hidden sm:inline">
                <I18N id="myGroups.groupHeader" />
              </span>
              {myGroups.length > 0 ? ` (${myGroups.length})` : ""}
            </span>
          </InnerButton>
        </SidebarToggleButton>
      }
      search={
        <ListSearch
          value={filters_myoffer?.keyword || ""}
          onChange={(keyword) => {
            updateFilters({ keyword: keyword || undefined }, "myoffer");
          }}
        />
      }
      count={
        <I18N
          id={`itemCount.${count === 1 ? "one" : "many"}`}
          values={[count]}
        />
      }
      extra={
        <OptionChips
          filterType="myoffer"
          name="ready"
          allowEmpty
          emptyLabel={getI18Ntext("myOffer.filter.ready.all")}
          options={[
            { value: "ready", text: getI18Ntext("myOffer.filter.ready.ready") },
            { value: "missing", text: getI18Ntext("myOffer.filter.ready.missing") },
          ]}
        />
      }
      sort={
        <OrderBy
          type="myoffer"
          options={[
            { text: getI18Ntext("element.Date"), value: "none" },
            { text: getI18Ntext("element.Name"), value: "title" },
            { text: getI18Ntext("element.Value"), value: "value" },
          ]}
        />
      }
    />
  );
};

export default HeaderMyOffer;
