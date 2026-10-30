"use client";
import { useMemo, useState } from "react";
import Button from "@/components/button";
import PageHeader from "@/components/pageHeader";
import SectionCommon from "@/components/sections/common";
import ErrorAlert from "@/components/errorAlert";
import EmptyList from "@/components/emptyList";
import XlsButton from "@/components/xlsButton";
import Tabs from "@/components/tabs";
import I18N, { getI18Ntext } from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PRIVATE_ROUTES } from "@/config/routes";
import RoutesTable from "./RoutesTable";
import ItemsTable, { fullName, tradeCode } from "./ItemsTable";
import LabelsPanel from "./LabelsPanel";
import PublishControl from "./PublishControl";
import type {
  ShippingItem,
  ShippingKind,
  ShippingLoc,
  ShippingRoute,
  ShippingRoutes,
} from "./types";

const KINDS: ShippingKind[] = ["local", "direct", "via_hub"];

const TABS = [
  "adminShipping.tab.routes",
  "adminShipping.tab.items",
  "adminShipping.tab.labels",
];
const TAB_ROUTES = 0;
const TAB_ITEMS = 1;
const TAB_LABELS = 2;

type Filters = { origin: number | "all"; kind: ShippingKind | "all" };

const selectClass =
  "border border-stroke rounded-md p-2 text-sm bg-white w-full sm:w-auto max-w-full min-w-0";

const locText = (loc: ShippingLoc | null) => loc?.name || "";
const kindText = (kind: ShippingKind) => getI18Ntext(`adminShipping.kind.${kind}`);

const routesToExport = (routes: ShippingRoute[]) =>
  routes.map((route) => ({
    Origen: locText(route.origin),
    Intermedio: locText(route.via),
    Destino: locText(route.destination),
    Tipo: kindText(route.kind),
    Ítems: route.items,
  }));

const itemsToExport = (items: ShippingItem[]) =>
  items.map((item) => ({
    Código: tradeCode(item.code),
    Ítem: item.title,
    Entrega: fullName(item.giver),
    "Usuario entrega": item.giver.username,
    "Ciudad entrega": locText(item.giver.city),
    Origen: locText(item.origin),
    Intermedio: locText(item.via),
    Destino: locText(item.destination),
    Recibe: fullName(item.receiver),
    "Usuario recibe": item.receiver.username,
    "Ciudad recibe": locText(item.receiver.city),
    Tipo: kindText(item.kind),
    Mesa: item.table_number || "",
  }));

