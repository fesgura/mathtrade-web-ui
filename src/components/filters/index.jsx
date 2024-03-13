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
    <Form onSubmit={onSubmit} formatTypes={formatTypes} className="p-5">
      {enabledRender ? (
        type === "item" ? (
          <FiltersForItems />
        ) : (
          <FiltersForGames />
        )
      ) : null}
      <div className="text-center pt-4">
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
