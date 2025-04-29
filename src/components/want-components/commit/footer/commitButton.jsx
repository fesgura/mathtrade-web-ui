import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import Icon from "@/components/icon";
import ErrorAlert from "@/components/errorAlert";
import { todayString } from "@/utils/dateUtils";

const CommitButton = () => {
  /* PAGE CONTEXT **********************************************/
  const { setMustConfirm, setMustConfirmDate } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* COMMIT CHANGES ************************/
  const afterLoadCommit = useCallback(() => {
    setMustConfirm(false);
    setMustConfirmDate(todayString());
  }, [setMustConfirm, setMustConfirmDate]);

  const [commitChanges, , loading, errorCommit] = useFetch({
    endpoint: "COMMIT_CHANGES",
    method: "POST",
    afterLoad: afterLoadCommit,
  });
  /* end COMMIT CHANGES ************************/

  return (
    <div>
      <ErrorAlert error={errorCommit} />
      <button
        className={clsx(
          "mx-auto flex items-center gap-2 px-6 py-2 rounded-full text-lg transition-colors",
          {
            "bg-danger hover:bg-red-800 text-white cursor-pointer": !loading,
            "bg-gray-300 text-gray-400": loading,
          }
        )}
        disabled={loading}
        onClick={() => {
          commitChanges({ params: { commit: true } });
        }}
      >
        {loading && <Icon type="loading" />}
        <I18N id="btn.CommitChanges" />
      </button>
    </div>
  );
};

export default CommitButton;
