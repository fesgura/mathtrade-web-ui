import I18N from "@/i18n";
import useOrderBy from "./useOrderBy";
import Icon from "../icon";

const OrderBy = ({ type = "item", options }) => {
  const { idOrderBy, data, onChangeOrderBy, onChangeDesc } = useOrderBy(type);

  return (
    <div className="flex items-center">
      <label
        htmlFor={`orderby-${idOrderBy}`}
        className="block text-sm font-bold text-gray-500 whitespace-nowrap"
      >
        <I18N id="orderBy.Title" />
        <Icon />
      </label>
      <div>
        <select
          name="order"
          className="border border-stroke rounded-md px-1 text-xs focus:outline-none cursor-pointer"
          value={data.value}
          onChange={onChangeOrderBy}
          id={`orderby-${idOrderBy}`}
        >
          {options.map((opt) => {
            return (
              <option value={opt.value} key={opt.value}>
                {opt.text}
              </option>
            );
          })}
        </select>
      </div>
      <div className="leading-none h-3 px-1">
        <input
          type="checkbox"
          name="desc"
          checked={data.desc}
          onChange={onChangeDesc}
          id={`orderbydesc-${idOrderBy}`}
        />
      </div>
      <label
        htmlFor={`orderbydesc-${idOrderBy}`}
        className="block text-sm font-bold text-gray-500 "
      >
        <span className="md:inline-block hidden">
          <I18N id="orderBy.Descent" />
        </span>
        <span className="md:hidden inline-block">
          <I18N id="orderBy.Descent.mobile" />
        </span>
      </label>
    </div>
  );
};
export default OrderBy;
