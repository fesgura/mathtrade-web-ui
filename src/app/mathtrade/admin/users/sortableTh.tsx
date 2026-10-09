import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import type { SortKey, SortState } from "./useAdminUsers";

type Props = {
  sortKey: SortKey;
  labelId: string;
  sort?: SortState;
  onSort?: (key: SortKey) => void;
  className?: string;
};

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

// Column header that cycles asc → desc → none on click.
const SortableTh = ({
  sortKey,
  labelId,
  sort = null,
  onSort = () => {},
  className = "",
}: Props) => {
  const dir = sort?.key === sortKey ? sort.dir : null;
  const label = getI18Ntext(labelId);
  return (
    <th className={className} aria-sort={dir ? ARIA_SORT[dir] : "none"}>
      <button
        type="button"
        className={clsx(
          "inline-flex items-center gap-1 hover:text-gray-800",
          dir ? "text-gray-800" : null
        )}
        title={`${getI18Ntext("adminUsers.sort.help")}: ${label}`}
        onClick={() => onSort(sortKey)}
      >
        <I18N id={labelId} />
        <span aria-hidden className={clsx("text-xs", dir ? null : "opacity-30")}>
          {dir === "asc" ? "▲" : dir === "desc" ? "▼" : "↕"}
        </span>
      </button>
    </th>
  );
};

export default SortableTh;
