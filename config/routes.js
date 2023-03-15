export const publicRoutes = {
  signin: {
    path: "signin",
  },
  signup: {
    path: "signup",
  },
  forgotPassword: {
    path: "forgot-password",
  },
  changePassword: {
    path: "change-password",
  },
};

export const privateRoutes = {
  home: {
    path: "",
    icon: "home",
  },
  myCollection: {
    path: "my-collection",
    icon: "folder-o",
  },

  myAccount: {
    path: "my-account",
    icon: "user",
  },

  mathtrade: {
    myItems: {
      path: "mathtrade/my-items",
      icon: "th-large",
    },
    list: {
      path: "mathtrade/list",
      icon: "list",
    },
    gameList: {
      path: "mathtrade/list/games",
      icon: "list",
    },
    itemList: {
      path: "mathtrade/list/items",
      icon: "list",
    },
    myWants: {
      path: "mathtrade/my-wants",
      icon: "heart-o",
    },
    results: {
      path: "mathtrade/results",
      icon: "star",
    },
    myData: {
      path: "mathtrade/my-data",
      icon: "user-o",
    },
  },
};

export const linkUserAccount = { path: "my-account", title: "title.MyAccount" };
export const menuBasic = [
  {
    path: privateRoutes.myCollection.path,
    title: "title.MyCollection",
    icon: privateRoutes.myCollection.icon,
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
    icon: privateRoutes.mathtrade.myItems.icon,
  },
  {
    title: "menu.List",
    path: privateRoutes.mathtrade.list.path,
    icon: privateRoutes.mathtrade.list.icon,
  },
  {
    title: "menu.MyWants",
    path: privateRoutes.mathtrade.myWants.path,
    icon: privateRoutes.mathtrade.myWants.icon,
  },
  {
    title: "menu.Results",
    path: privateRoutes.mathtrade.results.path,
    hot: true,
    disabled: "results",
    icon: privateRoutes.mathtrade.results.icon,
  },
  {
    title: "menu.MyData",
    path: privateRoutes.mathtrade.myData.path,
    icon: privateRoutes.mathtrade.myData.icon,
  },
];
