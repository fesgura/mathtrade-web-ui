import { useEffect } from "react";
import Router from "next/router";
import { privateRoutes } from "config/routes";
import storage from "utils/storage";

const MT_ItemListPage = () => {
  useEffect(() => {
    const listPageType = storage.getOption("listPageType");

    if (!listPageType || listPageType === "gameList") {
      Router.push("/" + privateRoutes.mathtrade.gameList.path);
    } else {
      Router.push("/" + privateRoutes.mathtrade.itemList.path);
    }
  }, []);

  return null;
};
export default MT_ItemListPage;
