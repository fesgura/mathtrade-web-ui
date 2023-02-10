export const publicRoutes = {
  signin: {
    path: "signin",
  },
  signup: {
    path: "signup",
  },
  newPassword: {
    path: "new-password",
  },
};

export const privateRoutes = {
  home: {
    path: "",
  },
  myCollection: {
    path: "my-collection",
  },

  myAccount: {
    path: "my-account",
  },

  mathtrade: {
    myItems: {
      path: "mathtrade/my-items",
    },
    gameList: {
      path: "mathtrade/list/games",
    },
    itemList: {
      path: "mathtrade/list/items",
    },
    results: {
      path: "mathtrade/results",
    },
    myData: {
      path: "mathtrade/my-data",
    },
  },
};

export const menuUser = [
  { path: "my-account", title: "title.MyAccount", icon: "user" },
  { path: "my-collection", title: "title.MyCollection", icon: "th-list" },
];

export const menu_no_mathTrade = [
  {
    title: "header.SignToMathTrade",
    path: "mathtrade/my-data",
    icon: "star",
  },
];

export const menu_yes_mathTrade = [
  {
    title: "menu.MyItems",
    path: "mathtrade/my-items",
  },
  {
    title: "menu.List",
    path: "mathtrade/list",
  },
  {
    title: "menu.MyWants",
    path: "mathtrade/my-wants",
  },
  {
    title: "menu.Results",
    path: "mathtrade/results",
    disabled: true,
  },
  {
    title: "menu.MyData",
    path: "mathtrade/my-data",
    bordered: true,
  },
];
