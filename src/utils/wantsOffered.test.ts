// Run with: node --test src/utils/wantsOffered.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { toWantsOfferedRows, type WantsOfferedPayload } from "./wantsOffered.ts";

const payload: WantsOfferedPayload = {
  version: "2026-10-29T10:00:00-03:00",
  rows: [
    { item_id: 1, offered: [4, 6] },
    { item_id: 2, offered: [] },
  ],
  items: {
    "1": { id: 1, title: "Azul", member: 12 },
    "2": { id: 2, title: "Brass", member: 12 },
    "4": { id: 4, title: "Catan", member: 13 },
    "6": { id: 6, title: "Dune", member: 14 },
  },
  members: {
    "12": { id: 12, first_name: "Ana", last_name: "Uno" },
    "13": { id: 13, first_name: "Beto", last_name: "Dos" },
    "14": { id: 14, first_name: "Caro", last_name: "Tres" },
  },
};

test("rows with titles and owner names, in API order", () => {
  assert.deepEqual(toWantsOfferedRows(payload), [
    {
      itemId: 1,
      title: "Azul",
      offered: [
        { id: 4, title: "Catan", owner: "Beto Dos" },
        { id: 6, title: "Dune", owner: "Caro Tres" },
      ],
    },
    { itemId: 2, title: "Brass", offered: [] },
  ]);
});

test("ids missing from the lookup maps are skipped; a missing owner is blank", () => {
  const rows = toWantsOfferedRows({
    ...payload,
    rows: [{ item_id: 1, offered: [4, 99] }, { item_id: 98, offered: [4] }],
    members: { "12": payload.members["12"] },
  });
  assert.deepEqual(rows, [{ itemId: 1, title: "Azul", offered: [{ id: 4, title: "Catan", owner: "" }] }]);
});

test("null or malformed payloads give no rows", () => {
  assert.deepEqual(toWantsOfferedRows(null), []);
  assert.deepEqual(toWantsOfferedRows(undefined), []);
  assert.deepEqual(toWantsOfferedRows("x"), []);
  assert.deepEqual(toWantsOfferedRows({ rows: "nope" }), []);
  assert.deepEqual(toWantsOfferedRows({ rows: [null, 3] }), []);
  assert.deepEqual(toWantsOfferedRows({ rows: [{ item_id: 1, offered: [4] }] }), []);
});
