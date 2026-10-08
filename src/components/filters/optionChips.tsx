"use client";
import { useContext } from "react";
import { useOptions } from "@/store";
import { GotoTopContext } from "@/context/goto-top";
import FilterChip from "./chip";

export type ChipOption = {
  value: string | number;
  text: string;
  count?: number;
};

type OptionChipsProps = {
  filterType?: "item" | "game" | "collection" | "myoffer";
  name: string;
  options?: ChipOption[];
  multiple?: boolean;
  allowEmpty?: boolean;
  emptyLabel?: string;
  mapIn?: (value: any) => string;
  mapOut?: (value: string) => any;
};

const OptionChips = ({
  filterType = "item",
  name,
  options = [],
  multiple = false,
  allowEmpty = false,
  emptyLabel = "",
  mapIn = (value: any) =>
    value === undefined || value === null ? "" : `${value}`,
  mapOut = (value: string) => (value === "" ? undefined : value),
}: OptionChipsProps) => {
  const filters = useOptions((state) => state[`filters_${filterType}`]);
  const updateFilters = useOptions((state) => state.updateFilters);
  const { gotoTop } = useContext(GotoTopContext);
  const raw = filters?.[name];

  const selectedList = (() => {
    if (multiple) {
      const list = Array.isArray(raw) ? raw : raw ? `${raw}`.split(",") : [];
      return list.map((item) => mapIn(item)).filter(Boolean);
    }
    return [mapIn(raw)];
  })();

  const select = (value: string) => {
    gotoTop();
    if (multiple) {
      const next = selectedList.includes(value)
        ? selectedList.filter((item) => item !== value)
        : [...selectedList, value];
      updateFilters(
        { [name]: next.length ? next.map(mapOut) : undefined, page: 1 },
        filterType
      );
      return;
    }
    const next = selectedList[0] === value && allowEmpty ? "" : value;
    updateFilters({ [name]: mapOut(next), page: 1 }, filterType);
  };

  return (
    <div className="flex flex-wrap gap-1.5">
      {allowEmpty && emptyLabel ? (
        <FilterChip selected={!selectedList[0]} onClick={() => select("")}>
          {emptyLabel}
        </FilterChip>
      ) : null}
      {options.map((option) => {
        const value = `${option.value}`;
        const label = option.text.replace(/\s*\(\d+\)\s*$/, "");
        return (
          <FilterChip
            key={value}
            selected={selectedList.includes(value)}
            onClick={() => select(value)}
          >
            {label}
            {option.count ? ` · ${option.count}` : ""}
          </FilterChip>
        );
      })}
    </div>
  );
};

export default OptionChips;
