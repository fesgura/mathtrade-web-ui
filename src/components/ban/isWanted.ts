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
