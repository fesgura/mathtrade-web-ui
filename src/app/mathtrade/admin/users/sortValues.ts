import type { SortValues } from "@/components/sortableTable";
import type { AdminUserRow, SortKey } from "./useAdminUsers";

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
export const ADMIN_SORT_VALUES: SortValues<AdminUserRow, SortKey> = {
  name: (row) => `${row.first_name || ""} ${row.last_name || ""}`.trim() || null,
  city: (row) => row.location || null,
  contact: contactCount,
  referring: (row) => row.referring || null,
  copies: readyCopies, // ties broken by total in adminTieBreak
  status: (row) => STATUS_ORDER[row.contribution_status],
  flags: flagCount,
};

// Equal ready copies: order by total copies.
export const adminTieBreak = (key: SortKey, a: AdminUserRow, b: AdminUserRow) =>
  key === "copies" ? a.copies - b.copies : 0;

export const adminUserId = (row: AdminUserRow) => row.user_id;
