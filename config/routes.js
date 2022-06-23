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
    path: "/",
  },
  myAccount: {
    path: "my-account",
  },
};

export const mainMenuList = [
  // { path: privateRoutes.opt1.path, title: "Opcion 1" },
  // { path: privateRoutes.opt2.path, title: "Opcion 2" },
  // {
  //   // path: privateRoutes.opt3.path,
  //   title: "Opcion 3",
  //   children: [
  //     { path: privateRoutes.opt4.path, title: "Opcion 4" },
  //     { path: privateRoutes.opt5.path, title: "Opcion 5" },
  //     { path: privateRoutes.opt6.path, title: "Opcion 6" },
  //   ],
  // },
  { path: privateRoutes.home.path, title: "Inicio" },
];
export const mainMenuUserList = [
  { path: privateRoutes.myAccount.path, title: "Mi cuenta", icon: "user" },
];
