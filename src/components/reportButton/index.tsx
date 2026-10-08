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

// part="report": only the staff report box (it goes on its own row, so a
// long comment never squeezes the owner); part="button": only the button.
const ReportButton = ({ className = "", part = "all" }) => {
  /* PAGE CONTEXT **********************************************/
  const { pageType } = useContext(PageContext);

  const { item } = useContext(ItemContext);
  const { id, isOwned, reported } = item;

  if (id && reported) {
    if (part === "button") return null;
    return (
      <div className={className}>
        <QuitReport id={reported.id} reported={reported} />
      </div>
    );
  }

  if (part === "report") return null;

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
