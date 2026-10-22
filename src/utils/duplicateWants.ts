// Cross-want duplicates: wants that could each bring the same game. Each want
// is fulfilled on its own (dup_protection only works inside one want), so a
// game wanted from two wants can arrive twice. The web warns; nothing is
// blocked. The BE mirrors this rule in `mathtrade/wants/duplicates.py`, and
// both are checked against `duplicateWants.cases.json`.
//
// Dependency-free leaf on purpose: `node --test` runs the test against this
// file directly, so no `@/` imports and only erasable TS syntax.

export type CopyLike = {
  id?: number | string;
  elements?: {
    element?: { game?: { bgg_id?: number | string | null } | null } | null;
    game_id?: number | string | null;
  }[];
};

export type WantLike = {
  id?: number | string;
  type?: string; // "game" | "item" | "tag"
  bgg_id?: number | string | null;
  wants?: CopyLike[];
};

export type DuplicateEntry = {
  kind: "game" | "combo";
  bggId: string | null;
  itemId: string | null;
  groupIds: string[];
};

export type DuplicateRule = "item" | "game";

// BGG ids of a copy's elements (same extraction as ban/isWanted.ts).
export const gameIdsOf = (copy: CopyLike): string[] =>
  (copy?.elements || [])
    .map((el) => el?.element?.game?.bgg_id ?? el?.game_id)
    .filter((id) => id != null && `${id}` !== "")
    .map((id) => `${id}`);

// The one game a copy is, or null: no game data, or a combo (>1 distinct id).
export const singleGameOf = (copy: CopyLike): string | null => {
  const ids = Array.from(new Set(gameIdsOf(copy)));
  return ids.length === 1 ? ids[0] : null;
};

const addTo = (map: Map<string, Set<string>>, key: string, value: string) => {
  let set = map.get(key);
  if (!set) {
    set = new Set();
    map.set(key, set);
  }
  set.add(value);
};

// Which groups want each game: a game want with at least one copy (the web
// never sees ignored copies, so an empty game want means all were ignored),
// plus every group holding a single-game copy of it.
const wantersByGame = (groups: WantLike[]): Map<string, Set<string>> => {
  const wantersOf = new Map<string, Set<string>>();
  for (const group of groups) {
    const gid = `${group.id}`;
    const wants = group.wants || [];
    if (
      group.type === "game" &&
      group.bgg_id != null &&
      `${group.bgg_id}` !== "" &&
      wants.length > 0
    ) {
      addTo(wantersOf, `${group.bgg_id}`, gid);
    }
    for (const copy of wants) {
      const game = singleGameOf(copy);
      if (game) addTo(wantersOf, game, gid);
    }
  }
  return wantersOf;
};

const byString = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

export const findDuplicateWants = (
  myWants: WantLike[] | null | undefined
): DuplicateEntry[] => {
  const groups = myWants || [];
  const wantersOf = wantersByGame(groups);
  const comboGroups = new Map<string, Set<string>>();
  const groupType = new Map<string, string | undefined>();

  for (const group of groups) {
    const gid = `${group.id}`;
    groupType.set(gid, group.type);
    for (const copy of group.wants || []) {
      if (new Set(gameIdsOf(copy)).size > 1) {
        addTo(comboGroups, `${copy.id}`, gid);
      }
    }
  }

  const games: DuplicateEntry[] = [];
  wantersOf.forEach((set, bggId) => {
    if (set.size >= 2) {
      games.push({
        kind: "game",
        bggId,
        itemId: null,
        groupIds: Array.from(set).sort(byString),
      });
    }
  });

  const combos: DuplicateEntry[] = [];
  comboGroups.forEach((set, itemId) => {
    const ids = Array.from(set);
    if (ids.length >= 2 && ids.some((g) => groupType.get(g) !== "game")) {
      combos.push({
        kind: "combo",
        bggId: null,
        itemId,
        groupIds: ids.sort(byString),
      });
    }
  });

  games.sort((a, b) => byString(a.bggId as string, b.bggId as string));
  combos.sort((a, b) => byString(a.itemId as string, b.itemId as string));
  return [...games, ...combos];
};

// If these copies are added to the target want (a tag want; null = none
// yet), which ones would join a duplicate? "item": the copy is already in
// another want (checked first, the more specific text). "game": another want
// already wants the copy's game. Copies that hit neither are absent. Two
// candidates of the same game going into the same target don't flag each
// other: the target's dup_protection covers that.
export const duplicateRuleForCopies = (
  myWants: WantLike[] | null | undefined,
  targetGroupId: number | string | null | undefined,
  copies: CopyLike[]
): Map<string, DuplicateRule> => {
  const target = targetGroupId == null ? null : `${targetGroupId}`;
  const others = (myWants || []).filter(
    (g) => target === null || `${g.id}` !== target
  );
  const copyIdsElsewhere = new Set<string>();
  for (const group of others) {
    for (const copy of group.wants || []) copyIdsElsewhere.add(`${copy.id}`);
  }
  const wantersOf = wantersByGame(others);

  const result = new Map<string, DuplicateRule>();
  for (const copy of copies || []) {
    if (!copy || copy.id == null) continue;
    const id = `${copy.id}`;
    if (copyIdsElsewhere.has(id)) {
      result.set(id, "item");
      continue;
    }
    const game = singleGameOf(copy);
    if (game && wantersOf.has(game)) result.set(id, "game");
  }
  return result;
};
