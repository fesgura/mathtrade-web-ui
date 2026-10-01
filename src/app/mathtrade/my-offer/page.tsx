"use client";
import { useContext } from "react";
import useMyOffer from "./useMyOffer";
import ErrorAlert from "@/components/errorAlert";
import ItemMy from "@/components/item/item-my";
import StickyHeader from "@/components/sticky-header";
import PageHeader from "@/components/pageHeader";
import { GotoTopContextProvider } from "@/context/goto-top";
import { ItemPreviousMTContextProvider } from "@/context/itemPreviousMT";
import { PageContext } from "@/context/page";
import SectionWithSidebar, {
  SidebarGrid,
  Sidebar,
} from "@/components/sections/with-sidebar";
import HeaderMyOffer from "./header";
import MyGroupsSidebar from "@/components/item-mygroups/mygroups-sidebar";
import EmptyList from "@/components/emptyList";
import NewItem from "@/components/item/item-my/new-item";
import ItemsPreviousMT from "@/components/itemsPreviousMT";
import NewUserOfferAlert from "@/components/NewUserOfferAlert";
import GroupBar from "@/components/item-mygroups/group-bar";
import GroupsHint from "@/components/item-mygroups/groups-hint";
import I18N from "@/i18n";
import useTour from "@/tours/useTour";
import { useTourDemo } from "@/tours/context";
import TourDemo from "@/tours/demo/TourDemo";
import { demoMyItem } from "@/tours/demo/demoData";

const MyItemsPage = () => {
  const { isLoaded, items, loading, error, canAddNewElement } = useMyOffer();
  const { canI } = useContext(PageContext);
  // Guided tutorial (src/tours): once the list is on screen.
  useTour("my-offer", { ready: !loading && isLoaded });
  // Nothing offered while the tutorial runs: an example copy to explain.
  const showDemo = useTourDemo("my-offer") && !items.length;

  return (
    <>
      <PageHeader
        variant="compact"
        title="title.MyItems"
        helpId="page.myOffer"
        alert={canI?.want ? <I18N id="collection.offerClosed.wants" /> : null}
        alertTone="warning"
      />
      <ItemPreviousMTContextProvider>
        <SectionWithSidebar name="myoffer" loading={loading}>
          <GotoTopContextProvider>
            <SidebarGrid>
              <Sidebar titleId="myGroups.groupHeader">
                <div data-tour="myoffer.groups">
                  <MyGroupsSidebar />
                </div>
              </Sidebar>
              <div>
                <StickyHeader>
                  <HeaderMyOffer count={items.length} />
                </StickyHeader>
                <div className="md:px-7 px-3 py-7">
                  <div className="max-w-[860px] mx-auto">
                    <GroupsHint />
                    <GroupBar />
                    <NewUserOfferAlert />
                    {canAddNewElement && <NewItem />}
                    {items.map((itemRaw, index) => {
                      return (
                        <ItemMy
                          key={itemRaw.id}
                          itemRaw={itemRaw}
                          tourAnchor={index === 0 ? "myoffer.item" : undefined}
                        />
                      );
                    })}
                    {showDemo ? (
                      <TourDemo>
                        <ItemMy itemRaw={demoMyItem} tourAnchor="myoffer.item" />
                      </TourDemo>
                    ) : null}
                    <EmptyList
                      visible={isLoaded && !(items?.length || 0) && !error && !showDemo}
                      message="EmptyList.myOffer"
                    />

                    <ErrorAlert error={error} />
                  </div>
                </div>
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
