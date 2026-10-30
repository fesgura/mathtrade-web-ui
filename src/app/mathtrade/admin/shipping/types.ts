export type ShippingLoc = { id: number; name: string; province: string | null; code: string | null };
export type ShippingKind = "local" | "direct" | "via_hub";
export type ShippingPerson = { username: string; first_name: string; last_name: string; city: ShippingLoc | null };
export type ShippingItem = {
  trade_id: number;
  code: number | null;
  title: string;
  table_number: string | null;
  giver: ShippingPerson;
  receiver: ShippingPerson;
  origin: ShippingLoc | null;
  via: ShippingLoc | null;
  destination: ShippingLoc | null;
  kind: ShippingKind;
};
export type ShippingRoute = {
  origin: ShippingLoc | null;
  via: ShippingLoc | null;
  destination: ShippingLoc | null;
  kind: ShippingKind;
  items: number;
};
export type ShippingRoutes = {
  hub: ShippingLoc | null;
  threshold: number;
  routes: ShippingRoute[];
  items: ShippingItem[];
  published_at?: string | null;
};
// Hub tables (BE results/tables.py): who receives at each table.
export type TableMember = { id: number; username: string; name: string; items: number };
export type HubTable = { table: string | null; items: number; users: number; members: TableMember[] };
export type TablesParams = {
  tables: number;
  max_items_per_table: number | null;
  big_user_threshold: number;
};
export type HubTables = { params: TablesParams; tables: HubTable[]; applied?: boolean };
