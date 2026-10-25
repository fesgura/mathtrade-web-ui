import { useMemo } from "react";
import type { SortState, SortValues } from "./index";

const compare = (a: string | number, b: string | number) =>
  typeof a === "number" && typeof b === "number"
    ? a - b
    : String(a).localeCompare(String(b), "es", { sensitivity: "base" });

/* Stable client-side sort of a list. null sort = the input order. Nulls go
 * last in both directions. Equal values fall back to tieBreak, then getId, so
 * the order is stable across refetches. Pass module-level (or memoized)
 * values/getId/tieBreak so the memo holds. */
const useSortedRows = <Row, K extends string>(
  rows: Row[],
  sort: SortState<K>,
  values: SortValues<Row, K>,
  getId: (row: Row) => number,
  tieBreak?: (key: K, a: Row, b: Row) => number
) =>
  useMemo(() => {
    if (!sort) return rows;
    const value = values[sort.key];
    const sign = sort.dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      if (va == null || vb == null) {
        if (va == null && vb == null) return getId(a) - getId(b);
        return va == null ? 1 : -1;
      }
      let c = compare(va, vb);
      if (!c && tieBreak) c = tieBreak(sort.key, a, b);
      return c * sign || getId(a) - getId(b);
    });
  }, [rows, sort, values, getId, tieBreak]);

export default useSortedRows;
