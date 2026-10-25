import { useContext, useMemo, useState } from "react";
import { PageContext } from "@/context/page";
import useFetch from "@/hooks/useFetch";
import { normalizeString } from "@/utils/text";
import { nextSort, useSortedRows, type SortState } from "@/components/sortableTable";
import { PARTICIPANT_SORT_VALUES } from "./columns";
import type { ParticipantRow, ParticipantSortKey } from "./types";

type City = { id: number; name: string };
export type CommitFilter = "all" | "yes" | "no";

const EMPTY: ParticipantRow[] = [];
const participantId = (row: ParticipantRow) => row.id;

/* Members of the active edition (GET users/, members only). One request;
 * search, city filter and sort are client-side. */
const useUserTable = () => {
  const { canI } = useContext(PageContext);
  // ¿Comprometió? from the want phase on; trades once results are out.
  const showCommitment = Boolean(canI?.want || canI?.results);
  const showTrades = Boolean(canI?.results);

  const [, list, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    autoLoad: true,
  });
  const rows: ParticipantRow[] = Array.isArray(list) ? (list as ParticipantRow[]) : EMPTY;

  const [search, setSearch] = useState("");
  const [city, setCity] = useState<number | "">("");
  const [commitFilter, setCommitFilter] = useState<CommitFilter>("all");
  const [sort, setSort] = useState<SortState<ParticipantSortKey>>(null);

  // Only the cities present in the list.
  const cities: City[] = useMemo(() => {
    const byId = new Map<number, City>();
    rows.forEach(({ location }) => {
      if (location && !byId.has(location.id)) {
        byId.set(location.id, { id: location.id, name: location.name });
      }
    });
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [rows]);

  const filtered = useMemo(() => {
    const term = normalizeString(search.trim());
    return rows.filter(
      (row) =>
        (!term || normalizeString(`${row.first_name} ${row.last_name}`).includes(term)) &&
        (city === "" || row.location?.id === city) &&
        (!showCommitment ||
          commitFilter === "all" ||
          (commitFilter === "yes" ? row.commitment : !row.commitment)),
    );
  }, [rows, search, city, showCommitment, commitFilter]);

  // A sort on a hidden column is ignored (the column may hide on a phase change).
  const activeSort = useMemo(
    () =>
      (sort?.key === "commitment" && !showCommitment) || (sort?.key === "trades" && !showTrades)
        ? null
        : sort,
    [sort, showCommitment, showTrades],
  );

  const sorted = useSortedRows(filtered, activeSort, PARTICIPANT_SORT_VALUES, participantId);

  const toggleSort = (key: ParticipantSortKey) => setSort((s) => nextSort(s, key));

  return {
    rows: sorted,
    total: rows.length,
    loading,
    error,
    search,
    setSearch,
    city,
    setCity,
    cities,
    showCommitment,
    showTrades,
    commitFilter,
    setCommitFilter,
    sort: activeSort,
    setSort,
    toggleSort,
  };
};

export default useUserTable;
