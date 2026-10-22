import I18N from "@/i18n";
import useFetch from "@/hooks/useFetch";
import useDuplicateWants, {
  type DuplicatesResponse,
} from "@/hooks/useDuplicateWants";
import { PageContext } from "@/context/page";
import { useCallback, useContext, useState } from "react";
import clsx from "clsx";
import Icon from "@/components/icon";
import ErrorAlert from "@/components/errorAlert";
import DuplicatesModal from "@/components/want-components/duplicates/DuplicatesModal";
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

  /* DUPLICATES CHECK ************************/
  // Before committing, list the wants that could bring the same game twice.
  // On any error `load` resolves null and the commit goes ahead (fail open).
  const { load, loading: checking } = useDuplicateWants();
  const [dups, setDups] = useState<DuplicatesResponse | null>(null);

  const commit = () => commitChanges({ params: { commit: true } });

  const onClick = async () => {
    const res = await load();
    if (res && res.count > 0) setDups(res);
    else commit();
  };
  /* end DUPLICATES CHECK ************************/

  const busy = loading || checking;

  return (
    <div>
      <ErrorAlert error={errorCommit} />
      <button
        className={clsx(
          "mx-auto flex items-center gap-2 px-6 py-2 rounded-full text-lg transition-colors",
          {
            "bg-danger hover:bg-red-800 text-white cursor-pointer": !busy,
            "bg-gray-300 text-gray-400": busy,
          }
        )}
        disabled={busy}
        onClick={onClick}
      >
        {busy && <Icon type="loading" />}
        <I18N id="btn.CommitChanges" />
      </button>
      <DuplicatesModal
        isOpen={!!dups}
        data={dups}
        mode="commit"
        onClose={() => setDups(null)}
        onConfirm={() => {
          setDups(null);
          commit();
        }}
      />
    </div>
  );
};

export default CommitButton;
