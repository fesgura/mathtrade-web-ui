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
  { path: "my-account", title: "Mi cuenta", icon: "user" },
  { path: "my-collection", title: "Mi colección", icon: "th-list" },
];

export const menu_no_mathTrade = [
  {
    title: "MT_NAME",
    path: "mathtrade/my-data",
    icon: "star",
  },
];

export const menu_yes_mathTrade = [
  {
    title: "Mis Items",
    path: "mathtrade/my-items",
  },
  {
    title: "Listado",
    path: "mathtrade/list",
  },
  {
    title: "Mis Wants",
    path: "mathtrade/my-wants",
  },
  {
    title: "Resultados",
    path: "mathtrade/results",
    disabled: true,
  },
  {
    title: "Mis datos",
    path: "mathtrade/my-data",
    bordered: true,
  },
];
