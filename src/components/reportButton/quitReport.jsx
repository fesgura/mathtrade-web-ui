import { useState, useCallback, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import I18N from "@/i18n";
import Icon from "../icon";
import clsx from "clsx";

const QuitReport = ({ id }) => {
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

  return showBtn ? (
    <button
      className={clsx(
        "flex items-center gap-1 text-[13px] leading-none  border border-teal-600 text-teal-600 py-1 px-3 rounded-full",
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
  ) : null;
};
export default QuitReport;
