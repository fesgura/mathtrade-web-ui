import { useEffect } from "react";
import Router from "next/router";
import { privateRoutes } from "config/routes";

const MT_ItemListPage = () => {
  useEffect(() => {
    Router.push(
      `/${
        privateRoutes.mathTradeEnabled.path +
        privateRoutes.mathTradeEnabled.list.path
      }`
    );
  }, []);

  return null;
};
export default MT_ItemListPage;
