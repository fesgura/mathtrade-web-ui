// Run with: node --test src/utils/duplicateDisplay.test.ts
// Names come from the local MT 7 lists of the 4 heaviest members
// (thoughts/qrspi/2026-10-21-duplicate-want-warnings/validation/top4_duplicates.txt).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  decodeEntities,
  displayGroups,
  type DisplayGroup,
  type DisplayInputGroup,
} from "./duplicateDisplay.ts";

let nextId = 1;
const g = (type: string, name: string): DisplayInputGroup => ({
  id: nextId++,
  name,
  type,
});
// [type, name, count] per row, the shape the modal renders.
const rows = (list: DisplayGroup[]) =>
  list.map((r) => [r.type, r.name, r.count]);

test("decodeEntities: named, numeric and hex entities; unknown ones stay", () => {
  assert.equal(
    decodeEntities("Harpy &amp; She-Wolf &lt;b&gt; &quot;x&quot; &#39;y&apos;"),
    "Harpy & She-Wolf <b> \"x\" 'y'",
  );
  assert.equal(decodeEntities("Caf&#233; &#x2013; ok"), "Café – ok");
  assert.equal(
    decodeEntities("&amp;amp; &bogus; &#0; & alone"),
    "&amp; &bogus; &#0; & alone",
  );
  assert.equal(decodeEntities(null), "");
});

test("Cryptid: 13 identical item wants collapse to one counted row", () => {
  const groups = Array.from({ length: 13 }, () => g("item", "Cryptid (2018)"));
  assert.deepEqual(rows(displayGroups({ name: "Cryptid", groups })), [
    ["item", null, 13],
  ]);
});

test("Etherfields combo: title decoded and not repeated", () => {
  const title =
    "Etherfields: Stretch Goals – Harpy &amp; She-Wolf Campaigns (2022) + Etherfields (2020) + Munchkin 2: Unnatural Axe (2002)";
  const list = displayGroups({
    name: title,
    owner: "Marcelo Feijoo",
    groups: [g("game", "Etherfields"), g("item", title)],
  });
  assert.deepEqual(rows(list), [
    ["game", "Etherfields", 1],
    ["item", null, 1],
  ]);
  assert.ok(!decodeEntities(title).includes("&amp;"));
});

test("ezetalar3 Bad Company: game first, same title becomes the label, other title stays", () => {
  const list = displayGroups({
    name: "Bad Company",
    groups: [
      g("item", "Bad Company (2021)"),
      g("item", "Malas Compañías (2022)"),
      g("game", "Bad Company"),
    ],
  });
  assert.deepEqual(rows(list), [
    ["game", "Bad Company", 1],
    ["item", null, 1],
    ["item", "Malas Compañías (2022)", 1],
  ]);
});

test("ezetalar3 Tikal: editions of other years are the same title and collapse", () => {
  const list = displayGroups({
    name: "Tikal",
    groups: [
      g("item", "Tikal (2017)"),
      g("item", "Tikal (2016)"),
      g("item", "Tikal (1999)"),
      g("game", "Tikal"),
    ],
  });
  assert.deepEqual(rows(list), [
    ["game", "Tikal", 1],
    ["item", null, 3],
  ]);
});

test("m_claudio Alchemists: distinct editions stay apart, exact copies collapse", () => {
  const list = displayGroups({
    name: "Alchemists",
    groups: [
      g("item", "Alquimistas (2015)"),
      g("item", "Alquimistas (2014)"),
      g("item", "Alquimistas (2015)"),
      g("item", "Alquimistas (2014)"),
      g("item", "Alquimistas (2015)"),
    ],
  });
  assert.deepEqual(rows(list), [
    ["item", "Alquimistas (2015)", 3],
    ["item", "Alquimistas (2014)", 2],
  ]);
});

test("ezetalar3 Dice Forge combo: title repeated; tags keep their name and go before items", () => {
  const title = "Dice Forge (2017) + Dice Forge: Rebellion (2019)";
  const list = displayGroups({
    name: title,
    groups: [g("item", title), g("tag", "Dice Forge"), g("game", "Dice Forge")],
  });
  assert.deepEqual(rows(list), [
    ["game", "Dice Forge", 1],
    ["tag", "Dice Forge", 1],
    ["item", null, 1],
  ]);
});

test("game entry with a similar but different copy title keeps it", () => {
  const list = displayGroups({
    name: "Dice Forge",
    groups: [g("item", "Dice Forge (2017)"), g("item", "Dice Forge. (2017)")],
  });
  assert.deepEqual(rows(list), [
    ["item", null, 1],
    ["item", "Dice Forge. (2017)", 1],
  ]);
});
