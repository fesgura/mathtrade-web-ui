// Guided tutorials, one per screen (.claude/tasks/2026-09-30-guided-tutorial).
// key: "<screen>.v<n>". Bump the version when a tour's content changes so
// everyone sees it again once. Each step points at a data-tour anchor; a step
// whose anchor isn't on screen (mobile/desktop, stage) is skipped.

export type CanI = Record<string, boolean>;

export type TourStep = {
  anchor: string; // data-tour value (or a CSS selector, see `selector`)
  selector?: string; // e.g. a part inside the first card
  id: string; // i18n: tour.<id>.title / tour.<id>.text
  side?: "top" | "bottom" | "left" | "right";
  when?: (canI: CanI) => boolean; // only in some stages
};

export type Tour = {
  key: string;
  when: (canI: CanI) => boolean; // stages where it makes sense
  steps: TourStep[];
};

export const TOURS: Record<string, Tour> = {
  offer: {
    key: "offer.v1",
    when: (canI) => Boolean(canI?.offer || canI?.want),
    steps: [
      { anchor: "offer.tabs", id: "offer.tabs", side: "bottom" },
      { anchor: "offer.search", id: "offer.search", side: "bottom" },
      { anchor: "offer.filters", id: "offer.filters", side: "bottom" },
      { anchor: "offer.game", id: "offer.game", side: "right" },
      {
        anchor: "offer.ignore",
        selector: '[data-tour="offer.game"] [data-tour-part="ignore"]',
        id: "offer.ignore",
        side: "bottom",
      },
      {
        anchor: "offer.want",
        selector: '[data-tour="offer.game"] [data-tour-part="want"]',
        id: "offer.want",
        side: "top",
        when: (canI) => Boolean(canI?.want),
      },
      { anchor: "offer.new", id: "offer.new", side: "bottom" },
    ],
  },
};
