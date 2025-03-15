export const PUBLIC_ROUTES = {
  DEFAULT: {
    title: "signIn",
    path: "/sign/in",
  },
  SIGN_IN: {
    title: "signIn",
    path: "/sign/in",
  },
  REGISTER: {
    title: "signUp",
    path: "/sign/up",
  },
  FORGOT_PASSWORD: {
    title: "forgotPassword",
    path: "/sign/forgot-password",
  },
  TERMS_CONDITIONS: {
    title: "termsConditions",
    path: "/terms-conditions",
  },
};

export const privateRoot = "/mathtrade";

export const PRIVATE_ROUTES = {
  DEFAULT: {
    title: "home",
    path: privateRoot + "/",
  },
  HOME: {
    title: "home",
    path: privateRoot + "/",
  },
  // SIGN_IN_MATHTRADE: {
  //   title: "signInMathtrade",
  //   path: "/sign-in-mathtrade",
  // },
  MY_OFFER: {
    title: "myOffer",
    path: privateRoot + "/my-offer",
  },
  MY_OFFER_PREVIOUS_MATHTRADES: {
    title: "myOfferPreviousMathtrades",
    path: privateRoot + "/my-offer/previous-mathtrades",
  },
  /* GAMES: {
    title: "games",
    path: privateRoot + "/games",
  },
  ITEMS: {
    title: "items",
    path: privateRoot + "/items",
  }, */
  OFFER: {
    title: "offerGames",
    path: privateRoot + "/offer",
  },
  WANTS: {
    title: "wants",
    path: privateRoot + "/my-wants",
  },
  RESULTS: {
    title: "results",
    path: privateRoot + "/results",
  },
  STATS: {
    title: "statistics",
    path: privateRoot + "/statistics",
  },
  MY_DATA: {
    title: "myData",
    path: privateRoot + "/my-data",
  },
  SIGN_TO_MATHTRADE: {
    title: "SignToMathTrade",
    path: privateRoot + "/my-data",
  },
  MY_COLLECTION: {
    title: "myCollection",
    path: privateRoot + "/my-collection",
  },
  MY_ACCOUNT: {
    title: "myAccount",
    path: privateRoot + "/my-account",
  },
  REFERRAL: {
    title: "referral",
    path: privateRoot + "/referral",
  },
  FAQS: {
    title: "faqs",
    path: privateRoot + "/faqs",
  },
};
