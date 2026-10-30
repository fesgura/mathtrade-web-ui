// Run with: node --test src/utils/resultsSummary.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { toTradeRows, applyDeliveryStatus, type ResultsSummary } from "./resultsSummary.ts";

const member = (id: number) => ({ id, first_name: `U${id}`, last_name: "L", location: { name: "CABA" }, avatar: null });

// 1 gives item 10 to 2 and gets 20 (owned by 2); 2 gives 20 to 1 and gets 10.
// 1 also gives 11 to 3 and gets 30.
const summary: ResultsSummary = {
  version: "2026-10-29T10:00:00-03:00",
  trades: [
    { id: 7, member: 1, member_to: 3, item_to: 11, item_from: 30, table_number: null, via_meeting: false, show_label: true, assigned_trade_code: 2 },
    { id: 5, member: 1, member_to: 2, item_to: 10, item_from: 20, table_number: "A1", via_meeting: true, show_label: false, assigned_trade_code: 1 },
    { id: 6, member: 2, member_to: 1, item_to: 20, item_from: 10, table_number: "A1", via_meeting: true, show_label: false, assigned_trade_code: 1 },
  ],
  items: {
    "10": { id: 10, title: "Ten", elements: [{ id: 100 }], member: 1 },
    "11": { id: 11, title: "Eleven", elements: [], member: 1 },
    "20": { id: 20, title: "Twenty", elements: [], member: 2 },
  },
  members: { "1": member(1), "2": member(2) },
};

test("only the user's rows, ordered by id", () => {
  assert.deepEqual(toTradeRows(summary, 1).map((r) => r.id), [5, 7]);
  assert.deepEqual(toTradeRows(summary, 2).map((r) => r.id), [6]);
});

test("row shape and membership_from from the item owner", () => {
  const [row] = toTradeRows(summary, 1);
  assert.equal(row.membership?.id, 1);
  assert.equal(row.membership_to?.id, 2);
  assert.equal(row.item_to?.title, "Ten");
  assert.deepEqual(row.item_to?.elements, [{ id: 100 }]);
  assert.equal(row.item_to?.membership?.id, 1);
  assert.equal(row.item_from?.id, 20);
  assert.equal(row.membership_from?.id, 2);
  assert.equal(row.table_number, "A1");
  assert.equal(row.via_meeting, true);
  assert.equal(row.show_label, false);
  assert.equal(row.assigned_trade_code, 1);
  assert.equal(row.delivered, false);
  assert.equal(row.received, false);
});

test("a missing item or member gives null", () => {
  const row = toTradeRows(summary, 1)[1];
  assert.equal(row.item_from, null);
  assert.equal(row.membership_from, null);
  assert.equal(row.membership_to, null);
  assert.equal(row.item_to?.id, 11);
});

test("string and number userId give the same rows", () => {
  assert.deepEqual(toTradeRows(summary, "1"), toTradeRows(summary, 1));
});

test("null summary or user gives []", () => {
  assert.deepEqual(toTradeRows(null, 1), []);
  assert.deepEqual(toTradeRows(summary, null), []);
});

test("applyDeliveryStatus merges by id; unknown ids stay false", () => {
  const rows = applyDeliveryStatus(toTradeRows(summary, 1), [
    { id: 5, delivered: true, received: true },
    { id: 99, delivered: true },
  ]);
  assert.deepEqual(rows.map((r) => [r.id, r.delivered, r.received]), [
    [5, true, true],
    [7, false, false],
  ]);
  const plain = toTradeRows(summary, 1);
  assert.deepEqual(applyDeliveryStatus(plain, null), plain);
});
