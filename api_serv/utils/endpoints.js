const endpoints = {
  // User
  LOGIN: "api-token-auth/",
  POST_USER: "api/register/",
  GET_USERS: "api/users/",
  GET_USER: "api/users/$[0]/",
  PUT_USER: "api/users/$[0]/",
  PUT_PASSWORD: "api/change-password/",
  FORGOT_PASSWORD: "api/recovery-password/",

  // Location
  GET_LOCATIONS: "api/locations/",

  //My collection
  GET_MYCOLLECTION_ITEMS: "api/items/",
  EDIT_MYCOLLECTION_ITEM: "api/items/$[0]/",
  DELETE_MYCOLLECTION_ITEM: "api/items/$[0]/",

  // Element
  PUT_ELEMENT: "api/elements/$[0]/",
  POST_ELEMENT: "api/elements/",
  DELETE_ELEMENT: "api/elements/$[0]/",

  // BGG
  GET_USER_BGG: "user?name=$[0]",
  GET_ELEMENT: "thing",
  SEARCH_ELEMENT: "search",

  // MATHTRADE
  GET_MATHTRADES: "api/mathtrades/",
  GET_MATHTRADE: "api/mathtrades/$[0]/",
  GET_MATHTRADE_USER: "api/mathtrades/$[0]/users/$[1]/",
  GET_MATHTRADE_USERS: "api/mathtrades/$[0]/users/",

  // MATHTRADE: MYITEMS
  GET_MYITEMS: "api/mathtrades/$[0]/user-items/",
  GET_MYITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/",
  POST_MYITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/",
  PUT_MYITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/$[1]/",
  DELETE_MYITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/$[1]/",
  PUBLISH_ITEM: "api/mathtrades/$[0]/items/",
  UNPUBLISH_ITEM: "api/mathtrades/$[0]/items/$[1]/",

  // MATHTRADE: LIST
  GET_GAMES_LIST: "api/mathtrades/$[0]/games/",
  GET_GAME: "api/mathtrades/$[0]/games/$[1]/",
  GET_ITEMS_LIST: "api/mathtrades/$[0]/items/",
  GET_ITEM: "api/mathtrades/$[0]/items/$[1]/",
  POST_VALUE_ITEMS: "api/item-values/",
  GET_ITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/",

  // MATHTRADE: MYDATA
  SINGIN_MATHTRADE: "api/mathtrades/$[0]/members/",
  EDIT_MYDATA_MATHTRADE: "api/mathtrades/$[0]/members/$[1]/",
  SIGNOUT_MYDATA_MATHTRADE: "api/mathtrades/$[0]/members/$[1]/",

  // MATHTRADE: MYWANTS
  MYWANTS: "api/mathtrades/$[0]/user-want-groups/",
  GET_WANT: "api/mathtrades/$[0]/user-want-groups/$[1]/",
  POST_MYWANTS: "api/mathtrades/$[0]/user-want-groups/",
  PUT_MYWANTS: "api/mathtrades/$[0]/user-want-groups/$[1]/",
  PUT_MYWANTS_BATCH: "api/mathtrades/$[0]/user-want-groups-list/",
  DELETE_MYWANTS: "api/mathtrades/$[0]/user-want-groups/$[1]/",

  // MATHTRADE: MYTAGS
  MYTAGS: "api/mathtrades/$[0]/user-tags/",
  POST_MYTAGS: "api/mathtrades/$[0]/user-tags/",
  PUT_MYTAGS: "api/mathtrades/$[0]/user-tags/$[1]/",
  DELETE_MYTAGS: "api/mathtrades/$[0]/user-tags/$[1]/",
  COMMIT_CHANGES: "api/mathtrades/$[0]/user-commit/",

  GET_MATHTRADE_STATS: "api/mathtrades/$[0]/stats/",

  // NOTIFICATIONS
  GET_NOTIFICATIONS: "api/notifications/",
  PUT_NOTIFICATIONS: "api/notifications/$[0]/",

  // BAN
  GET_BANS: "api/mathtrades/$[0]/user-bans/",
  POST_BAN: "api/mathtrades/$[0]/user-bans/",
  DELETE_BAN: "api/mathtrades/$[0]/user-bans/$[1]/",

  AUTOCOMPLETE_WANTS: "api/mathtrades/$[0]/user-want-groups-match/",
  GET_MT_RESULTS: "api/mathtrades/$[0]/results/",

  // IMAGES
  POST_IMAGE: "api/images/",

  // COMMENTS
  GET_COMMENTS: "api/mathtrades/$[0]/items/$[1]/comments/",
  POST_COMMENT: "api/mathtrades/$[0]/items/$[1]/comments/",
  PUT_COMMENT: "api/mathtrades/$[0]/items/$[1]/comments/$[2]/",

  // POST MT
  POST_MT: "api/mathtrades/$[0]/post-items/",

  GET_PRICES: "api/mathtrades/$[0]/prices/",
  POST_IMG_PRICES: "api/mathtrades/$[0]/prices/",

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
};

endpoints.compose = (type, args) => {
  let url = endpoints[type];
  if (args && args.length) {
    args.forEach((arg, i) => {
      url = url.replace(`$[${i}]`, arg);
    });
  }
  return url;
};

export default endpoints;
