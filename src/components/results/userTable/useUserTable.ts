import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { normalizeString } from "@/utils/text";
import { nextSort, useSortedRows, type SortState } from "@/components/sortableTable";
import { PARTICIPANT_SORT_VALUES } from "./columns";
import type { ParticipantRow, ParticipantSortKey } from "./types";

type City = { id: number; name: string };

const EMPTY: ParticipantRow[] = [];
const participantId = (row: ParticipantRow) => row.id;

/* Members of the active edition (GET users/, members only). One request;
 * search, city filter and sort are client-side. */
const useUserTable = () => {
  const [, list, loading, error] = useFetch({
    endpoint: "GET_MATHTRADE_USERS",
    initialState: [],
    autoLoad: true,
  });
  const rows: ParticipantRow[] = Array.isArray(list) ? (list as ParticipantRow[]) : EMPTY;

  const [search, setSearch] = useState("");
  const [city, setCity] = useState<number | "">("");
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
        (city === "" || row.location?.id === city)
    );
  }, [rows, search, city]);

  const sorted = useSortedRows(filtered, sort, PARTICIPANT_SORT_VALUES, participantId);

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
    sort,
    toggleSort,
  };
};

export default useUserTable;
