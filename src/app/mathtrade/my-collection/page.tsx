"use client";
import React, { useState, useCallback, useContext } from "react";
import useMyCollection from "./useMyCollection";
import { GotoTopContextProvider } from "@/context/goto-top";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
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
import useTour from "@/tours/useTour";
import { useTourDemo } from "@/tours/context";
import TourDemo from "@/tours/demo/TourDemo";
import { demoElement } from "@/tours/demo/demoData";
import ImportBggModal from "@/components/element/importBggModal";
import { PageContext } from "@/context/page";
import OptionChips from "@/components/filters/optionChips";
import { getI18Ntext } from "@/i18n";

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
  useTour("my-collection", { ready: !loading });
  // Empty collection while the tutorial runs: an example card to explain.
  const showDemo = useTourDemo("my-collection") && !elementList.length;

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const { forceReloadPage } = useContext(PageContext) as any;

  const handleOpenImportModal = useCallback(() => setIsImportModalOpen(true), []);
  const handleCloseImportModal = useCallback(() => setIsImportModalOpen(false), []);
  const handleImportSuccess = useCallback(() => {
    forceReloadPage();
  }, [forceReloadPage]);

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
                  tourAnchor="mycollection.search"
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
                <div className="flex items-center gap-4">
                  {canI.offer ? (
                    <HelpContext id="howToOfferCollection" />
                  ) : null}
                  <OptionChips
                    filterType="collection"
                    name="ready"
                    allowEmpty
                    emptyLabel={getI18Ntext("myOffer.filter.ready.all")}
                    options={[
                      {
                        value: "ready",
                        text: getI18Ntext("myOffer.filter.ready.ready"),
                      },
                      {
                        value: "missing",
                        text: getI18Ntext("myOffer.filter.ready.missing"),
                      },
                    ]}
                  />
                </div>
              }
              sort={<OrderBy type="collection" options={optionsOrder} />}
            />
          </StickyHeader>

          <div className="md:px-7 px-3 py-7">
            <Faq data={collectionFaq} translate accent />
            <ElementWrapperOuter tourAnchor="mycollection.new">
              <NewElement onOpenImportBgg={handleOpenImportModal} />
            </ElementWrapperOuter>
            <div className="collection-grid">
              {showDemo ? (
                <TourDemo>
                  <ElementWrapperOuter tourAnchor="mycollection.item">
                    <ElementCollection element={{ element: demoElement }} showAddToMT />
                  </ElementWrapperOuter>
                </TourDemo>
              ) : null}
              {elementList.map((element, index) => {
                return (
                  <ElementWrapperOuter
                    key={element.id}
                    tourAnchor={index === 0 ? "mycollection.item" : undefined}
                  >
                    <ElementCollection element={{ element }} showAddToMT />
                  </ElementWrapperOuter>
                );
              })}
            </div>

            <ErrorAlert error={error} />
          </div>
        </GotoTopContextProvider>
      </SectionCommon>
      <ImportBggModal
        isOpen={isImportModalOpen}
        onClose={handleCloseImportModal}
        onSuccess={handleImportSuccess}
      />
    </>
  );
};

export default MyCollectionPage;
