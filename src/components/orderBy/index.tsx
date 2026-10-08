import { getI18Ntext } from "@/i18n";
import useOrderBy from "./useOrderBy";
import Icon from "../icon";

type OrderOption = {
  text: string;
  value: string;
  // The field's natural order runs the other way (BGG rank: #1 is the
  // best), so the arrow and label show the opposite of the API direction.
  inverted?: boolean;
};

const OrderBy = ({
  type = "item",
  options = [] as OrderOption[],
}) => {
  const { idOrderBy, data, onChangeOrderBy, toggleDesc } = useOrderBy(type);
  const selected = data.value || options[0]?.value || "";
  const inverted = options.find((opt) => opt.value === selected)?.inverted;
  const shownDesc = inverted ? !data.desc : data.desc;
  const directionLabel = getI18Ntext(
    shownDesc ? "orderBy.Descent" : "orderBy.Ascent"
  );
  const directionShort = getI18Ntext(
    shownDesc ? "orderBy.Descent.mobile" : "orderBy.Ascent.mobile"
  );

  return (
    <div className="flex items-center h-[34px] rounded-full border border-gray-200 overflow-hidden bg-white shrink-0">
      <div className="relative">
        <select
          name="order"
          className="appearance-none bg-transparent text-caption font-semibold text-gray-900 h-[34px] pl-3 pr-7 outline-none cursor-pointer"
          value={selected}
          onChange={onChangeOrderBy}
          id={`orderby-${idOrderBy}`}
          aria-label={getI18Ntext("orderBy.Title")}
        >
          {options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.text}
            </option>
          ))}
        </select>
        <Icon
          type="chevron-down"
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-500"
        />
      </div>
      <button
        type="button"
        className="h-[34px] min-w-[4.5rem] px-2 border-l border-gray-200 bg-gray-100 text-gray-800 flex items-center justify-center gap-1 hover:bg-gray-200"
        onClick={toggleDesc}
        title={`${directionLabel}. ${getI18Ntext("orderBy.Direction.help")}`}
        aria-label={directionLabel}
        aria-pressed={!!shownDesc}
      >
        <Icon
          type={shownDesc ? "arrow-down" : "arrow-up"}
          className="text-sm shrink-0"
        />
        <span className="text-[11px] font-semibold leading-none hidden sm:inline">
          {directionLabel}
        </span>
        <span className="text-[11px] font-semibold leading-none sm:hidden">
          {directionShort}
        </span>
      </button>
    </div>
  );
};

export default OrderBy;
