// Run with: node --test src/utils/provisionalDates.test.ts
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getProvisionalDates,
  firstProvisional,
  nextProvisional,
  hasProvisional,
} from "./provisionalDates.ts";

const A = "2026-11-01T11:00:00Z";
const B = "2026-11-03T11:00:00Z";
const C = "2026-11-05T11:00:00Z";
const ms = (s: string) => new Date(s).getTime();

test("list wins over the scalar", () => {
  assert.deepEqual(
    getProvisionalDates({ provisional_results_dates: [B], provisional_results_date: A }),
    [ms(B)]
  );
});

test("unsorted list is returned sorted", () => {
  assert.deepEqual(getProvisionalDates({ provisional_results_dates: [C, A, B] }), [
    ms(A),
    ms(B),
    ms(C),
  ]);
});

test("empty list is authoritative over a non-null scalar", () => {
  assert.deepEqual(
    getProvisionalDates({ provisional_results_dates: [], provisional_results_date: A }),
    []
  );
});

test("missing list falls back to the scalar", () => {
  assert.deepEqual(getProvisionalDates({ provisional_results_date: A }), [ms(A)]);
  assert.deepEqual(
    getProvisionalDates({ provisional_results_dates: null, provisional_results_date: A }),
    [ms(A)]
  );
});

test("both missing, or no edition, gives []", () => {
  assert.deepEqual(getProvisionalDates({}), []);
  assert.deepEqual(getProvisionalDates({ provisional_results_date: null }), []);
  assert.deepEqual(getProvisionalDates(null), []);
  assert.deepEqual(getProvisionalDates(undefined), []);
});

test("invalid strings are dropped", () => {
  assert.deepEqual(
    getProvisionalDates({ provisional_results_dates: ["nope", "", B] }),
    [ms(B)]
  );
  assert.deepEqual(getProvisionalDates({ provisional_results_date: "garbage" }), []);
});

test("firstProvisional is the min, or null", () => {
  assert.equal(firstProvisional({ provisional_results_dates: [C, A] }), ms(A));
  assert.equal(firstProvisional({ provisional_results_dates: [] }), null);
  assert.equal(firstProvisional(null), null);
});

test("nextProvisional is the first date strictly after now", () => {
  const mt = { provisional_results_dates: [A, B, C] };
  assert.equal(nextProvisional(mt, ms(A) - 1), ms(A));
  assert.equal(nextProvisional(mt, ms(A) + 1), ms(B));
  assert.equal(nextProvisional(mt, ms(B)), ms(C), "a date equal to now is not next");
  assert.equal(nextProvisional(mt, ms(C)), null);
  assert.equal(nextProvisional(null, 0), null);
});

test("hasProvisional", () => {
  assert.equal(hasProvisional({ provisional_results_dates: [A] }), true);
  assert.equal(hasProvisional({ provisional_results_date: A }), true);
  assert.equal(hasProvisional({ provisional_results_dates: [] }), false);
  assert.equal(hasProvisional(null), false);
});
