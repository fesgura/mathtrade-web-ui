"use client";
import { Fragment, useState } from "react";
import clsx from "clsx";
import I18N from "@/i18n";
import { SortableTh, nextSort, useSortedRows } from "@/components/sortableTable";
import type { SortState, SortValues } from "@/components/sortableTable";

export const NO_TABLE = "-";

// Numeric tables first, in order ("00", "01"…); then codes like "LPL".
export const byTable = (a: string, b: string) => {
  const na = /^\d+$/.test(a);
  const nb = /^\d+$/.test(b);
  if (na && nb) return Number(a) - Number(b);
  if (na !== nb) return na ? -1 : 1;
  return a.localeCompare(b);
};

export type TableListMember = { key: string; name: string; username: string; items: number };
export type TableListRow = {
  table: string;
  items: number;
  receivers: number;
  members: TableListMember[];
};

type SortKey = "table" | "items" | "receivers";
type IndexedRow = TableListRow & { index: number };

// Rows come in table order, so their index is the table sort value.
const SORT_VALUES: SortValues<IndexedRow, SortKey> = {
  table: (row) => row.index,
  items: (row) => row.items,
  receivers: (row) => row.receivers,
};
const getIndex = (row: IndexedRow) => row.index;

// Rows sorted by table, with their position (the table sort value).
export const indexRows = (rows: TableListRow[]): IndexedRow[] =>
  [...rows]
    .sort((a, b) => byTable(a.table, b.table))
    .map((row, index) => ({ ...row, index }));

// Hub tables: copies and receivers per table, sortable by any column; each
// row opens the list of who receives there (name, username, copies).
const TablesList = ({
  rows = [],
  selected = null,
  onSelect = null,
}: {
  rows?: IndexedRow[];
  selected?: string | null;
  onSelect?: ((table: string) => void) | null;
}) => {
  const [sort, setSort] = useState<SortState<SortKey>>(null);
  const [open, setOpen] = useState<Set<string>>(() => new Set());
  const sorted = useSortedRows(rows, sort, SORT_VALUES, getIndex);

  const toggle = (table: string) =>
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(table)) next.delete(table);
      else next.add(table);
      return next;
    });

  const th = "py-2 pr-6";
  const onSort = (key: SortKey) => setSort((current) => nextSort(current, key));

  return (
    <div className="overflow-x-auto">
      <table className="w-full sm:w-auto text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <SortableTh
              sortKey="table"
              labelId="adminShipping.tables.col.table"
              sort={sort}
              onSort={onSort}
              helpId="adminShipping.tables.sortHelp"
              className={th}
            />
            <SortableTh
              sortKey="items"
              labelId="adminShipping.tables.col.items"
              sort={sort}
              onSort={onSort}
              helpId="adminShipping.tables.sortHelp"
              className={clsx(th, "text-right")}
            />
            <SortableTh
              sortKey="receivers"
              labelId="adminShipping.tables.col.receivers"
              sort={sort}
              onSort={onSort}
              helpId="adminShipping.tables.sortHelp"
              className="py-2 pr-2 text-right"
            />
            <th className="py-2">
              <span className="sr-only">
                <I18N id="adminShipping.tables.users" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => {
            const isOpen = open.has(row.table);
            return (
              <Fragment key={row.table}>
                <tr
                  className={clsx("border-b border-gray-100", {
                    "bg-sky-50": row.table === selected,
                  })}
                >
                  <td className="py-1.5 pr-6">
                    {onSelect ? (
                      <button
                        type="button"
                        className="text-primary hover:underline font-semibold"
                        onClick={() => onSelect(row.table)}
                      >
                        {row.table}
                      </button>
                    ) : (
                      <span className="font-semibold">{row.table}</span>
                    )}
                  </td>
                  <td className="py-1.5 pr-6 text-right">{row.items}</td>
                  <td className="py-1.5 pr-2 text-right">{row.receivers}</td>
                  <td className="py-1.5 text-right">
                    <button
                      type="button"
                      className="text-xs text-primary hover:underline whitespace-nowrap"
                      aria-expanded={isOpen}
                      onClick={() => toggle(row.table)}
                    >
                      <I18N
                        id={isOpen ? "adminShipping.tables.hideUsers" : "adminShipping.tables.showUsers"}
                      />
                    </button>
                  </td>
                </tr>
                {isOpen ? (
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td colSpan={4} className="py-2 px-2">
                      <ul className="text-xs space-y-1 max-w-md">
                        {row.members.map((member) => (
                          <li key={member.key} className="flex justify-between gap-3">
                            <span className="min-w-0 break-words">
                              {member.name || member.username}{" "}
                              <span className="text-gray-500">({member.username})</span>
                            </span>
                            <span className="whitespace-nowrap text-gray-700">
                              <I18N id="adminShipping.tables.copies" values={[member.items]} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TablesList;