// Admins only (route "onlyForAdmin", endpoint IsAdminAuthenticated): where
// every item of the edition ships from, whether it stops at the hub (AMBA)
// and where it goes. Three tabs: "Por ruta" (totals per route), "Por ítem"
// (filtered item detail) and "Etiquetas" (labels PDF per origin, publishing).
const AdminShippingPage = () => {
  const [reload, data, loading, error] = useFetch({
    endpoint: "GET_SHIPPING_ROUTES",
    initialState: null,
    autoLoad: true,
  });
  const shipping = data as ShippingRoutes | null;
  const routes = useMemo(() => shipping?.routes || [], [shipping]);
  const items = useMemo(() => shipping?.items || [], [shipping]);

  const [filters, setFilters] = useState<Filters>({ origin: "all", kind: "all" });
  const [tab, setTab] = useState(TAB_ROUTES);
  // The labels tab picks its own origin: one PDF per origin, whatever the
  // detail is filtered by.
  const [labelsOrigin, setLabelsOrigin] = useState<number | "all">("all");

  // Distinct origins of the items, by name, for the origin filter.
  const origins = useMemo(() => {
    const byId = new Map<number, ShippingLoc>();
    items.forEach(({ origin }) => {
      if (origin) byId.set(origin.id, origin);
    });
    return Array.from(byId.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          (filters.origin === "all" || item.origin?.id === filters.origin) &&
          (filters.kind === "all" || item.kind === filters.kind)
      ),
    [items, filters]
  );

  const originName =
    filters.origin === "all"
      ? null
      : origins.find(({ id }) => id === filters.origin) || null;

  const labelsOriginLoc =
    labelsOrigin === "all"
      ? null
      : origins.find(({ id }) => id === labelsOrigin) || null;
  const labelsItems = useMemo(
    () =>
      labelsOrigin === "all"
        ? []
        : items.filter((item) => item.origin?.id === labelsOrigin),
    [items, labelsOrigin]
  );

  const originSelect = (
    value: number | "all",
    onChange: (value: number | "all") => void
  ) => (
    <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
      <I18N id="adminShipping.filter.origin" />
      <select
        className={selectClass}
        value={String(value)}
        onChange={(e) => {
          const { value } = e.target;
          onChange(value === "all" ? "all" : Number(value));
        }}
      >
        <option value="all">{getI18Ntext("adminShipping.filter.allOrigins")}</option>
        {origins.map(({ id, name }) => (
          <option key={id} value={String(id)}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );

  const onOriginClick = (originId: number) => {
    setFilters((current) => ({ ...current, origin: originId }));
    setTab(TAB_ITEMS);
  };

  return (
    <>
      <PageHeader title="adminShipping.title" variant="minimal" />
      <SectionCommon loading={loading}>
        <div className="md:px-7 px-3 py-7">
          <div className="mb-4">
            <Button tag="link" href={PRIVATE_ROUTES.ADMIN_PANEL.path} sm outline>
              <I18N id="adminShipping.back" />
            </Button>
          </div>
          <ErrorAlert error={error} />
          {!loading && !routes.length ? (
            <EmptyList visible icon="status-box" message="adminShipping.none" />
          ) : null}
          {shipping && routes.length ? (
            <>
              <Tabs list={TABS} value={tab} onChange={setTab} className="mb-4" />
              {tab === TAB_ROUTES ? (
                <>
                  <p className="mb-4 text-sm text-gray-600">
                    <I18N id="adminShipping.threshold" values={[shipping.threshold]} />
                    {" · "}
                    <I18N id="adminShipping.hub" values={[shipping.hub?.name || "-"]} />
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h2 className="font-semibold">
                      <I18N id="adminShipping.summary" />
                    </h2>
                    <XlsButton
                      data={routesToExport(routes)}
                      filename="rutas_envio"
                      className=""
                    />
                  </div>
                  <RoutesTable routes={routes} onOriginClick={onOriginClick} />
                </>
              ) : tab === TAB_ITEMS ? (
                <>
                  <h2 className="font-semibold mb-2">
                    <I18N id="adminShipping.detail" />
                  </h2>
                  <div className="flex flex-wrap items-end gap-3 mb-4">
                    {originSelect(filters.origin, (origin) =>
                      setFilters((current) => ({ ...current, origin }))
                    )}
                    <label className="text-xs text-gray-500 flex flex-col gap-1 w-full sm:w-auto">
                      <I18N id="adminShipping.filter.kind" />
                      <select
                        className={selectClass}
                        value={filters.kind}
                        onChange={(e) => {
                          const { value } = e.target;
                          setFilters((current) => ({
                            ...current,
                            kind: value as Filters["kind"],
                          }));
                        }}
                      >
                        <option value="all">{getI18Ntext("adminShipping.filter.allKinds")}</option>
                        {KINDS.map((kind) => (
                          <option key={kind} value={kind}>
                            {kindText(kind)}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="font-semibold">
                      <I18N id="adminShipping.count" values={[filteredItems.length]} />
                    </div>
                    {filteredItems.length ? (
                      <XlsButton
                        data={itemsToExport(filteredItems)}
                        filename={`envios_${originName?.code || originName?.name || "todos"}`}
                        className=""
                      />
                    ) : null}
                  </div>
                  <ItemsTable items={filteredItems} />
                </>
              ) : (
                <>
                  <PublishControl
                    publishedAt={shipping.published_at ?? null}
                    onChange={() => reload()}
                  />
                  <div className="flex flex-wrap items-end gap-3 mb-2">
                    {originSelect(labelsOrigin, setLabelsOrigin)}
                  </div>
                  <LabelsPanel
                    items={labelsItems}
                    hubId={shipping?.hub?.id ?? null}
                    originName={labelsOriginLoc}
                  />
                </>
              )}
            </>
          ) : null}
        </div>
      </SectionCommon>
    </>
  );
};

export default AdminShippingPage;
