// Run with: node --test src/utils/tagItems.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  visibleTagItems,
  isIgnoredInTag,
  toItemTags,
  type MyTag,
  type TagItem,
} from "./tagItems.ts";

const item = (id: number, ignored?: boolean): TagItem => ({
  id,
  title: `Copy ${id}`,
  elements: [{ bgg_id: 1000 + id }],
  contains_offered: false,
  ...(ignored === undefined ? {} : { ignored }),
});

const tag = (itemsComplete?: TagItem[]): MyTag => ({
  id: "1260",
  name: "AEON",
  color: "#ff0000",
  items: (itemsComplete || []).map(({ id }) => id),
  ...(itemsComplete ? { itemsComplete } : {}),
});

test("visibleTagItems keeps a copy without the flag", () => {
  assert.deepEqual(
    visibleTagItems([item(1)]).map(({ id }) => id),
    [1]
  );
});

test("visibleTagItems hides ignored copies and keeps ignored: false", () => {
  assert.deepEqual(
    visibleTagItems([item(1, true), item(2, false), item(3)]).map(
      ({ id }) => id
    ),
    [2, 3]
  );
});

test("visibleTagItems returns [] for null or undefined", () => {
  assert.deepEqual(visibleTagItems(null), []);
  assert.deepEqual(visibleTagItems(undefined), []);
});

test("isIgnoredInTag reads the flag of a tagged copy", () => {
  const t = tag([item(21456, true), item(1, false), item(2)]);
  assert.equal(isIgnoredInTag(t, 21456), true);
  assert.equal(isIgnoredInTag(t, "21456"), true);
  assert.equal(isIgnoredInTag(t, 1), false);
  assert.equal(isIgnoredInTag(t, 2), false);
});

test("isIgnoredInTag is false for an untagged id", () => {
  assert.equal(isIgnoredInTag(tag([item(1, true)]), 999), false);
});

test("isIgnoredInTag is false without itemsComplete or tag", () => {
  assert.equal(isIgnoredInTag(tag(), 1), false);
  assert.equal(isIgnoredInTag(null, 1), false);
  assert.equal(isIgnoredInTag(undefined, 1), false);
});

test("toItemTags maps MYTAGS results to itemTags (ids + itemsComplete)", () => {
  const rows = [item(1, true), item(2)];
  const [first, second] = toItemTags([
    { id: 1260, name: "AEON", color: "#f00", items: rows },
    { name: "Sin id", color: "#0f0", items: [] },
  ]);
  assert.equal(first.id, "1260");
  assert.equal(first.name, "AEON");
  assert.deepEqual(first.items, [1, 2]);
  assert.equal(first.itemsComplete, rows);
  assert.equal(isIgnoredInTag(first, 1), true);
  assert.equal(second.id, "1");
  assert.deepEqual(second.items, []);
});

test("toItemTags returns [] for null or undefined", () => {
  assert.deepEqual(toItemTags(null), []);
  assert.deepEqual(toItemTags(undefined), []);
});
