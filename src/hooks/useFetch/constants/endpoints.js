const endpoints = {
  // User
  LOGIN: "api/auth-token/",
  POST_USER: "api/users/register/",
  PUT_PASSWORD: "api/users/change-password/",
  FORGOT_PASSWORD: "api/users/recovery-password/",
  GET_USERS: "api/users/",
  GET_USER: "api/users/",
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
  GET_MATHTRADE_USER: "api/mathtrades/$[mathtradeId]/users/$[1]/",
  GET_MATHTRADE_USERS: "api/mathtrades/$[mathtradeId]/users/",

  // MATHTRADE: MYDATA
  SINGIN_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/",
  EDIT_MYDATA_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/$[1]/",
  SIGNOUT_MYDATA_MATHTRADE: "api/mathtrades/$[mathtradeId]/members/$[1]/",

  GET_MATHTRADE_STATS: "api/mathtrades/$[mathtradeId]/stats/",

  // BAN
  GET_BANS: "api/mathtrades/$[mathtradeId]/user-bans/",
  POST_BAN: "api/mathtrades/$[mathtradeId]/user-bans/",
  DELETE_BAN: "api/mathtrades/$[mathtradeId]/user-bans/$[1]/",

  AUTOCOMPLETE_WANTS: "api/mathtrades/$[mathtradeId]/user-want-groups-match/",
  GET_MT_RESULTS: "api/mathtrades/$[mathtradeId]/results/",

  // IMAGES
  POST_IMAGE: "api/users/images/",

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
  QUIT_REPORT: "api/reports/$[1]",

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

  // VOTACION
  GET_VOTACION: "api/surveys/",
  POST_VOTACION: "api/surveys/answers/",
  GET_VOTACION_RESULTS: "api/surveys/results/",
};

export default endpoints;
