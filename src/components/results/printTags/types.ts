// What a volunteer at the hub does with the item:
// "stays" = destination is the hub, it goes to a table (MESA, ●);
// "leaves" = it goes from the hub to the interior, packed in a box (CAJA, ◆),
// either passing through (via hub) or starting there (origin is the hub).
export type HubRole = "stays" | "leaves";

export type Tag = {
  id: string; // 4-digit trade code
  name: string; // item title, cropped
  from: string; // "Nombre Apellido (Ciudad)"
  to: string; // "Nombre Apellido (Ciudad)"
  route: string[]; // ["ROS", "AMBA", "MDQ"]: code, or name when there's none
  viaHub: boolean;
  isLocal: boolean; // same origin and destination: handed over in person
  hubRole: HubRole | null; // null: interior→interior direct, or local
  hub: string | null; // hub code (or name) when hubRole is set
  destCode: string; // destination code (or name)
  mesa: string | null;
};
