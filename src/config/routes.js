export const PUBLIC_ROUTES = {
  DEFAULT: {
    title: "signIn",
    path: "/sign/in",
    enabled: "always",
  },
  SIGN_IN: {
    title: "signIn",
    path: "/sign/in",
    enabled: "always",
  },
  REGISTER: {
    title: "signUp",
    path: "/sign/up",
    enabled: "always",
  },
  FORGOT_PASSWORD: {
    title: "forgotPassword",
    path: "/sign/forgot-password",
    enabled: "always",
  },
  TERMS_CONDITIONS: {
    title: "termsConditions",
    path: "/terms-conditions",
    enabled: "always",
  },
};

export const privateRoot = "/mathtrade";

export const PRIVATE_ROUTES = {
  DEFAULT: {
    title: "home",
    path: privateRoot,
    enabled: "always",
  },
  HOME: {
    title: "home",
    path: privateRoot,
    enabled: "always",
  },
  MY_COLLECTION: {
    title: "myCollection",
    path: privateRoot + "/my-collection",
    enabled: "always",
  },
  MY_OFFER: {
    title: "myOffer",
    path: privateRoot + "/my-offer",
    enabled: "onlyForMembers",
  },
  OFFER: {
    title: "offerGames",
    path: privateRoot + "/offer",
    enabled: "onlyForMembers",
  },
  WANTS: {
    title: "wants",
    path: privateRoot + "/my-wants",
    enabled: "onlyForMembers",
  },
  RESULTS: {
    title: "results",
    path: privateRoot + "/results",
    enabled: "onlyForMembers",
  },
  STATS: {
    title: "statistics",
    path: privateRoot + "/statistics",
    enabled: "onlyForMembers",
  },
  REFERRALS_AREA: {
    title: "referrals-area",
    path: privateRoot + "/referrals-area",
    enabled: "onlyForMembers",
  },
  MY_DATA: {
    title: "myData",
    path: privateRoot + "/my-data",
    enabled: "always",
  },
  SIGN_TO_MATHTRADE: {
    title: "SignToMathTrade",
    path: privateRoot + "/my-data",
    enabled: "always",
  },

  MY_ACCOUNT: {
    title: "myAccount",
    path: privateRoot + "/my-account",
    enabled: "always",
  },
  REFERRAL: {
    title: "referral",
    path: privateRoot + "/referral",
    enabled: "always",
  },
  FAQS: {
    title: "faqs",
    path: privateRoot + "/faqs",
    enabled: "always",
  },
  MEMARDIUMS: {
    title: "memardiums",
    path: privateRoot + "/memardiums",
    enabled: "always",
  },
  CHAINS: {
    title: "chains",
    path: privateRoot + "/chains",
    enabled: "always",
  },
};
