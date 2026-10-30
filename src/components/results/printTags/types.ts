export type Tag = {
  id: string; // 4-digit trade code
  name: string; // item title, cropped
  from: string; // "Nombre Apellido (Ciudad)"
  to: string; // "Nombre Apellido (Ciudad)"
  route: string[]; // ["ROS", "AMBA", "MDQ"]: code, or name when there's none
  viaHub: boolean;
  staysAtHub: boolean; // destination is the hub: show the table number
  mesa: string | null;
};
