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
