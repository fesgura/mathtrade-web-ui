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
  align?: "start" | "center" | "end"; // default start
  when?: (canI: CanI) => boolean; // only in some stages
  // If the element isn't on screen, this one instead (with its own text,
  // tour.<fallback.id>), e.g. the Filtros button when the panel is closed.
  fallback?: { anchor: string; id: string };
};

export type Tour = {
  key: string;
  when: (canI: CanI) => boolean; // stages where it makes sense
  // Auto-start waits (a few seconds at most) for this element: lists that
  // paint their rows only once they're on screen.
  waitFor?: string;
  steps: TourStep[];
};

// The first copy card someone else offers (only those have "+ Etiqueta").
const TAGGABLE_ITEM = '[data-tour-item]:has([data-tour-part="tag"])';

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
  // Yo ofrezco: loading your copies.
  "my-offer": {
    key: "my-offer.v1",
    when: (canI) => Boolean(canI?.offer || canI?.want),
    steps: [
      { anchor: "myoffer.new", id: "myoffer.new", side: "bottom" },
      { anchor: "myoffer.previous", id: "myoffer.previous", side: "left" },
      { anchor: "myoffer.item", id: "myoffer.item", side: "top" },
      { anchor: "myoffer.ready", id: "myoffer.ready", side: "bottom" },
      {
        anchor: "myoffer.value",
        selector: '[data-tour="myoffer.item"] [data-tour-part="value"]',
        id: "myoffer.value",
        side: "bottom",
      },
      {
        anchor: "myoffer.group",
        selector: '[data-tour="myoffer.item"] [data-tour-part="group"]',
        id: "myoffer.group",
        side: "bottom",
      },
      {
        anchor: "myoffer.groups",
        id: "myoffer.groups",
        side: "right",
        fallback: { anchor: "myoffer.groupsBtn", id: "myoffer.groups" },
      },
      {
        anchor: "myoffer.withdraw",
        selector: '[data-tour="myoffer.item"] [data-tour-part="withdraw"]',
        id: "myoffer.withdraw",
        side: "left",
      },
    ],
  },
  // Mis deseos (Visual, Recibo -> Ofrezco): building the possible trades.
  "my-wants": {
    key: "my-wants.v1",
    when: (canI) => Boolean(canI?.want),
    waitFor: "[data-tour-row]",
    steps: [
      { anchor: "mywants.row", selector: "[data-tour-row]", id: "mywants.row", side: "top" },
      {
        anchor: "mywants.want",
        selector: '[data-tour-row] [data-tour-part="want"]',
        id: "mywants.want",
        side: "right",
      },
      {
        anchor: "mywants.offer",
        selector: '[data-tour-row] [data-tour-part="offer"]',
        id: "mywants.offer",
        side: "bottom",
      },
      {
        anchor: "mywants.direction",
        id: "mywants.direction",
        side: "bottom",
        align: "center",
      },
      { anchor: "mywants.tabs", id: "mywants.tabs", side: "bottom" },
      { anchor: "mywants.autocomplete", id: "mywants.autocomplete", side: "top" },
      { anchor: "mywants.save", id: "mywants.save", side: "top" },
    ],
  },
  // Resultados provisorios: what the runs mean, and self-exclusion.
  provisional: {
    key: "provisional.v1",
    when: (canI) => Boolean(canI?.provisionalResults),
    steps: [
      { anchor: "provisional.intro", id: "provisional.intro", side: "bottom" },
      { anchor: "provisional.card", id: "provisional.card", side: "right" },
      {
        anchor: "provisional.times",
        selector: '[data-tour="provisional.card"] [data-tour-part="times"]',
        id: "provisional.times",
        side: "bottom",
      },
      {
        anchor: "provisional.exclude",
        id: "provisional.exclude",
        side: "top",
        when: (canI) => Boolean(canI?.selfExclude),
      },
    ],
  },
  // Ejemplares (avanzado): one copy per card, and tags.
  items: {
    key: "items.v1",
    when: (canI) => Boolean(canI?.offer || canI?.want),
    steps: [
      { anchor: "items.card", selector: TAGGABLE_ITEM, id: "items.card", side: "right" },
      {
        anchor: "items.tag",
        selector: `${TAGGABLE_ITEM} [data-tour-part="tag"]`,
        id: "items.tag",
        side: "bottom",
      },
      {
        anchor: "items.tagWhy",
        selector: `${TAGGABLE_ITEM} [data-tour-part="tag"]`,
        id: "items.tagWhy",
        side: "bottom",
      },
      {
        anchor: "items.tagFilter",
        id: "items.tagFilter",
        side: "right",
        fallback: { anchor: "items.filters", id: "items.tagFilterClosed" },
      },
    ],
  },
};
