"use client";
import { useMemo } from "react";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import { SidebarToggleButton } from "@/components/sections/with-sidebar";
import { useOptions } from "@/store";
import clsx from "clsx";

const excludeKeys = ["page", "order", "page_size", "keyword"];

const FilterToggleButton = ({ type = "item" }: { type?: string }) => {
  const filtersComp = useOptions((state) => state[`filters_${type}`]);

  const count = useMemo(() => {
    return Object.keys(filtersComp || {}).reduce((num, key) => {
      if (excludeKeys.includes(key)) {
        return num;
      }
      return num + 1;
    }, 0);
  }, [filtersComp]);

  return (
    <SidebarToggleButton
      className={clsx(
        "h-9 px-3 rounded-full text-caption font-bold transition-colors border shrink-0",
        count > 0 ? "border-primary" : "border-primary/40"
      )}
      classNameNotHighlighted="text-primary bg-primary/10"
      classNameHighlighted="text-white bg-primary border-primary"
    >
      <InnerButton>
        <Icon type="filters" className="text-sm" />
        <span>
          <I18N id="btn.mobile.filter" />
        </span>
        {count > 0 ? (
          <span className="bg-red-500 text-white text-center text-[10px] leading-[18px] h-[18px] min-w-[18px] px-1 rounded-full">
            {count}
          </span>
        ) : null}
      </InnerButton>
    </SidebarToggleButton>
  );
};

export default FilterToggleButton;
