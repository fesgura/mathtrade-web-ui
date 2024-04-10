import { useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ReportButtonBtn from "./button";
import QuitReport from "./quitReport";

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
  const { id, isOwned, reported } = item;

  if (id && reported) {
    return (
      <div className={className}>
        <QuitReport id={id} reported={reported} />
      </div>
    );
  }

  if (id && availablePages.indexOf(pageType) >= 0 && !isOwned) {
    return (
      <div className={className}>
        <ReportButtonBtn id={id} />
      </div>
    );
  }

  return null;
};
export default ReportButton;
