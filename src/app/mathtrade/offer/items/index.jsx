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

const ItemsView = () => {
  const { isLoaded, items, expandedItem, setExpandedItem, loading, error } =
    useItems();

  return (
    <SectionWithSidebar name="items" loading={loading} topNotRounded>
      <GotoTopContextProvider>
        <SidebarGrid>
          <Sidebar topNotRounded>
            <Filters type="item" />
          </Sidebar>
          <div>
            <StickyHeader>
              <Header />
            </StickyHeader>
            <ItemTagHeader />
            <div className="md:px-7 px-3 py-7">
              <div className="item-grid">
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
                visible={isLoaded && !(items?.list?.length || 0) && !error}
                message="EmptyList.items"
              />
              <ErrorAlert error={error} className="mt-3" />
            </div>
          </div>
        </SidebarGrid>
        <Footer />
      </GotoTopContextProvider>
    </SectionWithSidebar>
  );
};

export default ItemsView;
