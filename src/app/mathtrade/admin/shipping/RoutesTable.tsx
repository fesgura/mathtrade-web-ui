import clsx from "clsx";
import I18N from "@/i18n";
import type { ShippingKind, ShippingLoc, ShippingRoute } from "./types";

const KIND_CLASS: Record<ShippingKind, string> = {
  local: "bg-gray-200 text-gray-700",
  direct: "bg-green-100 text-green-800",
  via_hub: "bg-amber-100 text-amber-800",
};

export const LocName = ({ loc = null }: { loc?: ShippingLoc | null }) =>
  loc ? (
    <>
      {loc.name}
      {loc.code ? <span className="ml-1 text-xs text-gray-400">{loc.code}</span> : null}
    </>
  ) : (
    <span className="text-gray-400">-</span>
  );

export const KindBadge = ({ kind = "direct" }: { kind?: ShippingKind }) => (
  <span
    className={clsx(
      "inline-block rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap",
      KIND_CLASS[kind]
    )}
  >
    <I18N id={`adminShipping.kind.${kind}`} />
  </span>
);

const routeKey = (route: ShippingRoute) =>
  [route.origin?.id, route.via?.id, route.destination?.id, route.kind].join("-");

// Per-route totals: origin → stop at the hub (if any) → destination.
const RoutesTable = ({ routes = [] }: { routes?: ShippingRoute[] }) => {
  const total = routes.reduce((sum, route) => sum + route.items, 0);
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-500 border-b border-gray-200">
            <th className="py-2 pr-4"><I18N id="adminShipping.col.origin" /></th>
            <th className="py-2 pr-4"><I18N id="adminShipping.col.via" /></th>
            <th className="py-2 pr-4"><I18N id="adminShipping.col.destination" /></th>
            <th className="py-2 pr-4"><I18N id="adminShipping.col.kind" /></th>
            <th className="py-2 text-right"><I18N id="adminShipping.col.items" /></th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route) => (
            <tr key={routeKey(route)} className="border-b border-gray-300">
              <td className="py-2 pr-4"><LocName loc={route.origin} /></td>
              <td className="py-2 pr-4"><LocName loc={route.via} /></td>
              <td className="py-2 pr-4"><LocName loc={route.destination} /></td>
              <td className="py-2 pr-4"><KindBadge kind={route.kind} /></td>
              <td className="py-2 text-right">{route.items}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="font-semibold">
            <td className="py-2 pr-4" colSpan={4}><I18N id="adminShipping.total" /></td>
            <td className="py-2 text-right">{total}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RoutesTable;
