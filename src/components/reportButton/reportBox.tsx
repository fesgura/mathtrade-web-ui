import { useMemo } from "react";
import I18N, { getI18Ntext } from "@/i18n";
import UserBox from "../userBox";
import { openReport } from "../reportModal/reportModalStore";

// Staff: the open report on the item card. The report itself (title,
// comment) opens the report detail (its permalink modal). Deleting a report
// erases its whole thread, so it only happens from the admin reports page,
// behind a confirmation.
const ReportBox = ({ id = null, reported = null }) => {
  const { user, comment } = useMemo(() => {
    const { user: user_reported, comment: comment_reported } = reported || {};

    if (!user_reported) {
      return {};
    }

    return {
      user: {
        id: user_reported?.id ?? null,
        avatar: user_reported?.avatar || "",
        name: `${user_reported?.first_name || ""} ${
          user_reported?.last_name || ""
        }`,
        locationId: user_reported?.location || "none",
      },
      comment: comment_reported || "",
    };
  }, [reported]);

  return (
    <div className="border border-teal-400 rounded-lg px-3 py-2 min-w-0">
      <button
        type="button"
        className="group block w-full min-w-0 text-left"
        title={getI18Ntext("reportItem.open")}
        onClick={(e) => {
          e.stopPropagation();
          openReport(id);
        }}
      >
        <span className="flex items-center justify-between gap-2 text-[9px] font-bold text-black">
          <I18N id="reportItem.title" />
          <span className="text-[11px] font-bold text-teal-600 underline group-hover:opacity-70">
            <I18N id="reportItem.open" />
          </span>
        </span>
        {comment ? (
          <span className="block text-[12px] break-words whitespace-pre-line group-hover:text-teal-700">
            {comment}
          </span>
        ) : null}
      </button>
      {user ? (
        <div className="flex items-center gap-2 mt-1 min-w-0">
          <span className="text-[11px] text-gray-600 shrink-0">
            <I18N id="reportItem.by" />:
          </span>
          <div className="min-w-0">
            <UserBox userForce={user} toLeft />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ReportBox;
