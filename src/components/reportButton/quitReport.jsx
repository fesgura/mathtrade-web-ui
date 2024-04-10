import { useState, useCallback, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import Icon from "../icon";
import clsx from "clsx";
import UserBox from "../userBox";

const QuitReport = ({ id, reported }) => {
  const urlParams = useMemo(() => {
    return [id || ""];
  }, [id]);

  const [showBtn, setShowBtn] = useState(true);

  const afterLoad = useCallback(() => {
    setShowBtn(false);
  }, []);

  const [quitReport, , loading] = useFetch({
    endpoint: "QUIT_REPORT",
    method: "DELETE",
    urlParams,
    afterLoad,
  });

  const onSubmit = useCallback(() => {
    quitReport();
  }, [quitReport]);

  const { user, comment } = useMemo(() => {
    const { user: user_reported, comment: comment_reported } = reported;

    if (!user_reported) {
      return {};
    }

    return {
      user: user_reported
        ? {
            avatar: user_reported?.avatar || "",
            name: `${user_reported?.first_name || ""} ${
              user_reported?.last_name || ""
            }`,
            locationId: user_reported?.location || "none",
          }
        : null,
      comment: comment_reported || "",
    };
  }, [reported]);

  return showBtn ? (
    <div className="border border-teal-400 rounded-lg px-3">
      <div className="border-b border-teal-400/50  py-2">
        <div className="text-[9px] font-bold text-black">
          <I18N id="reportItem.title" />
        </div>
        <div className="flex gap-2">
          {comment ? <div className="text-[12px]">{comment}</div> : null}
          {user ? (
            <div className="w-40 border-l border-gray-300 pl-2">
              <UserBox userForce={user} toLeft />
            </div>
          ) : null}
        </div>
      </div>
      <div className="py-2">
        <button
          className={clsx(
            "flex items-center gap-1 text-[13px] leading-none text-teal-600 underline hover:opacity-70",
            {
              "opacity-30": loading,
            }
          )}
          onClick={onSubmit}
          disabled={loading}
        >
          <Icon type="report" />

          <span className="text-[12px] font-bold">
            <I18N id="reportItem.quit" />
          </span>
        </button>
      </div>
    </div>
  ) : null;
};
export default QuitReport;
