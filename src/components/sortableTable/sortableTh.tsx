import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import type { SortState } from "./index";

type Props<K extends string> = {
  sortKey: K;
  labelId: string;
  sort?: SortState<K>;
  onSort?: (key: K) => void;
  // i18n id of the "Sort by" prefix of the button title.
  helpId?: string;
  className?: string;
};

const ARIA_SORT = { asc: "ascending", desc: "descending" } as const;

// Column header that cycles asc → desc → none on click.
const SortableTh = <K extends string>({
  sortKey,
  labelId,
  sort = null,
  onSort = () => {},
  helpId = "adminUsers.sort.help",
  className = "",
}: Props<K>) => {
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
        title={`${getI18Ntext(helpId)}: ${label}`}
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
