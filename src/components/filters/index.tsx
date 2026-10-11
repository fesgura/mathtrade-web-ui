"use client";
import { Form } from "@/components/form";
import useFilters from "./useFilters";
import FiltersForItems from "./for-items";
import FiltersForGames from "./for-games";
import Icon from "../icon";
import I18N from "@/i18n";
import TagSelector from "./tag-selector";

const Filters = ({ type = "item" }: { type?: "item" | "game" }) => {
  const { enabledRender, formatTypes, onSubmit, clearFilters } = useFilters({
    type,
  });

  return (
    <Form
      onSubmit={onSubmit}
      formatTypes={formatTypes}
      className="flex flex-col flex-1 min-h-0"
    >
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-3 py-3 flex flex-col gap-4 scrollbar">
        {enabledRender ? (
          type === "item" ? (
            <>
              <TagSelector />
              <FiltersForItems />
            </>
          ) : (
            <FiltersForGames />
          )
        ) : null}
      </div>
      <div className="shrink-0 flex items-center justify-center gap-3 py-3 px-3 bg-white border-t border-gray-200">
        <button
          type="submit"
          className="h-9 min-w-0 flex-1 rounded-full bg-primary px-4 text-sm font-semibold text-white inline-flex items-center justify-center gap-1.5 hover:opacity-90 max-w-[8rem]"
        >
          <Icon type="filters" className="text-sm shrink-0" />
          <span className="truncate"><I18N id="btn.filter.Filter" /></span>
        </button>
        <button
          type="button"
          className="min-w-0 shrink-0 text-primary hover:text-sky-800 text-sm font-semibold"
          onClick={clearFilters}
        >
          <I18N id="btn.filter.Clear" />
        </button>
      </div>
    </Form>
  );
};

export default Filters;
