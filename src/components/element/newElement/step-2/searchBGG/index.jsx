import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import useSearchBGG from "./useSearchBGG";
import clsx from "clsx";
import BadgeType from "@/components/badgeType";

const SearchBGG = ({ setSearchResultBGG }) => {
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
  } = useSearchBGG({ setSearchResultBGG });

  return (
    <div className="relative">
      <input
        name="search-bgg"
        type="text"
        className="input block w-full border border-stroke rounded-md shadow-sm peer focus:border-primary focus:shadow-[0_0_6px_theme(colors.primary)]   focus:outline-none pl-3 pr-9 py-2 text-base"
        value={value.val}
        placeholder={getI18Ntext("filter.Search")}
        onChange={(e) => {
          setValue({
            val: e.target.value,
            enableSearch: true,
          });
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        ref={inputRef}
        autoComplete="false"
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
            {list.map((elem) => {
              const { bgg_id, nameComp, expansion } = elem;
              return (
                <li
                  key={bgg_id}
                  className="px-3 py-2 hover:bg-primary/20 cursor-pointer"
                  onMouseDown={() => {
                    onSelect(elem);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="j">
                      {nameComp.a}
                      <strong>{nameComp.b}</strong>
                      {nameComp.c}
                    </div>
                    <BadgeType
                      className="text-[9px]"
                      type="item"
                      subtype={expansion ? 2 : 1}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBGG;
