"use client";
import { useMemo, useState } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import ItemsTable, { fullName } from "./ItemsTable";
import TablesList, { NO_TABLE, byTable, indexRows } from "./TablesList";
import type { TableListMember, TableListRow } from "./TablesList";
import TablesReassign from "./TablesReassign";
import type { HubTables, ShippingItem } from "./types";

type ItemSort = "table" | "code" | "receiver";
const ITEM_SORTS: ItemSort[] = ["table", "code", "receiver"];

const tableOf = (item: ShippingItem) => item.table_number || NO_TABLE;
const receiverName = (item: ShippingItem) =>
  fullName(item.receiver) || item.receiver.username;
const byName = (a: string, b: string) => a.localeCompare(b, "es", { sensitivity: "base" });
const byCode = (a: ShippingItem, b: ShippingItem) =>
  (a.code || 0) - (b.code || 0) || a.trade_id - b.trade_id;

const ITEM_COMPARE: Record<ItemSort, (a: ShippingItem, b: ShippingItem) => number> = {
  table: (a, b) =>
    byTable(tableOf(a), tableOf(b)) || byName(receiverName(a), receiverName(b)) || byCode(a, b),
  code: byCode,
  receiver: (a, b) => byName(receiverName(a), receiverName(b)) || byCode(a, b),
};

// The hub's tables: every item whose destination is the hub (local trades
// between attendees included) grouped by the trade's table number, with how
// many copies and receivers each table gets, who they are, and the items of
// one table. Above them, the panel that reassigns the tables.
const TablesTab = ({
  items = [],
  hubId = null,
  selectClass = "",
  onTablesChanged = () => {},
}: {
  items?: ShippingItem[];
  hubId?: number | null;
  selectClass?: string;
  onTablesChanged?: () => void;
}) => {
  const [table, setTable] = useState<string>("all");
  const [itemSort, setItemSort] = useState<ItemSort>("table");
  const [applied, setApplied] = useState(false);

  const [reloadTables, tablesData] = useFetch({
    endpoint: "GET_SHIPPING_TABLES",
    initialState: null,
    autoLoad: true,
  });
  const params = (tablesData as HubTables | null)?.params || null;

  const hubItems = useMemo(
    () => items.filter((item) => hubId != null && item.destination?.id === hubId),
    [items, hubId]
  );

  const tables = useMemo(() => {
    const rows = new Map<string, { items: number; members: Map<string, TableListMember> }>();
    hubItems.forEach((item) => {
      const key = tableOf(item);
      const row = rows.get(key) || { items: 0, members: new Map<string, TableListMember>() };
      row.items += 1;
      const { username } = item.receiver;
      const member = row.members.get(username) || {
        key: username,
        name: fullName(item.receiver),
        username,
        items: 0,
      };
      member.items += 1;
      row.members.set(username, member);
      rows.set(key, row);
    });
    return indexRows(
      Array.from(rows.entries()).map(
        ([key, row]): TableListRow => ({
          table: key,
          items: row.items,
          receivers: row.members.size,
          members: Array.from(row.members.values()).sort(
            (a, b) => byName(a.name || a.username, b.name || b.username)
          ),
        })
      )
    );
  }, [hubItems]);

  const shown = useMemo(
    () =>
      (table === "all" ? hubItems : hubItems.filter((item) => tableOf(item) === table))
        .slice()
        .sort(ITEM_COMPARE[itemSort]),
    [hubItems, table, itemSort]
  );

  const reassign = (
    <>
      {applied ? (
        <p className="mb-3 text-sm font-semibold text-green-700">
          <I18N id="adminShipping.tables.reassign.done" />
        </p>
      ) : null}
      {tablesData ? (
        <TablesReassign
          // A new edition of the parameters (after applying) starts a new form.
          key={JSON.stringify(params)}
          params={params}
          onApplied={() => {
            setApplied(true);
            setTable("all");
            reloadTables();
            onTablesChanged();
          }}
        />
      ) : null}
    </>
  );

  if (!hubItems.length) {
    return (
      <>
        {reassign}
        <p className="text-sm text-gray-600">
          <I18N id="adminShipping.tables.none" />
        </p>
      </>
    );
  }

  return (
    <>
      {reassign}
      <h2 className="font-semibold mb-1">
        <I18N id="adminShipping.tables.current" />
      </h2>
      <p className="mb-4 text-sm text-gray-600">
        <I18N id="adminShipping.tables.total" values={[tables.length, hubItems.length]} />
      </p>
      <div className="mb-6">
        <TablesList rows={tables} selected={table} onSelect={setTable} />
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
        <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
          <I18N id="adminShipping.tables.itemSort" />
          <select
            className={selectClass}
            value={itemSort}
            onChange={(e) => setItemSort(e.target.value as ItemSort)}
          >
            {ITEM_SORTS.map((key) => (
              <option key={key} value={key}>
                {getI18Ntext(`adminShipping.tables.itemSort.${key}`)}
              </option>
            ))}
          </select>
        </label>
        <div className="font-semibold">
          <I18N id="adminShipping.count" values={[shown.length]} />
        </div>
      </div>
      <ItemsTable items={shown} showTable />
    </>
  );
};

export default TablesTab;
