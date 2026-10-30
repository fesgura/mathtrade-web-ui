import { cropWord } from "@/utils/text";
import type {
  ShippingItem,
  ShippingLoc,
  ShippingPerson,
} from "@/app/mathtrade/admin/shipping/types";
import type { Tag } from "./types";

const person = ({ first_name, last_name, city }: ShippingPerson) =>
  `${first_name} ${last_name} (${city?.name || "-"})`;

// A shipping route as last year's labels: anything that touches the hub
// (passes through it, ends there or leaves from it) is "Mandar a CABA";
// a direct interior shipment or a local trade names its destination.
export const shippingItemToTag = (
  item: ShippingItem,
  hubId: number | null
): Tag => {
  const { code, title, giver, receiver, origin, via, destination, kind } = item;
  const isHub = (loc: ShippingLoc | null) => hubId != null && loc?.id === hubId;
  const viaHub =
    kind !== "local" && (isHub(via) || isHub(destination) || isHub(origin));
  return {
    id: String(code || 0).padStart(4, "0"),
    name: cropWord(title, 40),
    from: person(giver),
    to: person(receiver),
    mesa: item.table_number || "0",
    via: viaHub,
    altLocation: destination
      ? `${destination.name}, ${destination.province}`
      : "-",
    isAMBA: kind !== "local" && isHub(destination),
  };
};
