import { Form } from "@/components/form";
import useFilters from "./useFilters";
import FiltersForItems from "./for-items";
import FiltersForGames from "./for-games";
import Button from "../button";
import InnerButton from "../button/inner-button";
import Icon from "../icon";
import I18N from "@/i18n";

const Filters = ({ type = "item" }) => {
  const { enabledRender, formatTypes, onSubmit, clearFilters } = useFilters({
    type,
  });

  return (
    <Form onSubmit={onSubmit} formatTypes={formatTypes}>
      <div className="lg:h-[calc(100vh-250px)] overflow-x-hidden overflow-y-scroll p-5 scrollbar">
        {enabledRender ? (
          type === "item" ? (
            <FiltersForItems />
          ) : (
            <FiltersForGames />
          )
        ) : null}
      </div>
      <div className="text-center py-4 px-5 bg-white lg:border-t lg:border-gray-300">
        <Button block>
          <InnerButton>
            <Icon type="filters" />
            <I18N id="btn.filter.Filter" />
          </InnerButton>
        </Button>
        <button
          className="mt-5 text-primary underline hover:text-sky-800 text-sm font-bold"
          onClick={clearFilters}
        >
          <I18N id="btn.filter.Clear" />
        </button>
      </div>
    </Form>
  );
};

export default Filters;
