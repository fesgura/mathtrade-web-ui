import { PRIVATE_ROUTES } from "@/config/routes";

const MenuListMyCollection = [
  {
    title: `menu.${PRIVATE_ROUTES.MY_COLLECTION.title}`,
    path: PRIVATE_ROUTES.MY_COLLECTION.path,
    name: "myCollection",
    special: true,
  },
];

export const MenuListDefault = [
  ...MenuListMyCollection,
  {
    title: `menu.${PRIVATE_ROUTES.STATS.title}`,
    path: PRIVATE_ROUTES.STATS.path,
    name: "stats",
    // disabled: true,
  },
];

export const MenuList = [
  ...MenuListMyCollection,
  {
    title: `menu.${PRIVATE_ROUTES.MY_OFFER.title}`,
    path: PRIVATE_ROUTES.MY_OFFER.path,
    name: "myOffer",
    //  disabled: true,
  },
  {
    title: `menu.OfferGames`,
    path: PRIVATE_ROUTES.OFFER.path,
    name: "offer",
  },
  {
    title: `menu.${PRIVATE_ROUTES.WANTS.title}`,
    path: PRIVATE_ROUTES.WANTS.path,
    name: "myWants",
    //disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.RESULTS.title}`,
    path: PRIVATE_ROUTES.RESULTS.path,
    name: "results",
    //  disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.STATS.title}`,
    path: PRIVATE_ROUTES.STATS.path,
    name: "stats",
    // disabled: true,
  },
  {
    title: `menu.${PRIVATE_ROUTES.MY_DATA.title}`,
    path: PRIVATE_ROUTES.MY_DATA.path,
    name: "myData",
    //  disabled: true,
  },
];

export const MenuListNotSignedToMathtrade = [
  ...MenuListDefault,
  {
    title: `menu.${PRIVATE_ROUTES.SIGN_TO_MATHTRADE.title}`,
    path: PRIVATE_ROUTES.SIGN_TO_MATHTRADE.path,
    icon: "star",
    name: "myData",
  },
];
