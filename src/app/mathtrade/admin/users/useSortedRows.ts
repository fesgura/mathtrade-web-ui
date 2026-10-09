import { useMemo } from "react";
import type { AdminUserRow, SortKey, SortState } from "./useAdminUsers";

// Ready copies (shown in Juegos Ofrecidos); total when the backend doesn't send it.
export const readyCopies = (row: AdminUserRow) => row.ready_copies ?? row.copies;

const STATUS_ORDER: Record<AdminUserRow["contribution_status"], number> = {
  missing: 0,
  pending: 1,
  approved: 2,
  rejected: 3,
};

const contactCount = (row: AdminUserRow) => (row.whatsapp ? 1 : 0) + (row.telegram ? 1 : 0);
const flagCount = (row: AdminUserRow) =>
  row.roles.length + (row.self_excluded ? 1 : 0) + (row.commitment ? 1 : 0);

// The ascending value of each column; null (empty text) always sorts last.
const VALUES: Record<SortKey, (row: AdminUserRow) => string | number | null> = {
  name: (row) => `${row.first_name || ""} ${row.last_name || ""}`.trim() || null,
  city: (row) => row.location || null,
  contact: contactCount,
  referring: (row) => row.referring || null,
  copies: readyCopies, // ties broken by total below
  status: (row) => STATUS_ORDER[row.contribution_status],
  flags: flagCount,
};

const compare = (a: string | number, b: string | number) =>
  typeof a === "number" && typeof b === "number"
    ? a - b
    : String(a).localeCompare(String(b), "es", { sensitivity: "base" });

/* Client-side sort of the admin users list (the backend returns it by name).
 * null sort = the backend order. Equal values fall back to user_id so the
 * order is stable across refetches. */
const useSortedRows = (rows: AdminUserRow[], sort: SortState) =>
  useMemo(() => {
    if (!sort) return rows;
    const value = VALUES[sort.key];
    const sign = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      if (va == null || vb == null) {
        // Nulls last in both directions.
        if (va == null && vb == null) return a.user_id - b.user_id;
        return va == null ? 1 : -1;
      }
      let c = compare(va, vb);
      if (!c && sort.key === "copies") c = a.copies - b.copies;
      return c * sign || a.user_id - b.user_id;
    });
  }, [rows, sort]);

export default useSortedRows;
