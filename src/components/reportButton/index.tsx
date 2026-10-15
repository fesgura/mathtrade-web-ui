import { useContext } from "react";
import { PageContext } from "@/context/page";
import { ItemContext } from "@/context/item";
import ReportButtonBtn from "./button";
import ReportBox from "./reportBox";

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

  const canReport =
    Boolean(id) && availablePages.indexOf(pageType) >= 0 && !isOwned;

  if (id && reported) {
    // Staff only (`reported` comes from the admin item serializer): the
    // open report box, plus "Reportar de nuevo", which the backend merges
    // into the open thread (POST reports/ answers merged: true).
    if (part === "button") {
      return canReport ? (
        <div className={className}>
          <ReportButtonBtn id={id} again />
        </div>
      ) : null;
    }
    return (
      <div className={className}>
        {part === "all" && canReport ? (
          <div className="mb-2">
            <ReportButtonBtn id={id} again />
          </div>
        ) : null}
        <ReportBox id={reported.id} reported={reported} />
      </div>
    );
  }

  if (part === "report") return null;

  if (canReport) {
    return (
      <div className={className}>
        <ReportButtonBtn id={id} />
      </div>
    );
  }

  return null;
};
export default ReportButton;
