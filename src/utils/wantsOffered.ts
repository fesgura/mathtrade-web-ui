// Adapter for GET wants-offered/: the API sends ids per row plus lookup maps
// (items{}, members{}) so each copy and member goes once; the section wants
// rows with titles and owner names. Pure (no "@/" imports) so node --test runs it.

export type WantsOfferedPayload = {
  version: string | null;
  rows: { item_id: number; offered: number[] }[];
  items: Record<string, { id: number; title: string; member: number }>;
  members: Record<string, { id: number; first_name: string; last_name: string }>;
};

export type WantsOfferedChip = { id: number; title: string; owner: string };

export type WantsOfferedRow = {
  itemId: number;
  title: string;
  offered: WantsOfferedChip[];
};

const isObject = (value: unknown): value is Record<string, any> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

// Rows keep the API order (by title); an id missing from items{} is skipped.
export const toWantsOfferedRows = (payload: unknown): WantsOfferedRow[] => {
  if (!isObject(payload) || !Array.isArray(payload.rows)) return [];
  const items = isObject(payload.items) ? payload.items : {};
  const members = isObject(payload.members) ? payload.members : {};
  const owner = (memberId: unknown): string => {
    const m = members[String(memberId)];
    return m ? `${m.first_name ?? ""} ${m.last_name ?? ""}`.trim() : "";
  };
  const rows: WantsOfferedRow[] = [];
  payload.rows.forEach((row: any) => {
    const own = isObject(row) ? items[String(row.item_id)] : undefined;
    if (!own) return;
    const offered: WantsOfferedChip[] = [];
    (Array.isArray(row.offered) ? row.offered : []).forEach((id: unknown) => {
      const item = items[String(id)];
      if (item) offered.push({ id: item.id, title: item.title, owner: owner(item.member) });
    });
    rows.push({ itemId: own.id, title: own.title, offered });
  });
  return rows;
};
