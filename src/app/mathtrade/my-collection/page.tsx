"use client";
import useMyCollection from "./useMyCollection";
import { GotoTopContextProvider } from "@/context/goto-top";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
//import ItemMy from "@/components/item/item-my";
//import NewItem from "@/components/item/item-my/new-item";
import ElementWrapperOuter from "@/components/element/elementCollection/elementWrapperOuter";
import ElementCollection from "@/components/element/elementCollection";
import NewElement from "@/components/element/newElement";
import I18N from "@/i18n";
import PageHeader from "@/components/pageHeader";
import OrderBy from "@/components/orderBy";
import StickyHeader from "@/components/sticky-header";
import HelpContext from "@/components/help-context";
import Faq from "@/components/faq";
import ListToolbar from "@/components/list-toolbar";
import ListSearch from "@/components/list-toolbar/search";

const collectionFaq = {
  question: "collectionFaq.question",
  answer: ["collectionFaq.answer.1"],
};

const MyCollectionPage = () => {
  const {
    elementList,
    loading,
    error,
    filters_collection,
    searchText,
    optionsOrder,
    canI,
  } = useMyCollection();

  return (
    <>
      <PageHeader
        variant="compact"
        title="title.MyCollection"
        helpId="page.myCollection"
        alert={
          canI?.want ? <I18N id="collection.offerClosed.wants" /> : null
        }
        alertTone="warning"
      />
      <SectionCommon loading={loading}>
        <GotoTopContextProvider>
          <StickyHeader>
            <ListToolbar
              className="rounded-t-main"
              search={
                <ListSearch
                  value={filters_collection?.keyword || ""}
                  onChange={searchText}
                />
              }
              count={
                <I18N
                  id={`elementCount.${
                    elementList.length === 1 ? "one" : "many"
                  }`}
                  values={[elementList.length]}
                />
              }
              extra={
                canI.offer ? (
                  <HelpContext id="howToOfferCollection" />
                ) : null
              }
              sort={<OrderBy type="collection" options={optionsOrder} />}
            />
          </StickyHeader>

          <div className="md:px-7 px-3 py-7">
            <Faq data={collectionFaq} translate accent />
            <ElementWrapperOuter>
              <NewElement />
            </ElementWrapperOuter>
            <div className="collection-grid">
              {elementList.map((element) => {
                return (
                  <ElementWrapperOuter key={element.id}>
                    <ElementCollection element={{ element }} showAddToMT />
                  </ElementWrapperOuter>
                );
              })}
            </div>

            <ErrorAlert error={error} />
          </div>
        </GotoTopContextProvider>
      </SectionCommon>
    </>
  );
};

export default MyCollectionPage;
