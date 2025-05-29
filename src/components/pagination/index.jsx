import { useContext } from "react";
import { GotoTopContext } from "@/context/goto-top";
import { Form } from "../form";
import Icon from "../icon";
import { getI18Ntext } from "@/i18n";
import usePagination from "./usePagination";

const Pagination = ({ type = "item", count }) => {
  const { gotoTop } = useContext(GotoTopContext);

  const {
    page,
    onChange,
    onBlur,
    total,
    prevPage,
    nextPage,
    showPrevPage,
    notShowNextPage,
    updateFilters,
  } = usePagination(type, count, gotoTop);

  return (
    <div className="flex items-center">
      {showPrevPage ? (
        <div className="h-5 flex-[0_0_auto] px-1.5 py-0">
          <button
            className="w-5 h-5 leading-[16px] text-center border text-xl rounded-full
            border-solid border-gray-400 text-gray-400  hover:bg-primary hover:border-primary hover:text-white"
            title={getI18Ntext("pagination.PrevPage")}
            onClick={prevPage}
          >
            <Icon
              type="arrow-left"
              className="relative top-[-1px] left-[-1px]"
            />
          </button>
        </div>
      ) : null}
      <div>
        {total > 1 ? (
          <Form
            onSubmit={(d) => {
              gotoTop();
              updateFilters(d, type);
            }}
            formatTypes={{ page: "number" }}
          >
            <input
              className="border border-stroke rounded-md px-1 text-center text-sm w-13 focus:outline-none"
              type="number"
              name="page"
              value={page}
              onChange={onChange}
              onBlur={onBlur}
              size="sm"
              min={1}
              max={total}
            />
          </Form>
        ) : (
          <div className="text-sm font-bold text-gray-500">1</div>
        )}
      </div>
      <div className="text-sm font-bold text-gray-500 px-1">{` / ${total} ${getI18Ntext(
        "pagination.label"
      )}`}</div>

      {notShowNextPage ? null : (
        <div className="pagination-c pagination-c-btn">
          <button
            className="w-8 h-8 text-center border text-3xl rounded-full leading-[0.82]
            bg-primary text-white hover:bg-sky-700 overflow-hidden"
            title={getI18Ntext("pagination.NextPage")}
            onClick={nextPage}
          >
            <Icon type="arrow-right" className="relative top-[-1px]" />
          </button>
        </div>
      )}
    </div>
  );
};
export default Pagination;
