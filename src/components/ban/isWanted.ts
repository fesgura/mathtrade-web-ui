// Ignoring something you want doesn't delete the want, but the export skips
// it: callers warn before ignoring a wanted target (single and bulk ignore).

type WantLike = {
  type?: string;
  bgg_id?: number | string | null;
  wants?: { id?: number | string }[];
};

type GameLike = {
  bgg_id?: number | string | null;
  items?: { id?: number | string }[];
};

// A game is wanted when a game-want targets it, or any want lists one of
// its copies.
export const isWantedGame = (
  game: GameLike | null | undefined,
  myWants: WantLike[] | null | undefined
): boolean => {
  if (!game) return false;
  const copyIds = new Set((game.items || []).map(({ id }) => `${id}`));
  return (myWants || []).some(
    (w) =>
      (w.type === "game" &&
        game.bgg_id &&
        `${w.bgg_id}` === `${game.bgg_id}`) ||
      (w.wants || []).some(({ id }) => copyIds.has(`${id}`))
  );
};

type ItemLike = {
  id?: number | string | null;
  owner?: boolean | null;
};

// A copy is wanted when any want (item, game or tag) lists it: the union of
// ItemContext's wantGroup / otherWantGroups / wantedViaTag (a tag want counts
// only once the copy is in its `wants`, so it's already in that union). Like
// ItemContext, own copies are never "wanted".
export const isWantedItem = (
  item: ItemLike | null | undefined,
  myWants: WantLike[] | null | undefined
): boolean => {
  if (!item || item.id == null || item.owner) return false;
  const id = `${item.id}`;
  return (myWants || []).some((w) =>
    (w.wants || []).some((itm) => `${itm.id}` === id)
  );
};
