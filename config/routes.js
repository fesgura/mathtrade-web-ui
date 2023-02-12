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
    list: {
      path: "mathtrade/list",
    },
    gameList: {
      path: "mathtrade/list/games",
    },
    itemList: {
      path: "mathtrade/list/items",
    },
    myWants: {
      path: "mathtrade/my-wants",
    },
    results: {
      path: "mathtrade/results",
    },
    myData: {
      path: "mathtrade/my-data",
    },
  },
};

export const linkUserAccount = { path: "my-account", title: "title.MyAccount" };
export const menuBasic = [
  {
    path: privateRoutes.myCollection.path,
    title: "title.MyCollection",
    icon: "folder-o",
  },
];

export const menu_no_mathTrade = [
  {
    title: "header.SignToMathTrade",
    path: privateRoutes.mathtrade.myData.path,
    icon: "star",
  },
];

export const menu_yes_mathTrade = [
  {
    title: "menu.MyItems",
    path: privateRoutes.mathtrade.myItems.path,
    icon: "th-large",
  },
  {
    title: "menu.List",
    path: privateRoutes.mathtrade.list.path,
    icon: "list",
  },
  {
    title: "menu.MyWants",
    path: privateRoutes.mathtrade.myWants.path,
    icon: "heart-o",
  },
  {
    title: "menu.Results",
    path: privateRoutes.mathtrade.results.path,
    disabled: true,
    icon: "sitemap",
  },
  {
    title: "menu.MyData",
    path: privateRoutes.mathtrade.myData.path,
    icon: "user-o",
  },
];
