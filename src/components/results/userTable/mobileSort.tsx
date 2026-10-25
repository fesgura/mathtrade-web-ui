import { getI18Ntext } from "@/i18n";
import Icon from "@/components/icon";
import type { SortState } from "@/components/sortableTable";
import type { ParticipantColumn } from "./columns";
import type { ParticipantSortKey } from "./types";

type Props = {
  columns: ParticipantColumn[];
  sort: SortState<ParticipantSortKey>;
  setSort: (sort: SortState<ParticipantSortKey>) => void;
};

// Sort control below sm, where the sortable headers are hidden. Same look as
// components/orderBy (which is tied to the list stores).
const MobileSort = ({ columns, sort, setSort }: Props) => {
  const desc = sort?.dir === "desc";
  const directionLabel = getI18Ntext(desc ? "orderBy.Descent" : "orderBy.Ascent");

  return (
    <div className="sm:hidden flex items-center h-[34px] rounded-full border border-gray-200 overflow-hidden bg-white shrink-0 max-w-full">
      <div className="relative min-w-0">
        <select
          className="appearance-none bg-transparent text-caption font-semibold text-gray-900 h-[34px] pl-3 pr-7 outline-none cursor-pointer max-w-full"
          aria-label={getI18Ntext("result.userTable.sortBy")}
          value={sort?.key ?? ""}
          onChange={(e) =>
            setSort(
              e.target.value
                ? {
                    key: e.target.value as ParticipantSortKey,
                    dir: sort?.dir ?? "asc",
                  }
                : null,
            )
          }
        >
          <option value="">{getI18Ntext("result.userTable.sortBy")}</option>
          {columns.map(({ key, labelId, shortLabelId }) => (
            <option key={key} value={key}>
              {getI18Ntext(shortLabelId || labelId)}
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
        className="h-[34px] px-3 border-l border-gray-200 bg-gray-100 text-gray-800 flex items-center justify-center hover:bg-gray-200 disabled:opacity-40"
        disabled={!sort}
        onClick={() => sort && setSort({ key: sort.key, dir: desc ? "asc" : "desc" })}
        title={directionLabel}
        aria-label={directionLabel}
        aria-pressed={desc}
      >
        <Icon type={desc ? "arrow-down" : "arrow-up"} className="text-sm shrink-0" />
      </button>
    </div>
  );
};

export default MobileSort;
