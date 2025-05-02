import { useMemo } from "react";
import I18N from "@/i18n";
import Icon from "@/components/icon";
import InnerButton from "@/components/button/inner-button";
import { SidebarToggleButton } from "@/components/sections/with-sidebar";
import { useOptions } from "@/store";
import clsx from "clsx";

const excludeKeys = ["page", "order", "page_size"];

const FilterToggleButton = ({ type }) => {
  /* FILTERS */
  const filtersComp = useOptions((state) => state[`filters_${type}`]);

  const count = useMemo(() => {
    return Object.keys(filtersComp).reduce((num, key) => {
      if (excludeKeys.includes(key)) {
        return num;
      }
      return num + 1;
    }, 0);
  }, [filtersComp]);

  return (
    <SidebarToggleButton
      className={clsx(
        "font-bold rounded-md text-sm lg:px-5 px-3 py-2 transition-colors border",
        {
          "border-primary": count > 0,
          "border-transparent": count <= 0,
        }
      )}
      classNameNotHighlighted="text-primary bg-primary/10"
      classNameHighlighted="font-bold text-white bg-primary rounded-md text-sm lg:px-5 px-3 py-2"
    >
      <InnerButton>
        <Icon type="filters" />
        <span className="lg:block hidden">
          <I18N id="btn.mobile.filter" />
        </span>
        {count > 0 ? (
          <span className="bg-red-500 text-white text-center text-[11px] leading-[21px] h-[20px] w-[20px] rounded-full">
            {count}
          </span>
        ) : null}
      </InnerButton>
    </SidebarToggleButton>
  );
};

export default FilterToggleButton;
