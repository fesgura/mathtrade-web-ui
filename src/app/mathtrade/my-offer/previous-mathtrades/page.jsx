"use client";
//import useMyOffer from "./useMyOffer";
import ErrorAlert from "@/components/errorAlert";
import ItemMy from "@/components/item/item-my";
import I18N from "@/i18n";
import StickyHeader from "@/components/sticky-header";
import Container from "@/components/container";
import PageHeader from "@/components/pageHeader";
import { GotoTopContextProvider } from "@/context/goto-top";
import SectionCommon from "@/components/sections/common";
//import HeaderMyOffer from "./header";
//import AddToOffer from "./add-to-offer";
import useMyOfferPreviousMTs from "./useMyOfferPreviousMTs";
import EmptyList from "@/components/emptyList";

const MyItemsPage = () => {
  const { isLoaded, items, loading, error } = useMyOfferPreviousMTs();

  return (
    <>
      <PageHeader
        title="title.MyItemsPreviousMathtrades"
        name="myOffer"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="MyItemsPreviousMathtrades.page.explanation" />
            </p>
          </>
        }
      />
      <SectionCommon loading={loading}>
        <GotoTopContextProvider>
          <StickyHeader>
            {/* <HeaderMyOffer count={items.length} /> */}
            header
          </StickyHeader>
          <Container size="md">
            {items.map((itemRaw) => {
              return <ItemMy key={itemRaw.id} itemRaw={itemRaw} />;
            })}
            <EmptyList
              visible={isLoaded && !(items?.length || 0) && !error}
              message="EmptyList.myOffer"
            />

            <ErrorAlert error={error} />
          </Container>
        </GotoTopContextProvider>
      </SectionCommon>
    </>
  );
};

export default MyItemsPage;
