import { cropWord } from "@/utils/text";
import type {
  ShippingItem,
  ShippingLoc,
  ShippingPerson,
} from "@/app/mathtrade/admin/shipping/types";
import type { Tag } from "./types";

const person = ({ first_name, last_name, city }: ShippingPerson) =>
  `${first_name} ${last_name} (${city?.name || "-"})`;

const stop = (loc: ShippingLoc | null) => (loc ? loc.code ?? loc.name : "-");

export const shippingItemToTag = (
  item: ShippingItem,
  hubId: number | null
): Tag => {
  const { code, title, giver, receiver, origin, via, destination, kind } = item;
  return {
    id: String(code || 0).padStart(4, "0"),
    name: cropWord(title, 40),
    from: person(giver),
    to: person(receiver),
    route: via
      ? [stop(origin), stop(via), stop(destination)]
      : [stop(origin), stop(destination)],
    viaHub: kind === "via_hub",
    isLocal: kind === "local",
    staysAtHub: hubId != null && destination?.id === hubId,
    mesa: item.table_number || null,
  };
};
