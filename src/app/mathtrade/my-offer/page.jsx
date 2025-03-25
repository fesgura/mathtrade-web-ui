"use client";
import useMyOffer from "./useMyOffer";
import ErrorAlert from "@/components/errorAlert";
import ItemMy from "@/components/item/item-my";
import I18N from "@/i18n";
import StickyHeader from "@/components/sticky-header";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import { GotoTopContextProvider } from "@/context/goto-top";
import { ItemPreviousMTContextProvider } from "@/context/itemPreviousMT";
import SectionWithSidebar, {
  SidebarGrid,
  Sidebar,
} from "@/components/sections/with-sidebar";
import HeaderMyOffer from "./header";
//import AddToOffer from "./add-to-offer";
import MyGroupsSidebar from "@/components/item-mygroups/mygroups-sidebar";
import EmptyList from "@/components/emptyList";
import NewItem from "@/components/item/item-my/new-item";
import ItemsPreviousMT from "@/components/itemsPreviousMT";

const MyItemsPage = () => {
  const { isLoaded, items, loading, error } = useMyOffer();

  return (
    <>
      <PageHeader
        title="title.MyItems"
        name="myOffer"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="MyItems.page.explanation" />
            </p>
          </>
        }
      />
      <ItemPreviousMTContextProvider>
        <SectionWithSidebar name="myoffer" loading={loading}>
          <GotoTopContextProvider>
            <StickyHeader>
              <HeaderMyOffer count={items.length} />
            </StickyHeader>
            <SidebarGrid>
              <Sidebar>
                <MyGroupsSidebar />
              </Sidebar>
              <div>
                <Container size="md">
                  <NewItem />
                  {items.map((itemRaw) => {
                    return <ItemMy key={itemRaw.id} itemRaw={itemRaw} />;
                  })}
                  <EmptyList
                    visible={isLoaded && !(items?.length || 0) && !error}
                    message="EmptyList.myOffer"
                  />

                  <ErrorAlert error={error} />
                </Container>
              </div>
            </SidebarGrid>
          </GotoTopContextProvider>
        </SectionWithSidebar>
        <ItemsPreviousMT />
      </ItemPreviousMTContextProvider>
    </>
  );
};

export default MyItemsPage;
