"use client";
import useMyCollection from "./useMyCollection";
import { GotoTopContextProvider } from "@/context/goto-top";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import ItemMy from "@/components/item/item-my";
import NewItem from "@/components/item/item-my/new-item";
import I18N, { getI18Ntext } from "@/i18n";
import PageHeader from "@/components/pageHeader";
import OrderBy from "@/components/orderBy";
import StickyHeader from "@/components/sticky-header";
import Container from "@/components/container";
const count = 392;
const MyCollectionPage = () => {
  const {
    items,
    optionsOrder,
    loading,
    error,
    filters_collection,
    updateFilters,
    isLoadedItems,
    myCollection,
    searchText,
  } = useMyCollection();

  return (
    <>
      <PageHeader
        title="title.MyCollection"
        name="myCollection"
        description={
          <>
            <p className="text-sm max-w-5xl mx-auto">
              <I18N id="MyCollection.page.explanation" />
            </p>
          </>
        }
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
            <div className="sm:flex items-center gap-2 py-3 justify-between">
              <div className="flex items-center gap-1 md:pb-0 pb-3">
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
                <div className="font-bold italic text-gray-700 pl-2">
                  <I18N
                    id={`itemCount.${items.length === 1 ? "one" : "many"}`}
                    values={[items.length]}
                  />
                </div>
              </div>

              <div>
                <OrderBy type="collection" options={optionsOrder} />
              </div>
            </div>
          </StickyHeader>
          <Container size="md">
            {items.length >= 2 ? <NewItem /> : null}
            {!myCollection?.length && isLoadedItems ? (
              <p className="text-center text-balance text-xl py-6 mb-4">
                <I18N id="myCollection.notItemsMessage" />
              </p>
            ) : null}
            {items.map((itemRaw) => {
              return <ItemMy key={itemRaw.id} itemRaw={itemRaw} />;
            })}
            <NewItem />
            <ErrorAlert error={error} />
          </Container>
        </GotoTopContextProvider>
      </SectionCommon>
    </>
  );
};

export default MyCollectionPage;
