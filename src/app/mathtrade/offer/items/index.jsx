"use client";
import Filters from "@/components/filters";
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

const ItemsView = () => {
  const { isLoaded, items, expandedItem, setExpandedItem, loading, error } =
    useItems();

  return (
    <SectionWithSidebar name="items" loading={loading}>
      <StickyHeader>
        <Header />
      </StickyHeader>
      <SidebarGrid>
        <Sidebar>
          <Filters type="item" />
        </Sidebar>
        <div>
          <ItemTagHeader />
          <div>
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
    </SectionWithSidebar>
  );
};

export default ItemsView;
