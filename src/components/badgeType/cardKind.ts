export type CardKind = "base" | "expansion" | "combo" | "other";

export const resolveCardKind = ({
  isCombo,
  isTrueNotGame,
  isExpansion,
}: {
  isCombo: boolean;
  isTrueNotGame: boolean;
  isExpansion: boolean;
}): CardKind => {
  if (isCombo) return "combo";
  if (isTrueNotGame) return "other";
  if (isExpansion) return "expansion";
  return "base";
};

// Game catalog cards never use "combo". The backend buckets a bundled
// item (several games as one offer) as a no-BGG-match placeholder; in
// the Juegos grid that still means "fuera de la BGG". Combo is reserved
// for ejemplar cards, where the bundle is the unit being offered.
export const resolveGameKind = ({
  notGame = false,
  typeNum = 1,
}: {
  notGame?: boolean;
  typeNum?: number;
}): CardKind =>
  resolveCardKind({
    isCombo: false,
    isTrueNotGame: !!notGame,
    isExpansion: !notGame && typeNum === 2,
  });

// Left-border accent + a background tint of the same color, one pair per
// content category. 8% into white was too faint once built — a page of
// cards only differed by a 4px edge. Expansion used to be amber (#B45309),
// which sat next to danger (#d9512f) and read as an alert, not a category.
// The four hues are now charcoal / blue / violet / teal so none of them
// share a family with a status color.
//
// The tint is a pre-mixed SOLID color, not a Tailwind alpha utility
// (bg-gameExpansion/20) — these cards sit on the page's off-white/gray
// background, not pure white, so a translucent tint blends with whatever
// is actually behind it and comes out muddier/grayer than intended. Each
// value below is the real result of mixing the category's token at 20%
// into #ffffff, computed once so it renders identically regardless of
// what's behind the card:
//   base       #1C1F26 @ 20% -> #d2d2d4
//   expansion  #1d4ed8 @ 20% -> #d2dcf7
//   combo      #5B21B6 @ 20% -> #ded3f0
//   other      #0f766e @ 20% -> #cfe4e2
const CARD_KIND_TINT: Record<CardKind, string> = {
  base: "border-l-gameBase bg-[#d2d2d4]",
  expansion: "border-l-gameExpansion bg-[#d2dcf7]",
  combo: "border-l-gameCombo bg-[#ded3f0]",
  other: "border-l-gameOther bg-[#cfe4e2]",
};

export const cardKindBorderClass = (kind: CardKind, edge: 4 | 6 = 6) =>
  `${edge === 4 ? "border-l-[4px]" : "border-l-[6px]"} ${CARD_KIND_TINT[kind]}`;

/* Bounds every card chrome: content wraps/clips inside the white card box,
 * not the page/viewport. Apply on the element that paints the card surface
 * (wrapper, offer-grid shell, my-offer article, previewer shell, …). */
export const cardSurfaceClass =
  "min-w-0 max-w-full w-full overflow-x-hidden";

type WantGroupLike = {
  type?: string;
  game_type?: number;
  wants?: { elements?: { element?: { game?: { type?: number } } }[] }[];
};

export const resolveWantGroupKind = (wantGroup: WantGroupLike): CardKind => {
  const type = wantGroup?.type;
  const isCombo =
    type === "item" && (wantGroup?.wants?.[0]?.elements?.length || 0) > 1;
  const typeNum =
    type === "game"
      ? wantGroup?.game_type || 1
      : wantGroup?.wants?.[0]?.elements?.[0]?.element?.game?.type || 1;
  return resolveCardKind({
    isCombo,
    isTrueNotGame: type === "tag" || (!isCombo && typeNum === 3),
    isExpansion: !isCombo && typeNum === 2,
  });
};

type ItemLike = {
  isCombo?: boolean;
  elements?: { element?: { game?: { type?: number } } }[];
};

export const resolveItemKind = (item: ItemLike): CardKind => {
  const isCombo = !!(item?.isCombo || (item?.elements?.length || 0) > 1);
  const typeNum = item?.elements?.[0]?.element?.game?.type || 1;
  return resolveCardKind({
    isCombo,
    isTrueNotGame: !isCombo && typeNum === 3,
    isExpansion: !isCombo && typeNum === 2,
  });
};
