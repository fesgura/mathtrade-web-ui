import { Form } from "@/components/form";
import useFilters from "./useFilters";
import FiltersForItems from "./for-items";
import FiltersForGames from "./for-games";
import Button from "../button";
import InnerButton from "../button/inner-button";
import Icon from "../icon";
import I18N from "@/i18n";
import TagSelector from "./tag-selector";
import clsx from "clsx";

const TabOp = ({ value, text, setTabOpSelected, tabOpSelected }) => {
  return (
    <div
      className={clsx("border-b-2 font-bold ", {
        "border-primary cursor-default": tabOpSelected === value,
        "border-transparent text-gray-400 cursor-pointer":
          tabOpSelected !== value,
      })}
      onClick={() => setTabOpSelected(value)}
    >
      <I18N id={`tab.filter.${text}`} />
    </div>
  );
};

const tabOpList = [
  {
    value: 0,
    text: "filter",
  },
  {
    value: 1,
    text: "tags",
  },
];

// const NoFilters = () => {
//   return (
//     <div className="p-5">
//       <div className="p-4 text-center text-balance bg-primary/10 border border-primary rounded-lg">
//         Los filtros están momentáneamente desactivados hasta la próxima etapa.
//       </div>
//     </div>
//   );
// };

const Filters = ({ type = "item" }) => {
  const {
    enabledRender,
    formatTypes,
    onSubmit,
    clearFilters,
    tabOpSelected,
    setTabOpSelected,
  } = useFilters({
    type,
  });

  return (
    <>
      {type === "item" ? (
        <div className="px-5 pt-5 flex items-end border-b border-gray-300 gap-3">
          {tabOpList.map(({ value, text }) => {
            return (
              <TabOp
                key={value}
                value={value}
                text={text}
                tabOpSelected={tabOpSelected}
                setTabOpSelected={setTabOpSelected}
              />
            );
          })}
        </div>
      ) : null}

      {tabOpSelected === 0 ? (
        <Form onSubmit={onSubmit} formatTypes={formatTypes}>
          <div
            className={clsx(
              "overflow-x-hidden overflow-y-scroll p-5 scrollbar",
              {
                "lg:h-[calc(100vh-222px)]": type === "item",
                "lg:h-[calc(100vh-174px)]": type === "game",
              }
            )}
          >
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
      ) : null}
      {type === "item" && tabOpSelected === 1 ? (
        <TagSelector onSubmit={onSubmit} />
      ) : null}
    </>
  );
};

export default Filters;
