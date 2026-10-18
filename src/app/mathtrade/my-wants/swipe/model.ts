import type { CSSProperties } from "react";
import { colorTagStyles } from "@/utils/color";
import { visibleWants } from "@/utils/visibleWants";
import {
  changedWantsFirst,
  getRightValue,
  isEmptyWantGroup,
  tagCounter,
} from "@/components/want-components/utils";
import {
  resolveItemKind,
  resolveWantGroupKind,
  type CardKind,
} from "@/components/badgeType/cardKind";

export type Direction = "item" | "want";

export type Face = {
  id: number;
  title: string;
  thumbnail: string;
  kind: CardKind;
  badgeType: "game" | "item" | "tag";
  badgeSubtype: number;
  isCombo: boolean;
  value: number | string | null;
  tagStyle: CSSProperties | null;
  empty: boolean;
  changed: boolean;
};

export type DeckCard = {
  pairKey: string;
  face: Face;
  wasYes: boolean;
};

const TYPE_ORDER: Record<string, number> = { game: 0, tag: 1, item: 2 };

export const pairKey = (wantId: number, itemId: number) =>
  `${wantId}_${itemId}`;

const wantThumbnail = (wantGroup: any): string => {
  const { type, wants, availables, bgg_id } = wantGroup || {};
  const copies = (wants || []).concat(availables || []);
  if (type === "item" || type === "tag") {
    return copies?.[0]?.elements?.[0]?.element?.thumbnail || "";
  }
  const games = copies
    .reduce((arr: any[], copy: any) => arr.concat(copy?.elements || []), [])
    .map((entry: any) => entry?.element?.game)
    .filter(Boolean);
  if (bgg_id) {
    return (
      games.find((game: any) => `${game?.bgg_id}` === `${bgg_id}`)?.thumbnail ||
      games[0]?.thumbnail ||
      ""
    );
  }
  return games[0]?.thumbnail || "";
};

export const wantFace = (wantGroup: any, changed = false): Face => {
  const type = wantGroup?.type;
  const isCombo =
    type === "item" && (wantGroup?.wants?.[0]?.elements?.length || 0) > 1;
  const badgeSubtype =
    type === "game"
      ? wantGroup?.game_type || 1
      : wantGroup?.wants?.[0]?.elements?.[0]?.element?.game?.type || 1;
  const name = wantGroup?.name || "";
  return {
    id: Number(wantGroup?.id),
    title: type === "tag" ? `${name} (${tagCounter(wantGroup)})` : name,
    thumbnail: wantThumbnail(wantGroup),
    kind: resolveWantGroupKind(wantGroup),
    badgeType: type === "tag" || type === "item" || type === "game" ? type : "game",
    badgeSubtype,
    isCombo,
    value: wantGroup?.value ?? null,
    tagStyle: type === "tag" ? colorTagStyles(wantGroup?.tag?.color) : null,
    empty: isEmptyWantGroup(wantGroup),
    changed,
  };
};

export const itemFace = (item: any): Face => ({
  id: Number(item?.id),
  title: item?.title || "",
  thumbnail: item?.elements?.[0]?.element?.thumbnail || "",
  kind: resolveItemKind(item),
  badgeType: "item",
  badgeSubtype: item?.elements?.[0]?.element?.game?.type || 1,
  isCombo: !!(item?.isCombo || (item?.elements?.length || 0) > 1),
  value: item?.value ?? null,
  tagStyle: null,
  empty: false,
  changed: false,
});

const byName = (dir: number, a: string, b: string) =>
  a < b ? -1 * dir : 1 * dir;

const sortNamed = (
  list: any[],
  orderRaw: string,
  nameOf: (row: any) => string,
  valueOf: (row: any) => number,
  countOf: (row: any) => number,
  typeOf?: (row: any) => string
) => {
  const dir = orderRaw.indexOf("-") >= 0 ? -1 : 1;
  const order = orderRaw.replace("-", "");
  return [...list].sort((a, b) => {
    if (order === "name") return byName(dir, nameOf(a), nameOf(b));
    if (order === "value" || order === "most_wanted") {
      const av = order === "value" ? valueOf(a) : countOf(a);
      const bv = order === "value" ? valueOf(b) : countOf(b);
      if (av === bv) return byName(1, nameOf(a), nameOf(b));
      return av < bv ? -1 * dir : 1 * dir;
    }
    if (typeOf) {
      const at = TYPE_ORDER[typeOf(a)] ?? 9;
      const bt = TYPE_ORDER[typeOf(b)] ?? 9;
      if (at === bt) return byName(dir, nameOf(a), nameOf(b));
      return at < bt ? -1 * dir : 1 * dir;
    }
    return byName(1, nameOf(a), nameOf(b));
  });
};

export const orderedWants = (
  myWants: any[],
  orderRaw: string,
  changedIds: Set<number>
): any[] => {
  const sorted = sortNamed(
    visibleWants(myWants),
    orderRaw,
    (want) => want?.name || "",
    (want) => (want?.value == null ? 0 : parseFloat(want.value)),
    (want) => want?.items?.length || 0,
    (want) => want?.type || ""
  );
  return changedWantsFirst(sorted, changedIds);
};

export const orderedItems = (items: any[], wants: any[], orderRaw: string): any[] => {
  const offeredCount: Record<string, number> = {};
  if (orderRaw.replace("-", "") === "most_wanted") {
    wants.forEach((want) => {
      (want?.items || []).forEach((itemId: number) => {
        offeredCount[itemId] = (offeredCount[itemId] || 0) + 1;
      });
    });
  }
  return sortNamed(
    items || [],
    orderRaw,
    (item) => item?.title || "",
    (item) => (item?.value == null ? 0 : parseFloat(item.value)),
    (item) => offeredCount[item?.id] || 0
  );
};

type DeckArgs = {
  direction: Direction;
  anchorId: number;
  wants: any[];
  items: any[];
  matchValues: Record<string, boolean>;
  changes: Record<string, boolean>;
  onlyMissing: boolean;
  changedIds: Set<number>;
};

export const buildDeck = ({
  direction,
  anchorId,
  wants,
  items,
  matchValues,
  changes,
  onlyMissing,
  changedIds,
}: DeckArgs): DeckCard[] => {
  const cardFor = (wantId: number, itemId: number, face: Face): DeckCard => {
    const key = pairKey(wantId, itemId);
    return {
      pairKey: key,
      face,
      wasYes: Boolean(getRightValue(matchValues, changes, key)),
    };
  };

  if (direction === "want") {
    const want = wants.find((row) => Number(row?.id) === anchorId);
    if (!want || isEmptyWantGroup(want)) return [];
    return items
      .map((item) => cardFor(want.id, item.id, itemFace(item)))
      .filter((card) => !onlyMissing || !card.wasYes);
  }

  const item = items.find((row) => Number(row?.id) === anchorId);
  if (!item) return [];
  return wants
    .filter((want) => !isEmptyWantGroup(want))
    .map((want) =>
      cardFor(
        want.id,
        item.id,
        wantFace(want, changedIds.has(Number(want.id)))
      )
    )
    .filter((card) => !onlyMissing || !card.wasYes);
};

export const countYes = (
  cards: { pairKey: string }[],
  matchValues: Record<string, boolean>,
  changes: Record<string, boolean>
) =>
  cards.filter((card) =>
    Boolean(getRightValue(matchValues, changes, card.pairKey))
  ).length;
