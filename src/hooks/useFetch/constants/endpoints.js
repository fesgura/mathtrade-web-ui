const endpoints = {
  // User
  LOGIN: "api/auth-token/",
  POST_USER: "api/users/register/",
  PUT_PASSWORD: "api/users/change-password/",
  FORGOT_PASSWORD: "api/users/recovery-password/",
  GET_USERS: "api/users/",
  GET_USER: "api/users/",
  POST_TOUR_SEEN: "api/users/tours/$[1]/",
  PUT_USER: "api/users/",
  GET_REFERRALS: "api/users/referral/",
  POST_REFERRAL: "api/users/referral/",

  // Location
  GET_LOCATIONS: "api/locations/",

  // COLLECTION (OLD)
  GET_MYCOLLECTION_ITEMS: "api/items/",
  EDIT_MYCOLLECTION_ITEM: "api/items/$[1]/",
  DELETE_MYCOLLECTION_ITEM: "api/items/$[1]/",

  // COLLECTION (NEW)
  GET_MYCOLLECTION_ELEMENTS: "api/elements/",
  POST_MYCOLLECTION_ELEMENTS: "api/elements/",
  PUT_MYCOLLECTION_ELEMENT: "api/elements/$[1]/",
  DELETE_MYCOLLECTION_ELEMENT: "api/elements/$[1]/",

  // MYITEMS
  GET_MYITEMS: "api/mathtrades/$[mathtradeId]/user-items/",
  POST_MYITEM: "api/mathtrades/$[mathtradeId]/user-elements/",
  PUT_MYITEM: "api/mathtrades/$[mathtradeId]/user-elements/$[1]/",
  DELETE_MYITEM_ELEMENT: "api/mathtrades/$[mathtradeId]/user-elements/$[1]/",
  DELETE_MYITEM: "api/mathtrades/$[mathtradeId]/user-items/$[1]/",

  // ITEMS PREVIOUS MT
  GET_RECEIVED_COPIES: "api/mathtrades/$[mathtradeId]/received-copies/",
  GET_MYITEMS_PREVIOUSMT: "api/mathtrades/$[mathtradeId]/user-items/",
  POST_ITEM_PREVIOUSMT: "api/mathtrades/$[mathtradeId]/user-item-copy/",

  GET_MYITEM_GROUPS: "api/mathtrades/$[mathtradeId]/user-item-groups/",
  POST_MYITEM_GROUPS: "api/mathtrades/$[mathtradeId]/user-item-groups/",
  PUT_MYITEM_GROUPS: "api/mathtrades/$[mathtradeId]/user-item-groups/$[1]/",
  DELETE_MYITEM_GROUPS: "api/mathtrades/$[mathtradeId]/user-item-groups/$[1]/",
  PUBLISH_ITEM: "api/mathtrades/$[mathtradeId]/items/",
  UNPUBLISH_ITEM: "api/mathtrades/$[mathtradeId]/items/$[1]/",

  // ITEMS
  GET_ITEMS_LIST: "api/mathtrades/$[mathtradeId]/items/",
  GET_ITEM: "api/mathtrades/$[mathtradeId]/items/$[1]/",
  GET_ITEM_FROM_HISTORIAL: "api/mathtrades/$[1]/items/$[2]/",

  POST_VALUE_ITEMS: "api/mathtrades/$[mathtradeId]/item-values/",

  // FILTERS
  GET_FILTER_ITEMS: "api/mathtrades/$[mathtradeId]/item-filters/",
  GET_FILTER_GAMES: "api/mathtrades/$[mathtradeId]/game-filters/",

  // Element
  PUT_ELEMENT: "api/elements/$[1]/",
  POST_ELEMENT: "api/elements/",
  DELETE_ELEMENT: "api/elements/$[1]/",

  // MATHTRADE: MYTAGS
  MYTAGS: "api/mathtrades/$[mathtradeId]/user-tags/",
  GET_MYTAG: "api/mathtrades/$[mathtradeId]/user-tags/$[1]/",
  POST_MYTAGS: "api/mathtrades/$[mathtradeId]/user-tags/",
  PUT_MYTAGS: "api/mathtrades/$[mathtradeId]/user-tags/$[1]/",
  DELETE_MYTAGS: "api/mathtrades/$[mathtradeId]/user-tags/$[1]/",
  POST_TAG_CONSOLIDATE: "api/mathtrades/$[mathtradeId]/user-tags/$[1]/consolidate/",
  POST_TAG_UNCONSOLIDATE: "api/mathtrades/$[mathtradeId]/user-tags/$[1]/unconsolidate/",
  COMMIT_CHANGES: "api/mathtrades/$[mathtradeId]/user-commit/",

  // GAMES
  GET_GAMES_LIST: "api/mathtrades/$[mathtradeId]/games/",
  GET_GAME: "api/mathtrades/$[mathtradeId]/games/$[1]/",

  // WANTS
  MYWANTS: "api/mathtrades/$[mathtradeId]/user-want-groups/",
  GET_WANT: "api/mathtrades/$[mathtradeId]/user-want-groups/$[1]/",
  POST_MYWANTS: "api/mathtrades/$[mathtradeId]/user-want-groups/",
  PUT_MYWANTS: "api/mathtrades/$[mathtradeId]/user-want-groups/$[1]/",
  PUT_MYWANTS_BATCH: "api/mathtrades/$[mathtradeId]/user-want-groups-list/",
  DELETE_MYWANTS: "api/mathtrades/$[mathtradeId]/user-want-groups/$[1]/",

  // NOTIFICATIONS
  GET_NOTIFICATIONS: "api/notifications/",
  PUT_NOTIFICATION: "api/notifications/$[1]/",
  POST_NOTIFICATIONS_BULK: "api/notifications-bulk/",

  // MATHTRADE
  GET_MATHTRADES: "api/mathtrades/",
  GET_MATHTRADE: "api/mathtrades/$[mathtradeId]/",
  GET_CURRENT_MATHTRADE: "api/mathtrades/current/",
  GET_MATHTRADE_USER: "api/mathtrades/$[mathtradeId]/users/$[1]/",
  GET_MATHTRADE_USERS: "api/mathtrades/$[mathtradeId]/users/",

  // MATHTRADE: MYDATA
  SINGIN_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/",
  EDIT_MYDATA_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/$[1]/",
  GET_MYDATA_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/$[1]/",
  POST_CONTRIBUTION: "api/mathtrades/$[mathtradeId]/contributions/",
  GET_CONTRIBUTIONS: "api/mathtrades/$[1]/contributions/",
  GET_CONTRIBUTION_RECEIPT: "api/mathtrades/$[1]/contributions/$[2]/receipt/",
  POST_CONTRIBUTION_APPROVE: "api/mathtrades/$[1]/contributions/$[2]/approve/",
  POST_CONTRIBUTION_REJECT: "api/mathtrades/$[1]/contributions/$[2]/reject/",
  GET_RULES_QUESTIONS: "api/rules-questions/",
  POST_RULES_QUESTION: "api/rules-questions/",
  PUT_RULES_QUESTION: "api/rules-questions/$[1]/",
  GET_RULES_QUIZ: "api/mathtrades/$[mathtradeId]/rules-quiz/",
  POST_RULES_QUIZ_START: "api/mathtrades/$[mathtradeId]/rules-quiz/start/",
  POST_RULES_QUIZ_SUBMIT: "api/mathtrades/$[mathtradeId]/rules-quiz/submit/",
  SIGNOUT_MYDATA_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/$[1]/",

  GET_MATHTRADE_STATS: "api/mathtrades/$[mathtradeId]/stats/",

  // MATHTRADE: ADMIN PANEL
  PATCH_MATHTRADE_ADMIN: "api/mathtrades/$[1]/",
  POST_MATHTRADE_ADMIN: "api/mathtrades/",
  POST_MATHTRADE_RULEBOOK: "api/mathtrades/$[1]/rulebook/",
  GET_CONTRIBUTION_ACCOUNTS: "api/mathtrades/$[1]/contribution-accounts/",
  POST_CONTRIBUTION_ACCOUNT: "api/mathtrades/$[1]/contribution-accounts/",
  PUT_CONTRIBUTION_ACCOUNT: "api/mathtrades/$[1]/contribution-accounts/$[2]/",
  DELETE_CONTRIBUTION_ACCOUNT: "api/mathtrades/$[1]/contribution-accounts/$[2]/",

  // FAVORITES (games, per user, across editions)
  GET_FAVORITES: "api/favorites/games/",
  POST_FAVORITE: "api/favorites/games/",
  DELETE_FAVORITE: "api/favorites/games/$[1]/",
  IMPORT_FAVORITES_BGG: "api/favorites/games/import-bgg/",
  // BAN
  GET_BANS: "api/bans/users/",
  POST_BAN: "api/bans/",
  DELETE_BAN_USER: "api/bans/users/$[1]/",
  DELETE_BAN_ITEM: "api/bans/items/$[1]/",
  DELETE_BAN_GAME: "api/bans/games/$[1]/",
  DELETE_BANNED_GAMES_ALL: "api/bans/games/all/",
  DELETE_BANNED_ITEMS_ALL: "api/bans/items/all/",

  AUTOCOMPLETE_WANTS: "api/mathtrades/$[mathtradeId]/user-want-groups-match/",
  GET_MT_RESULTS: "api/mathtrades/$[mathtradeId]/results/",
  GET_MT_RESULTS_HISTORIAL: "api/mathtrades/$[1]/results/",
  GET_PROVISIONAL_RESULTS: "api/mathtrades/$[mathtradeId]/provisional-results/",
  GET_SELF_EXCLUDED: "api/mathtrades/$[mathtradeId]/self-excluded/",
  POST_SELF_EXCLUDE: "api/mathtrades/$[mathtradeId]/self-exclude/",

  // IMAGES
  POST_IMAGE: "api/users/images/",

  // BUG REPORTS
  POST_BUG_REPORT: "api/bug-reports/",

  // MEMARDIUMS
  MEMARDIUMS: "api/news/",

  // COMMENTS
  GET_COMMENTS: "api/mathtrades/$[mathtradeId]/items/$[1]/comments/",
  POST_COMMENT: "api/mathtrades/$[mathtradeId]/items/$[1]/comments/",
  PUT_COMMENT: "api/mathtrades/$[mathtradeId]/items/$[1]/comments/$[2]/",
  DELETE_COMMENT: "api/mathtrades/$[mathtradeId]/items/$[1]/comments/$[2]/",

  // POST MT
  POST_MT: "api/mathtrades/$[mathtradeId]/post-items/",

  GET_PRICES: "api/mathtrades/$[mathtradeId]/prices/",
  POST_IMG_PRICES: "api/mathtrades/$[mathtradeId]/prices/",

  // FAQS
  GET_FAQS: "api/faqs/",

  // REPORT
  POST_REPORT: "api/reports/",
  ADMIN_GET_REPORTS: "api/reports/",
  ADMIN_RESOLVE_REPORT: "api/reports/$[1]/resolve/",
  ADMIN_DELETE_REPORT: "api/reports/$[1]/",
  QUIT_REPORT: "api/reports/$[1]/",

  // https://api.mathtrade.com.ar/api/mathtrades/1/user-want-groups/
  // https://api.mathtrade.com.ar/api/mathtrades/1/user-want-groups/1/
  /*
  {
    "name": "",
    "bgg_id": "",
    "want_ids": [],
    "item_ids": []
}
  

  
  */

  PUT_RECEIVED: "api/mathtrades/$[mathtradeId]/results/$[1]/",

  // VOTACION
  GET_VOTACION: "api/surveys/",
  POST_VOTACION: "api/surveys/answers/",
  GET_VOTACION_RESULTS: "api/surveys/results/",

  // LOGISTICS
  LOGISTICS_GET_ITEMS: "api/logistics/items/",
  LOGISTICS_GET_BOXES: "api/logistics/boxes/",
  LOGISTICS_POST_BOX: "api/logistics/boxes/",
  LOGISTICS_PUT_BOX: "api/logistics/boxes/$[1]/",
  LOGISTICS_DELETE_BOX: "api/logistics/boxes/$[1]/",
  //
  LOGISTICS_GET_TRACKINGS: "api/logistics/trackings/",
  LOGISTICS_POST_TRACKING: "api/logistics/trackings/",
  LOGISTICS_PUT_TRACKING: "api/logistics/trackings/$[1]/",
  LOGISTICS_DELETE_TRACKING: "api/logistics/trackings/$[1]/",

  BGG_GET_USER: "api/bgg/user/$[1]/",
  BGG_GET_GAMES: "api/bgg/games/",
  BGG_GET_GAME: "api/bgg/games/$[1]/",
};

export default endpoints;
