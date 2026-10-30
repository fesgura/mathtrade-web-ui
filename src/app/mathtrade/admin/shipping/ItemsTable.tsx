import I18N from "@/i18n";
import { KindBadge, LocName } from "./RoutesTable";
import type { ShippingItem, ShippingPerson } from "./types";

export const tradeCode = (code: number | null) => String(code || 0).padStart(4, "0");

export const fullName = (person: ShippingPerson) =>
  `${person.first_name} ${person.last_name}`.trim();

const Person = ({ person = null }: { person?: ShippingPerson | null }) =>
  person ? (
    <>
      <div>{fullName(person) || person.username}</div>
      <div className="text-xs text-gray-500">
        {person.username}
        {person.city ? ` · ${person.city.name}` : ""}
      </div>
    </>
  ) : (
    <span className="text-gray-400">-</span>
  );

// One row per item: who gives it, its route and who receives it (and its
// hub table, with showTable).
const ItemsTable = ({
  items = [],
  showTable = false,
}: {
  items?: ShippingItem[];
  showTable?: boolean;
}) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-gray-500 border-b border-gray-200">
          {showTable ? (
            <th className="py-2 pr-4"><I18N id="adminShipping.tables.col.table" /></th>
          ) : null}
          <th className="py-2 pr-4"><I18N id="adminShipping.col.code" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.item" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.giver" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.origin" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.via" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.destination" /></th>
          <th className="py-2 pr-4"><I18N id="adminShipping.col.receiver" /></th>
          <th className="py-2"><I18N id="adminShipping.col.kind" /></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.trade_id} className="border-b border-gray-300 align-top">
            {showTable ? (
              <td className="py-2 pr-4 font-semibold">{item.table_number || "-"}</td>
            ) : null}
            <td className="py-2 pr-4 font-mono">{tradeCode(item.code)}</td>
            <td className="py-2 pr-4">{item.title}</td>
            <td className="py-2 pr-4"><Person person={item.giver} /></td>
            <td className="py-2 pr-4"><LocName loc={item.origin} /></td>
            <td className="py-2 pr-4"><LocName loc={item.via} /></td>
            <td className="py-2 pr-4"><LocName loc={item.destination} /></td>
            <td className="py-2 pr-4"><Person person={item.receiver} /></td>
            <td className="py-2"><KindBadge kind={item.kind} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ItemsTable;
