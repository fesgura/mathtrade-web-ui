import { cropWord } from "@/utils/text";
import type {
  ShippingItem,
  ShippingLoc,
  ShippingPerson,
} from "@/app/mathtrade/admin/shipping/types";
import type { HubRole, Tag } from "./types";

const person = ({ first_name, last_name, city }: ShippingPerson) =>
  `${first_name} ${last_name} (${city?.name || "-"})`;

const stop = (loc: ShippingLoc | null) => (loc ? loc.code ?? loc.name : "-");

export const shippingItemToTag = (
  item: ShippingItem,
  hubId: number | null
): Tag => {
  const { code, title, giver, receiver, origin, via, destination, kind } = item;
  const isLocal = kind === "local";
  const isHub = (loc: ShippingLoc | null) =>
    hubId != null && loc?.id === hubId;
  let hubRole: HubRole | null = null;
  let hub: ShippingLoc | null = null;
  if (!isLocal && isHub(destination)) {
    hubRole = "stays";
    hub = destination;
  } else if (!isLocal && (isHub(via) || isHub(origin))) {
    hubRole = "leaves";
    hub = isHub(via) ? via : origin;
  }
  return {
    id: String(code || 0).padStart(4, "0"),
    name: cropWord(title, 40),
    from: person(giver),
    to: person(receiver),
    route: via
      ? [stop(origin), stop(via), stop(destination)]
      : [stop(origin), stop(destination)],
    viaHub: kind === "via_hub",
    isLocal,
    hubRole,
    hub: hub ? stop(hub) : null,
    destCode: stop(destination),
    mesa: item.table_number || null,
  };
};
