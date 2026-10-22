// Ignoring something you want removes it from your wants (BE, since
// 2026-10-21) and un-ignoring doesn't restore it: callers warn before
// ignoring a wanted target (single and bulk ignore).

type WantLike = {
  type?: string;
  bgg_id?: number | string | null;
  wants?: { id?: number | string }[];
};

type CopyLike = {
  id?: number | string;
  elements?: {
    element?: { game?: { bgg_id?: number | string | null } | null } | null;
    game_id?: number | string | null;
  }[];
};

type GameLike = {
  bgg_id?: number | string | null;
  items?: CopyLike[];
};

// A combo stays wanted until every game in it is ignored. A copy counts
// here only when ignoring this game would actually drop it: the copy is
// this game alone. A combo wanted because of another game must not open
// the "nothing you want will count" warning.
const copyCountsForGame = (item: CopyLike, bggId: number | string) => {
  const ids = (item.elements || [])
    .map((el) => el?.element?.game?.bgg_id ?? el?.game_id)
    .filter((id) => id != null && `${id}` !== "");
  if (!ids.length) return true;
  return ids.every((id) => `${id}` === `${bggId}`);
};

// A game is wanted when a game-want targets it, or any want lists one of
// its copies (not a combo that also contains other games).
export const isWantedGame = (
  game: GameLike | null | undefined,
  myWants: WantLike[] | null | undefined
): boolean => {
  if (!game) return false;
  const copyIds = new Set(
    (game.items || [])
      .filter((item) => !game.bgg_id || copyCountsForGame(item, game.bgg_id))
      .map(({ id }) => `${id}`)
  );
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
