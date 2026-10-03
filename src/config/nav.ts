import { PRIVATE_ROUTES } from "@/config/routes";

export type NavEntry = {
  key: keyof typeof PRIVATE_ROUTES;
  path: string;
  titleI18nKey: string;
  icon: string;
  /** Shown in the mobile bottom tab bar; otherwise only reachable via the "Más" sheet. */
  mobilePrimary?: boolean;
  /** Values interpolated into titleI18nKey's "$$$" placeholders, if any. */
  titleValues?: (string | number)[];
};

// Full route catalog; which subset is actually shown is decided by the consuming hook (useSidebarNav.ts).
export const PRIMARY_NAV: NavEntry[] = [
  {
    key: "MY_COLLECTION",
    path: PRIVATE_ROUTES.MY_COLLECTION.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.MY_COLLECTION.title}`,
    icon: "book",
    mobilePrimary: true,
  },
  {
    key: "FAVORITES",
    path: PRIVATE_ROUTES.FAVORITES.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.FAVORITES.title}`,
    icon: "star",
  },
  {
    key: "MY_OFFER",
    path: PRIVATE_ROUTES.MY_OFFER.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.MY_OFFER.title}`,
    icon: "offer",
  },
  {
    key: "OFFER",
    path: PRIVATE_ROUTES.OFFER.path,
    titleI18nKey: "menu.OfferGames", // real i18n key, verified against es_AR.json — not a typo despite the inconsistent casing
    icon: "collection",
    mobilePrimary: true,
  },
  {
    key: "WANTS",
    path: PRIVATE_ROUTES.WANTS.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.WANTS.title}`,
    icon: "heart",
    mobilePrimary: true,
  },
  {
    key: "PROVISIONAL_RESULTS",
    path: PRIVATE_ROUTES.PROVISIONAL_RESULTS.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.PROVISIONAL_RESULTS.title}`,
    icon: "status-box",
  },
  {
    key: "RESULTS",
    path: PRIVATE_ROUTES.RESULTS.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.RESULTS.title}`,
    icon: "status-box",
    mobilePrimary: true,
  },
  {
    key: "RESULTS_HISTORIAL",
    path: PRIVATE_ROUTES.RESULTS_HISTORIAL.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.RESULTS_HISTORIAL.title}`,
    icon: "calendar",
  },
  {
    key: "STATS",
    path: PRIVATE_ROUTES.STATS.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.STATS.title}`,
    icon: "stats",
  },
  {
    key: "MY_DATA",
    path: PRIVATE_ROUTES.MY_DATA.path,
    titleI18nKey: `menu.${PRIVATE_ROUTES.MY_DATA.title}`,
    icon: "user",
  },
];

// Desktop reaches home via the logo; on mobile it lives in the "Más" sheet.
export const HOME_ENTRY: NavEntry = {
  key: "HOME",
  path: PRIVATE_ROUTES.HOME.path,
  titleI18nKey: "menu.home",
  icon: "home",
};

// Added only when the user has no membership yet but can sign up (mirrors MenuListNotSignedToMathtrade).
export const SIGN_TO_MATHTRADE_ENTRY: NavEntry = {
  key: "SIGN_TO_MATHTRADE",
  path: PRIVATE_ROUTES.SIGN_TO_MATHTRADE.path,
  titleI18nKey: `menu.${PRIVATE_ROUTES.SIGN_TO_MATHTRADE.title}`,
  icon: "star",
};
