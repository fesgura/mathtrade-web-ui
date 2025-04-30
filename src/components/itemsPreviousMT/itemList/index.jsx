import I18N, { getI18Ntext } from "@/i18n";
import useItemListPreviousMT from "./useItemListPreviousMT";
import ItemPreviousMT from "./item";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import EmptyList from "@/components/emptyList";

const ItemList = () => {
  const {
    title,
    isLoaded,
    itemList,
    keyword,
    setKeyword,
    loading,
    error,
    afterAddItem,
  } = useItemListPreviousMT();

  return (
    <section className="min-h-80">
      <header className="pb-2 mb-4 border-b border-gray-300 sm:flex items-end justify-between gap-3">
        <div className="sm:mb-0 mb-5">
          <h2 className="font-bold text-2xl text-balance">
            <I18N id="previousMT.items.title" />
          </h2>
          <h3 className="font-bold text-gray-400 text-balance">{title}</h3>
        </div>

        <div className="flex items-center gap-1">
          <label className="block text-sm font-bold text-gray-500 whitespace-nowrap">
            <I18N id="filter.Search" />
          </label>
          <input
            type="text"
            placeholder={getI18Ntext("filter.Search")}
            value={keyword}
            onChange={({ target }) => {
              setKeyword(target.value);
            }}
            className="border border-stroke rounded-md p-1 text-xs focus:outline-none"
          />
        </div>
      </header>
      {itemList.map((itemRaw) => {
        return (
          <ItemPreviousMT
            key={itemRaw.id}
            itemRaw={itemRaw}
            afterAddItem={afterAddItem}
          />
        );
      })}
      <EmptyList
        visible={isLoaded && !(itemList?.length || 0) && !error}
        message="EmptyList.myOffer"
      />
      <LoadingBox loading={loading} />
      <ErrorAlert error={error} />
    </section>
  );
};

export default ItemList;
