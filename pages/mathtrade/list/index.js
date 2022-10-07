import { useEffect } from "react";
import Router from "next/router";
import { privateRoutes } from "config/routes";

const MT_ItemListPage = () => {
  useEffect(() => {
    Router.push(privateRoutes.mathtrade.gameList);
  }, []);

  return null;
};
export default MT_ItemListPage;
