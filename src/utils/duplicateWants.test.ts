// Run with: node --test src/utils/duplicateWants.test.ts
// The case table is shared with the BE (mathtrade/wants/duplicates.py tests).
import { test } from "node:test";
import assert from "node:assert/strict";
import cases from "./duplicateWants.cases.json" with { type: "json" };
import {
  findDuplicateWants,
  duplicateRuleForCopies,
  singleGameOf,
  type CopyLike,
  type DuplicateEntry,
  type WantLike,
} from "./duplicateWants.ts";

type CaseCopy = { games: number[]; ignored?: boolean };
type CaseGroup = {
  key: string;
  type: string;
  bgg_id?: number;
  wants: string[];
};
type CaseExpected = {
  kind: string;
  bgg?: number;
  copy?: string;
  groups: string[];
};
type Case = {
  name: string;
  copies: Record<string, CaseCopy>;
  groups: CaseGroup[];
  expected: CaseExpected[];
};

const copyOf = (id: string, games: (number | string)[]): CopyLike => ({
  id,
  elements: games.map((g) => ({ game_id: g })),
});

// The web never sees ignored copies (the BE drops them from `wants`).
const toMyWants = (c: Case): WantLike[] =>
  c.groups.map((g) => ({
    id: g.key,
    type: g.type,
    bgg_id: g.bgg_id ?? null,
    wants: g.wants
      .filter((k) => !c.copies[k]?.ignored)
      .map((k) => copyOf(k, c.copies[k].games)),
  }));

const normalize = (e: {
  kind: string;
  bgg?: unknown;
  copy?: unknown;
  groups: string[];
}) =>
  JSON.stringify({
    kind: e.kind,
    ref: e.kind === "game" ? `${e.bgg}` : `${e.copy}`,
    groups: [...e.groups].sort(),
  });

const fromEntry = (e: DuplicateEntry) =>
  normalize({ kind: e.kind, bgg: e.bggId, copy: e.itemId, groups: e.groupIds });

for (const c of cases as Case[]) {
  test(`case table: ${c.name}`, () => {
    const actual = findDuplicateWants(toMyWants(c)).map(fromEntry).sort();
    const expected = c.expected.map(normalize).sort();
    assert.deepEqual(actual, expected);
  });
}

test("duplicateRuleForCopies", async (t) => {
  const g: WantLike = {
    id: 1,
    type: "game",
    bgg_id: 9001,
    wants: [copyOf("c1", [9001]), copyOf("cx", [9001, 9002])],
  };
  const tag: WantLike = { id: 2, type: "tag", wants: [copyOf("c9", [9005])] };
  const item: WantLike = { id: 3, type: "item", wants: [copyOf("c7", [9003])] };
  const myWants = [g, tag, item];

  await t.test("a copy already in another group -> item", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("c1", [9001])]);
    assert.equal(r.get("c1"), "item");
  });
  await t.test("a single game wanted elsewhere -> game", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("c2", [9001])]);
    assert.equal(r.get("c2"), "game");
  });
  await t.test("a copy present only in the target -> absent", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("c9", [9005])]);
    assert.equal(r.has("c9"), false);
  });
  await t.test("a combo in a game want added to a tag -> item", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("cx", [9001, 9002])]);
    assert.equal(r.get("cx"), "item");
  });
  await t.test("a clean copy -> absent", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("c8", [9008])]);
    assert.equal(r.size, 0);
  });
  await t.test("a no-data copy -> absent", () => {
    const r = duplicateRuleForCopies(myWants, 2, [copyOf("c6", [])]);
    assert.equal(r.size, 0);
  });
  await t.test("null target checks every group", () => {
    const r = duplicateRuleForCopies(myWants, null, [copyOf("c9", [9005])]);
    assert.equal(r.get("c9"), "item");
  });
  await t.test(
    "a game want whose copies were all ignored doesn't count",
    () => {
      const empty: WantLike = { id: 4, type: "game", bgg_id: 9010, wants: [] };
      const r = duplicateRuleForCopies([empty, tag], 2, [copyOf("c3", [9010])]);
      assert.equal(r.size, 0);
    }
  );
});

test("singleGameOf", () => {
  assert.equal(singleGameOf(copyOf("a", [])), null);
  assert.equal(singleGameOf(copyOf("b", [9001, 9002])), null);
  assert.equal(singleGameOf(copyOf("c", [9001, 9001])), "9001");
  assert.equal(
    singleGameOf({
      id: "d",
      elements: [{ element: { game: { bgg_id: 77 } } }],
    }),
    "77"
  );
});

test("perf: 2,000 groups / 6,000 rows under 50 ms", () => {
  const types = ["game", "item", "tag"];
  const groups: WantLike[] = [];
  let copyId = 0;
  for (let i = 0; i < 2000; i++) {
    const type = types[i % 3];
    const base = 100000 + i * 10;
    const wants: CopyLike[] = [];
    for (let j = 0; j < 3; j++) {
      copyId++;
      // ~5% of rows reuse a game from another group; a few are combos.
      const overlap = copyId % 20 === 0;
      const game = overlap ? 100000 + ((i * 7) % 2000) * 10 : base + j;
      const games = copyId % 50 === 0 ? [game, game + 1] : [game];
      wants.push(copyOf(`${copyId}`, games));
    }
    groups.push({
      id: i,
      type,
      bgg_id: type === "game" ? base : null,
      wants,
    });
  }
  const rows = groups.reduce((n, g) => n + (g.wants || []).length, 0);
  assert.equal(rows, 6000);

  const times: number[] = [];
  let found = 0;
  for (let run = 0; run < 3; run++) {
    const start = performance.now();
    found = findDuplicateWants(groups).length;
    times.push(performance.now() - start);
  }
  times.sort((a, b) => a - b);
  assert.ok(found > 0, "the generated data has overlaps");
  assert.ok(times[1] < 50, `median ${times[1].toFixed(1)} ms`);
});
