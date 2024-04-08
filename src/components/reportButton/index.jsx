import { useCallback, useState, useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ReportButtonBtn from "./button";

const availablePages = [
  "items",
  "games",
  "wants-visual",
  "wants-grid",
  "results",
];

const ReportButton = ({ className }) => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);

  const { item } = useContext(ItemContext);
  const { id, isOwned } = item;

  return id && availablePages.indexOf(pageType) >= 0 && !isOwned ? (
    <div className={className}>
      <ReportButtonBtn id={id} />
    </div>
  ) : null;
};
export default ReportButton;
