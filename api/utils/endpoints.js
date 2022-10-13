const endpoints = {
  // User
  LOGIN: "api-token-auth/",
  POST_USER: "api/register/",
  GET_USER: "api/users/$[0]/",
  PUT_USER: "api/users/$[0]/",
  PUT_PASSWORD: "api/change-password/",

  // Location
  GET_LOCATIONS: "api/locations/",

  //My collection
  GET_MYCOLLECTION_ITEMS: "api/items/",
  DELETE_MYCOLLECTION_ITEM: "api/items/$[0]/",

  // Element
  PUT_ELEMENT: "api/elements/$[0]/",
  POST_ELEMENT: "api/elements/",
  DELETE_ELEMENT: "api/elements/$[0]/",

  // BGG
  GET_USER: "user?name=$[0]",
  GET_ELEMENT: "thing",
  SEARCH_ELEMENT: "search",

  // MATHTRADE
  GET_MATHTRADES: "api/mathtrades/",
  GET_MATHTRADE_USERS: "api/mathtrades/$[0]/users/$[1]/",

  // MATHTRADE: MYITEMS
  GET_MYITEMS: "api/mathtrades/$[0]/user-items/",
  GET_MYITEM_GROUPS: "api/mathtrades/$[0]/user-item-groups/",
  PUBLISH_ITEM: "api/mathtrades/$[0]/items/",
  UNPUBLISH_ITEM: "api/mathtrades/$[0]/items/$[1]/",

  // MATHTRADE: LIST
  GET_GAMES_LIST: "api/mathtrades/$[0]/games/",
  GET_ITEMS_LIST: "api/mathtrades/$[0]/games/",
  POST_VALUE_ITEMS: "api/items/item-values/",

  // MATHTRADE: MYDATA
  SINGIN_MATHTRADE: "api/mathtrades/$[0]/members/",
  EDIT_MYDATA_MATHTRADE: "api/mathtrades/$[0]/members/$[1]/",
  SIGNOUT_MYDATA_MATHTRADE: "api/mathtrades/$[0]/members/$[1]/",

  // MATHTRADE: MYWANTS
  MYWANTS: "api/mathtrades/$[0]/user-wants/",
  POST_MYWANTS: "api/mathtrades/$[0]/user-wants/",
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
