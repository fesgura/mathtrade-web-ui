"use client";
import Filters from "@/components/filters";
import { GotoTopContextProvider } from "@/context/goto-top";
import useItems from "./useItems";
import SectionWithSidebar, {
  SidebarGrid,
  Sidebar,
} from "@/components/sections/with-sidebar";
import StickyHeader from "@/components/sticky-header";
import ItemGrid from "@/components/item/item-grid";
import Header from "./header";
import ItemTagHeader from "@/components/item-tags/item-tag-header";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import Footer from "./footer";
import useTour from "@/tours/useTour";
import { useTourDemo } from "@/tours/context";
import TourDemo from "@/tours/demo/TourDemo";
import { demoOtherItem } from "@/tours/demo/demoData";
import NewSinceNotice from "@/components/newSinceNotice";
import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { useOptions } from "@/store";
import BulkSelectProvider from "@/components/ban/bulk/BulkSelectProvider";
import SelectionBar from "@/components/ban/bulk/SelectionBar";
import { isWantedItem } from "@/components/ban/isWanted";

const ItemsView = () => {
  const {
    isLoaded,
    items,
    expandedItem,
    setExpandedItem,
    loading,
    error,
    newCount,
    refreshList,
  } = useItems();
  // Guided tutorial (src/tours): once the first page is on screen.
  // Ready once loaded, even if empty: then the tour shows an example copy.
  useTour("items", { ready: !loading && isLoaded });
  const showDemo = useTourDemo("items");

  // Bulk ignore: a new page or filter clears the selection.
  const filters = useOptions((state) => state.filters_item);
  const resetKey = useMemo(() => JSON.stringify(filters || {}), [filters]);
  const { myWants } = useContext(PageContext);
  const isWanted = useCallback(
    (itemId: number) =>
      isWantedItem(
        items.list.find((i) => i.id === itemId),
        myWants
      ),
    [items.list, myWants]
  );

  return (
    <SectionWithSidebar name="items" loading={loading} topNotRounded>
      <GotoTopContextProvider>
      <BulkSelectProvider kind="item" resetKey={resetKey}>
        <SidebarGrid>
          <Sidebar topNotRounded>
            <Filters type="item" />
          </Sidebar>
          <div>
            <StickyHeader>
              <Header />
            </StickyHeader>
            <ItemTagHeader />
            <NewSinceNotice count={newCount} onRefresh={refreshList} />
            <div className="md:px-7 px-3 py-7">
              <div className="item-grid">
                {showDemo ? (
                  <TourDemo>
                    <ItemGrid itemRaw={demoOtherItem} expanded={null} setExpanded={() => {}} />
                  </TourDemo>
                ) : null}
                {items.list.map((itemRaw) => {
                  return (
                    <ItemGrid
                      key={itemRaw.id}
                      itemRaw={itemRaw}
                      expanded={expandedItem}
                      setExpanded={setExpandedItem}
                    />
                  );
                })}
              </div>
              <EmptyList
                visible={isLoaded && !(items?.list?.length || 0) && !error && !showDemo}
                message="EmptyList.items"
              />
              <ErrorAlert error={error} className="mt-3" />
            </div>
          </div>
        </SidebarGrid>
        <Footer />
        <SelectionBar isWanted={isWanted} />
      </BulkSelectProvider>
      </GotoTopContextProvider>
    </SectionWithSidebar>
  );
};

export default ItemsView;
