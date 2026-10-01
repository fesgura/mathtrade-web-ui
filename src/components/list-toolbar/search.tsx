"use client";
import Icon from "@/components/icon";
import { getI18Ntext } from "@/i18n";

const ListSearch = ({
  value = "",
  onChange = (_keyword) => {},
  placeholder = "",
}) => {
  return (
    <label className="flex items-center gap-2 w-full h-[34px] px-2.5 bg-gray-100 border border-gray-200 rounded-full">
      <Icon type="search" className="text-gray-500 text-sm shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          placeholder || getI18Ntext("filter.Search.placeholder.short")
        }
        aria-label={getI18Ntext("filter.Search")}
        className="flex-1 min-w-0 bg-transparent text-body text-gray-900 placeholder:text-gray-400 outline-none"
      />
    </label>
  );
};

export default ListSearch;
