// Run with: node --test src/utils/mergeReloadedWants.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  mergeReloadedWants,
  newWantsJournal,
  noteWantAdded,
  noteWantRemoved,
} from "./mergeReloadedWants.ts";

const ids = (list: { id?: unknown }[]) => list.map(({ id }) => id);

test("no local writes: the fetched list wins as is", () => {
  const fetched = [{ id: 1 }, { id: 2 }];
  assert.deepEqual(mergeReloadedWants(fetched, newWantsJournal()), fetched);
});

test("a want saved during the reload is kept when the fetch missed it", () => {
  const journal = newWantsJournal();
  noteWantAdded(journal, { id: 9, name: "new" });
  assert.deepEqual(ids(mergeReloadedWants([{ id: 1 }], journal)), [1, 9]);
});

test("the fetched copy wins when the fetch already has the new want", () => {
  const journal = newWantsJournal();
  noteWantAdded(journal, { id: 9, name: "local" });
  const merged = mergeReloadedWants([{ id: 9, name: "server" }], journal);
  assert.deepEqual(merged, [{ id: 9, name: "server" }]);
});

test("wants the BE dropped (ignore) are not brought back", () => {
  // Wants that existed before the reload are not in the journal.
  const merged = mergeReloadedWants([{ id: 2 }], newWantsJournal());
  assert.deepEqual(ids(merged), [2]);
});

test("a want removed during the reload stays removed", () => {
  const journal = newWantsJournal();
  noteWantRemoved(journal, 2);
  assert.deepEqual(ids(mergeReloadedWants([{ id: 1 }, { id: 2 }], journal)), [1]);
});

test("added then removed during the reload: gone", () => {
  const journal = newWantsJournal();
  noteWantAdded(journal, { id: 9 });
  noteWantRemoved(journal, 9);
  assert.deepEqual(ids(mergeReloadedWants([{ id: 1 }], journal)), [1]);
});

test("ids match across number and string", () => {
  const journal = newWantsJournal();
  noteWantAdded(journal, { id: 9 });
  assert.deepEqual(ids(mergeReloadedWants([{ id: "9" }], journal)), ["9"]);
});
