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
  align?: "start" | "center" | "end"; // default center
  when?: (canI: CanI) => boolean; // only in some stages
  // No element: a centered closing note (e.g. how to see it again).
  floating?: boolean;
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
  // Empty list: show an example card (src/tours/demo) while the tour runs.
  // `has` is what means "there's real content"; without it, the screen
  // `screen` renders its example (useTourDemo) and the tour points at it.
  demo?: { screen: string; has: string };
  steps: TourStep[];
};

// The first copy card someone else offers (only those have "+ Etiqueta").
const TAGGABLE_ITEM = '[data-tour-item]:has([data-tour-part="tag"])';

export const TOURS: Record<string, Tour> = {
  offer: {
    key: "offer.v1",
    demo: { screen: "offer", has: '[data-tour="offer.game"]' },
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
    demo: { screen: "my-offer", has: '[data-tour="myoffer.item"]' },
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
    // Rows paint lazily: their always-present container means "has wishes".
    demo: { screen: "my-wants", has: ".visual-section-want" },
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
  // Inicio: the menu (sidebar on desktop, bottom bar on mobile), stages and
  // locked sections. Steps of the other layout aren't on screen: skipped.
  home: {
    key: "home.v1",
    when: () => true,
    steps: [
      // First time: what this is, the video, and the rules to read.
      { anchor: "home.whatIs", id: "home.whatIs", side: "bottom" },
      { anchor: "home.video", id: "home.video", side: "left" },
      { anchor: "home.read", id: "home.read", side: "top" },
      { anchor: "home.stage", id: "home.stage", side: "right" },
      { anchor: "home.calendar", id: "home.calendar", side: "left" },
      {
        anchor: "home.nav.event",
        selector: 'aside [data-tour="home.nav.event"]',
        id: "home.event",
        side: "right",
      },
      // Locked: by stage, or (not signed up yet) because you aren't in.
      {
        anchor: "home.locked",
        selector: "aside [data-tour-locked]",
        id: "home.locked",
        side: "right",
        when: (canI) => !canI?.sign,
      },
      {
        anchor: "home.locked",
        selector: "aside [data-tour-locked]",
        id: "home.lockedSign",
        side: "right",
        when: (canI) => Boolean(canI?.sign),
      },
      {
        anchor: "home.nav.space",
        selector: 'aside [data-tour="home.nav.space"]',
        id: "home.space",
        side: "right",
      },
      { anchor: "home.help", id: "home.help", side: "right" },
      // Mobile.
      { anchor: "home.tabbar", id: "home.tabbar", side: "top" },
      {
        anchor: "home.lockedMobile",
        selector: '[data-tour="home.tabbar"] [aria-disabled="true"]',
        id: "home.lockedMobile",
        side: "top",
        when: (canI) => !canI?.sign,
      },
      {
        anchor: "home.lockedMobile",
        selector: '[data-tour="home.tabbar"] [aria-disabled="true"]',
        id: "home.lockedSign",
        side: "top",
        when: (canI) => Boolean(canI?.sign),
      },
      { anchor: "home.more", id: "home.more", side: "top", align: "end" },
      // What comes next, while sign-up is open and you're not in yet.
      {
        anchor: "home.signup",
        id: "home.signup",
        side: "bottom",
        when: (canI) => Boolean(canI?.sign),
      },
      { anchor: "", id: "home.end", floating: true },
    ],
  },
  // Inscripción (my-data without membership). If the edition has the
  // rules quiz, "signup" covers it; "signup-form" starts once it's passed
  // (or right away when there's no quiz).
  signup: {
    key: "signup.v1",
    when: (canI) => Boolean(canI?.sign),
    steps: [
      { anchor: "signup.quiz", id: "signup.quiz", side: "bottom" },
      { anchor: "signup.contribution", id: "signup.contribution", side: "bottom" },
    ],
  },
  "signup-form": {
    key: "signup-form.v1",
    when: (canI) => Boolean(canI?.sign),
    steps: [
      { anchor: "signup.contribution", id: "signup.contribution", side: "bottom" },
      { anchor: "signup.location", id: "signup.location", side: "bottom" },
      { anchor: "signup.attendance", id: "signup.attendance", side: "bottom" },
      { anchor: "signup.terms", id: "signup.terms", side: "top" },
      { anchor: "signup.submit", id: "signup.submit", side: "top" },
    ],
  },
  // Mi ludoteca: the games you own, kept across editions.
  "my-collection": {
    key: "my-collection.v1",
    when: () => true,
    demo: { screen: "my-collection", has: '[data-tour="mycollection.item"]' },
    steps: [
      { anchor: "mycollection.new", id: "mycollection.new", side: "bottom" },
      { anchor: "mycollection.item", id: "mycollection.item", side: "right" },
      {
        anchor: "mycollection.addToMT",
        selector: '.collection-grid [data-tour-part="addToMT"]',
        id: "mycollection.addToMT",
        side: "top",
        when: (canI) => Boolean(canI?.offer),
      },
      { anchor: "mycollection.search", id: "mycollection.search", side: "bottom" },
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
  // Resultados: what you receive and give, the views, other members.
  results: {
    key: "results.v1",
    when: (canI) => Boolean(canI?.results),
    waitFor: '[data-tour="results.row"]',
    steps: [
      { anchor: "results.row", id: "results.row", side: "bottom" },
      { anchor: "results.views", id: "results.views", side: "bottom", align: "end" },
      { anchor: "results.user", id: "results.user", side: "bottom" },
      { anchor: "results.wants", id: "results.wants", side: "top" },
    ],
  },
  // Ejemplares (avanzado): one copy per card, and tags.
  items: {
    key: "items.v1",
    demo: { screen: "items", has: TAGGABLE_ITEM },
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
