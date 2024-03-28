import { useCallback, useContext, useEffect, useState, useMemo } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import { processChanges } from "./utils";
import { todayString } from "@/utils/dateUtils";
import { GotoTopContext } from "@/context/goto-top";

const useFooter = () => {
  const { gotoTop } = useContext(GotoTopContext);

  /* PAGE CONTEXT **********************************************/
  const { myWants, setMyWants, canI } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const {
    changes,
    setChanges,
    deletedWantgroupIds,
    setDeletedWantgroupIds,
    mustConfirm,
    setMustConfirm,
    mustConfirmDate,
    setMustConfirmDate,
    isLoadedWants,
  } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  /* COMMIT CHANGES ************************/
  const afterLoadCommit = useCallback(() => {
    setMustConfirm(false);
    setMustConfirmDate(todayString());
  }, [setMustConfirm, setMustConfirmDate]);

  const [commitChanges, , loadingCommit, errorCommit] = useFetch({
    endpoint: "COMMIT_CHANGES",
    method: "POST",
    afterLoad: afterLoadCommit,
  });
  /* end COMMIT CHANGES ************************/

  /* POST CHANGES ************************/
  const afterLoadPost = useCallback(
    (updatedWants) => {
      if (updatedWants && updatedWants.want_groups) {
        setMyWants(updatedWants.want_groups);
        gotoTop();
        setChanges({});
        setDeletedWantgroupIds({});
        //commitChanges({ params: {} });
        setMustConfirm(false);
        setMustConfirmDate(todayString());
      }
    },
    [
      gotoTop,
      setMyWants,
      setChanges,
      setDeletedWantgroupIds,
      setMustConfirm,
      setMustConfirmDate,
    ]
  );
  const [postAllChanges, , loadingPost, errorPost] = useFetch({
    endpoint: "PUT_MYWANTS_BATCH",
    method: "POST",
    afterLoad: afterLoadPost,
  });
  /* end POST CHANGES ************************/

  const { onlyCommit, enabledBtn, canCommit } = useMemo(() => {
    if (!canI.want) {
      return { onlyCommit: true, enabledBtn: false, canCommit: false };
    }
    const canCommit = canI.commit;
    const hasChanges =
      Object.keys(changes).length > 0 ||
      Object.keys(deletedWantgroupIds).length > 0;
    const enabledBtn = mustConfirm || hasChanges || canCommit;

    return { onlyCommit: !hasChanges, enabledBtn, canCommit };
  }, [changes, deletedWantgroupIds, canI, mustConfirm]);

  const onClick = useCallback(() => {
    if (onlyCommit) {
      commitChanges({ params: {} });
    } else {
      const want_groups = processChanges(myWants, changes);

      if (want_groups.length) {
        postAllChanges({ params: { want_groups } });
      }
    }
  }, [commitChanges, onlyCommit, postAllChanges, myWants, changes]);

  const emptyWants = useMemo(() => {
    return (isLoadedWants && !myWants.length) || false;
  }, [isLoadedWants, myWants]);

  return {
    emptyWants,
    onlyCommit,
    enabledBtn,
    onClick,
    loading: loadingPost || loadingCommit,
    error: errorPost || errorCommit,
    mustConfirmDate,
    canCommit,
  };
};

export default useFooter;
