export const JOKE_GAME_NAME = "Eso no es un sombrero";
export const JOKE_GAME_PIC_URL = "TBD";
// 12:45 Argentina time (UTC−3), 27 Oct 2026.
export const JOKE_GAME_ENDS = new Date("2026-10-27T12:50:00-03:00");

// Until JOKE_GAME_ENDS, show the gag instead of the received game.
export function maskReceivedItem(item) {
  if (!item || Date.now() >= JOKE_GAME_ENDS.getTime()) return item;

  return {
    ...item,
    title: JOKE_GAME_NAME,
    elements: item.elements?.map((row) =>
      row?.element
        ? {
            ...row,
            element: {
              ...row.element,
              name: JOKE_GAME_NAME,
              thumbnail: JOKE_GAME_PIC_URL,
              // Otherwise the received card appends " (year)" to the gag name.
              year: "",
              game: row.element.game
                ? { ...row.element.game, year: "" }
                : row.element.game,
            },
          }
        : row
    ),
  };
}
