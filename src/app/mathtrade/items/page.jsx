"use client";
import Filters from "@/components/filters";
import useItems from "./useItems";
import I18N from "@/i18n";
import PageHeader from "@/components/pageHeader";
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
import BanUsersModal from "@/components/ban/users/modal";
import ModalPreviewer from "@/components/previewer/modal";

const ItemsPage = () => {
  const { isLoaded, items, expandedItem, setExpandedItem, loading, error } =
    useItems();

  return (
    <>
      <PageHeader
        title="title.ItemList"
        name="items"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="Items.page.explanation" />
            </p>
          </>
        }
      />
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
      <BanUsersModal />
      <ModalPreviewer />
    </>
  );
};

export default ItemsPage;
