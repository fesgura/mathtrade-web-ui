"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";
import ItemsTable from "./ItemsTable";
import type { ShippingItem } from "./types";

const NO_TABLE = "-";

// Numeric tables first, in order ("00", "01"…); then codes like "LPL".
const byTable = (a: string, b: string) => {
  const na = /^\d+$/.test(a);
  const nb = /^\d+$/.test(b);
  if (na && nb) return Number(a) - Number(b);
  if (na !== nb) return na ? -1 : 1;
  return a.localeCompare(b);
};

type TableRow = { table: string; items: number; receivers: number };

// The hub's tables: every item whose destination is the hub (local trades
// between attendees included) grouped by the trade's table number, with how
// many copies and receivers each table gets, and the items of one table.
const TablesTab = ({
  items = [],
  hubId = null,
  selectClass = "",
}: {
  items?: ShippingItem[];
  hubId?: number | null;
  selectClass?: string;
}) => {
  const [table, setTable] = useState<string>("all");

  const hubItems = useMemo(
    () => items.filter((item) => hubId != null && item.destination?.id === hubId),
    [items, hubId]
  );

  const tables = useMemo(() => {
    const rows = new Map<string, { items: number; receivers: Set<string> }>();
    hubItems.forEach((item) => {
      const key = item.table_number || NO_TABLE;
      const row = rows.get(key) || { items: 0, receivers: new Set<string>() };
      row.items += 1;
      row.receivers.add(item.receiver.username);
      rows.set(key, row);
    });
    return Array.from(rows.entries())
      .map(([key, row]): TableRow => ({
        table: key,
        items: row.items,
        receivers: row.receivers.size,
      }))
      .sort((a, b) => byTable(a.table, b.table));
  }, [hubItems]);

  const shown = useMemo(
    () =>
      table === "all"
        ? hubItems
        : hubItems.filter((item) => (item.table_number || NO_TABLE) === table),
    [hubItems, table]
  );

  if (!hubItems.length) {
    return (
      <p className="text-sm text-gray-600">
        <I18N id="adminShipping.tables.none" />
      </p>
    );
  }

  return (
    <>
      <p className="mb-4 text-sm text-gray-600">
        <I18N id="adminShipping.tables.total" values={[tables.length, hubItems.length]} />
      </p>
      <div className="overflow-x-auto mb-6">
        <table className="w-full sm:w-auto text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-200">
              <th className="py-2 pr-6"><I18N id="adminShipping.tables.col.table" /></th>
              <th className="py-2 pr-6 text-right"><I18N id="adminShipping.tables.col.items" /></th>
              <th className="py-2 text-right"><I18N id="adminShipping.tables.col.receivers" /></th>
            </tr>
          </thead>
          <tbody>
            {tables.map((row) => (
              <tr
                key={row.table}
                className={clsx("border-b border-gray-100", {
                  "bg-sky-50": row.table === table,
                })}
              >
                <td className="py-1.5 pr-6">
                  <button
                    type="button"
                    className="text-primary hover:underline font-semibold"
                    onClick={() => setTable(row.table)}
                  >
                    {row.table}
                  </button>
                </td>
                <td className="py-1.5 pr-6 text-right">{row.items}</td>
                <td className="py-1.5 text-right">{row.receivers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-end gap-3 mb-4">
        <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
          <I18N id="adminShipping.tables.filter" />
          <select
            className={selectClass}
            value={table}
            onChange={(e) => setTable(e.target.value)}
          >
            <option value="all">{getI18Ntext("adminShipping.tables.all")}</option>
            {tables.map((row) => (
              <option key={row.table} value={row.table}>
                {row.table}
              </option>
            ))}
          </select>
        </label>
        <div className="font-semibold">
          <I18N id="adminShipping.count" values={[shown.length]} />
        </div>
      </div>
      <ItemsTable items={shown} />
    </>
  );
};

export default TablesTab;
