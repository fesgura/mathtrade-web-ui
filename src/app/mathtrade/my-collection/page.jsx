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
import I18N, { getI18Ntext } from "@/i18n";
import PageHeader from "@/components/pageHeader";
import OrderBy from "@/components/orderBy";
import StickyHeader from "@/components/sticky-header";
import HelpContext from "@/components/help-context";
import Faq from "@/components/faq";

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
        title="title.MyCollection"
        name="myCollection"
        description={
          <p>
            <I18N id="MyCollection.page.explanation" />
          </p>
        }
        bgImg="4"
      />
      <SectionCommon
        loading={loading}
        size="md"
        title="title.MyCollection"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="MyCollection.page.explanation" />
            </p>
          </>
        }
      >
        <GotoTopContextProvider>
          <StickyHeader size="md">
            <div className="flex sm:flex-row flex-col items-center sm:gap-3 py-3 md:px-8 px-3 justify-between bg-colorMain rounded-t-main">
              <div className="flex flex-wrap items-center sm:justify-normal justify-center gap-3 md:pb-0 pb-3">
                <label className="block text-sm font-bold text-gray-500 whitespace-nowrap">
                  <I18N id="filter.Search" />
                </label>
                <input
                  type="text"
                  placeholder={getI18Ntext("filter.Search")}
                  value={filters_collection?.keyword || ""}
                  onChange={searchText}
                  className="border border-stroke rounded-md p-1 text-xs focus:outline-none"
                />
                <div className="font-bold italic text-gray-700">
                  <I18N
                    id={`elementCount.${
                      elementList.length === 1 ? "one" : "many"
                    }`}
                    values={[elementList.length]}
                  />
                </div>
                {canI.offer ? (
                  <div className="">
                    <HelpContext id="howToOfferCollection" />
                  </div>
                ) : null}
              </div>

              <div>
                <OrderBy type="collection" options={optionsOrder} />
              </div>
            </div>
          </StickyHeader>

          <div className="md:px-7 px-3 py-7">
            <div className="max-w-[860px] mx-auto">
              <Faq data={collectionFaq} translate />
              <ElementWrapperOuter>
                <NewElement />
              </ElementWrapperOuter>
              {elementList.map((element) => {
                return (
                  <ElementWrapperOuter key={element.id}>
                    <ElementCollection element={{ element }} />
                  </ElementWrapperOuter>
                );
              })}

              <ErrorAlert error={error} />
            </div>
          </div>
        </GotoTopContextProvider>
      </SectionCommon>
    </>
  );
};

export default MyCollectionPage;
