import InnerButton from "@/components/button/inner-button";
import { Input, Select } from "@/components/form";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import useSearchCollectionBGG from "./useSearchCollectionBGG";
import clsx from "clsx";

const SearchMyCollectionBGG = ({ setSearchResultBGG }) => {
  const {
    loading,
    inputRef,
    value,
    setValue,
    onFocus,
    onBlur,
    visiblePad,
    list,
    onSelect,
    onClear,
    waitingBGG,
    forceGetBGGcollection,
  } = useSearchCollectionBGG({ setSearchResultBGG });

  return (
    <>
      <div className="relative">
        <input
          name="search-collection-bgg"
          type="text"
          className="input block w-full border border-stroke rounded-md shadow-sm peer focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]   focus:outline-none pl-3 pr-9 py-2 text-base"
          value={value}
          placeholder={getI18Ntext("filter.Search")}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          ref={inputRef}
          autoComplete="false"
          autoCorrect="false"
        />
        {loading ? (
          <div className="absolute top-1/2 right-3 translate-y-[-50%] text-primary">
            <Icon type="loading" />
          </div>
        ) : (
          <button
            className="absolute top-1/2 right-3 translate-y-[-50%] cursor-pointer"
            onClick={onClear}
          >
            <Icon />
          </button>
        )}

        {visiblePad ? (
          <div className="absolute  top-full left-0 w-full max-h-56 pb-1 bg-white shadow-xl z-10 border overflow-auto">
            <ul className="text-sm">
              {list.map((elem, k) => {
                const { bgg_id, name } = elem;
                return (
                  <li
                    key={`${bgg_id}-${k}`}
                    className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                    onMouseDown={() => {
                      onSelect(elem);
                    }}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}
      </div>

      {waitingBGG && (
        <div className="text-center py-1 text-sm text-gray-500">
          <I18N id="BGGsearch.noCollection" />{" "}
          <button
            className="text-primary font-bold underline"
            onClick={forceGetBGGcollection}
          >
            <I18N id="BGGsearch.noCollection.here" />
          </button>
          .
        </div>
      )}
    </>
  );
};

export default SearchMyCollectionBGG;
