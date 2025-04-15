import { useCallback, useContext, useMemo } from "react";
import useFetch from "@/hooks/useFetch";
import { PageContext } from "@/context/page";
import { todayString } from "@/utils/dateUtils";

const useConfirmChanges = (onClose) => {
  /* PAGE CONTEXT **********************************************/
  const { setMustConfirm, setMustConfirmDate, forceReloadPage } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* COMMIT CHANGES ************************/
  const afterLoadCommit = useCallback(() => {
    setMustConfirm(false);
    setMustConfirmDate(todayString());
    onClose();
    forceReloadPage();
  }, [setMustConfirm, setMustConfirmDate, onClose, forceReloadPage]);

  const [commitChanges, , loading, error] = useFetch({
    endpoint: "COMMIT_CHANGES",
    method: "POST",
    afterLoad: afterLoadCommit,
  });
  /* end COMMIT CHANGES ************************/

  const onCommitChanges = useCallback(() => {
    commitChanges({ params: { commit: true } });
  }, [commitChanges]);

  return { onCommitChanges, loading, error };
};
export default useConfirmChanges;
