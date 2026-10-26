export type SortDir = "asc" | "desc";
export type SortState<K extends string> = { key: K; dir: SortDir } | null;
// The ascending value of each column; null (empty text) always sorts last.
export type SortValues<Row, K extends string> = Record<K, (row: Row) => string | number | null>;

// Header click cycle: asc → desc → none (back to the input order).
export const nextSort = <K extends string>(sort: SortState<K>, key: K): SortState<K> =>
  sort?.key !== key ? { key, dir: "asc" } : sort.dir === "asc" ? { key, dir: "desc" } : null;

export { default as useSortedRows } from "./useSortedRows";
export { default as SortableTh } from "./sortableTh";
