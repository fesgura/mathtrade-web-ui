// How one entry of `GET user-want-groups/duplicates/` is shown in the list
// modal. The BE sends raw names (BGG titles keep entities such as `&amp;`), a
// copy's item want is named like the copy ("Cryptid (2018)"), and groups come
// in id order. This turns that into short, ordered, deduplicated rows.
//
// Dependency-free leaf on purpose (like duplicateWants.ts): `node --test`
// runs the test against this file directly, so no `@/` imports and only
// erasable TS syntax.

export type DisplayInputGroup = { id: number; name: string; type: string };
export type DisplayInputEntry = {
  name: string;
  owner?: string | null;
  groups: DisplayInputGroup[];
};

export type DisplayGroup = {
  key: string;
  type: string;
  // null: an item want for the entry itself, shown as the type label only.
  name: string | null;
  // Item wants with the same shown label, collapsed into this row.
  count: number;
};

const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

// Decodes the few entities BGG titles carry. The result is plain text: render
// it as JSX text, never as HTML. Unknown or invalid entities stay as written.
export const decodeEntities = (text: string | null | undefined): string =>
  (text ?? "").replace(
    /&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi,
    (match: string, body: string) => {
      if (body[0] === "#") {
        const code =
          body[1] === "x" || body[1] === "X"
            ? parseInt(body.slice(2), 16)
            : parseInt(body.slice(1), 10);
        return code > 0 && code <= 0x10ffff
          ? String.fromCodePoint(code)
          : match;
      }
      return NAMED[body.toLowerCase()] ?? match;
    },
  );

// "Cryptid (2018)" and "cryptid" are the same title; "Malas Compañías (2022)"
// is not "Bad Company".
const sameTitleKey = (text: string): string =>
  text
    .replace(/\s*\(\d{4}\)\s*$/, "")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase();

const TYPE_ORDER: Record<string, number> = { game: 0, tag: 1, item: 2 };

export const displayGroups = (entry: DisplayInputEntry): DisplayGroup[] => {
  const entryKey = sameTitleKey(decodeEntities(entry.name));
  const ordered = entry.groups
    .map((g, i) => ({ g, i }))
    .sort(
      (a, b) =>
        (TYPE_ORDER[a.g.type] ?? 3) - (TYPE_ORDER[b.g.type] ?? 3) || a.i - b.i,
    );

  const rows: DisplayGroup[] = [];
  const itemRows = new Map<string, DisplayGroup>();
  for (const { g } of ordered) {
    const name = decodeEntities(g.name).trim();
    if (g.type !== "item") {
      rows.push({ key: `${g.id}`, type: g.type, name, count: 1 });
      continue;
    }
    const isSelf = sameTitleKey(name) === entryKey;
    const label = isSelf ? null : name;
    const labelKey = label === null ? "\u0000self" : label;
    const existing = itemRows.get(labelKey);
    if (existing) {
      existing.count += 1;
      continue;
    }
    const row: DisplayGroup = {
      key: `${g.id}`,
      type: "item",
      name: label,
      count: 1,
    };
    itemRows.set(labelKey, row);
    rows.push(row);
  }
  return rows;
};
