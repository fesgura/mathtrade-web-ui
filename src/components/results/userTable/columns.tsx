import type { SortValues } from "@/components/sortableTable";
import type { ParticipantRow, ParticipantSortKey } from "./types";

// The ascending value of each column; null sorts last.
export const PARTICIPANT_SORT_VALUES: SortValues<ParticipantRow, ParticipantSortKey> = {
  name: (row) => `${row.first_name || ""} ${row.last_name || ""}`.trim() || null,
  city: (row) => row.location?.name || null,
  ready_items: (row) => row.ready_items ?? null,
  commitment: (row) => (row.commitment ? 1 : 0),
  trades: (row) => row.trades ?? null,
};

export type ParticipantColumn = {
  key: ParticipantSortKey;
  labelId: string;
  className: string;
};

export const COLUMNS: ParticipantColumn[] = [
  { key: "name", labelId: "result.userTable.name", className: "py-2 pr-4" },
  { key: "city", labelId: "result.userTable.location", className: "py-2 pr-4" },
  {
    key: "ready_items",
    labelId: "result.userTable.ready_items",
    className: "py-2 pr-4 text-right",
  },
];
