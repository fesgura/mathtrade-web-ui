import { Form } from "@/components/form";
import Icon from "@/components/icon";
import I18N, { getI18Ntext } from "@/i18n";
import { useOptions } from "@/store";
import { useState } from "react";

const SearchForm = () => {
  /* FILTER OPTIONS **********************************************/
  const filters_wants = useOptions((state) => state.filters_wants);
  const updateFilters = useOptions((state) => state.updateFilters);
  /* end FILTER OPTIONS *********************************************/

  const [value, setValue] = useState(filters_wants?.keyword || "");

  return (
    <Form
      onSubmit={(d) => {
        updateFilters(
          {
            keyword: d.keyword || undefined,
          },
          "wants"
        );
      }}
    >
      <div className="flex items-center">
        <div className="relative">
          <input
            type="text"
            name="keyword"
            placeholder={getI18Ntext("filter.Search.placeholder")}
            value={value}
            onChange={({ target }) => {
              setValue(target.value);
            }}
            className="border border-stroke rounded-tl-md rounded-bl-md pl-1 pr-5 text-xs focus:outline-none"
          />
        </div>
        <div>
          <button className="bg-primary border border-primary text-white rounded-tr-md rounded-br-md text-xs px-1 hover:opacity-70">
            <Icon type="search" /> <I18N id="filter.Filter" />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default SearchForm;
