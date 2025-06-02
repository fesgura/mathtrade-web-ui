import { useCallback, useContext, useMemo } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import { processChanges } from "./utils";

import { GotoTopContext } from "@/context/goto-top";

const useFooter = () => {
  const { gotoTop } = useContext(GotoTopContext);

  /* PAGE CONTEXT **********************************************/
  const { myWants, setMyWants, canI, setMustConfirm, setMustConfirmDate } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const {
    changes,
    setChanges,
    deletedWantgroupIds,
    setDeletedWantgroupIds,
    isLoadedWants,
    setAcceptChecksCommit,
  } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  /* POST CHANGES ************************/
  const afterLoadPost = useCallback(
    (updatedWants) => {
      if (updatedWants && updatedWants.want_groups) {
        setMyWants(updatedWants.want_groups);
        gotoTop();
        setChanges({});
        setDeletedWantgroupIds({});
        setMustConfirm(true);
        setMustConfirmDate(null);
        setAcceptChecksCommit({
          accept_1: false,
          accept_2: false,
        });
      }
    },
    [
      gotoTop,
      setMyWants,
      setChanges,
      setDeletedWantgroupIds,
      setMustConfirm,
      setMustConfirmDate,
      setAcceptChecksCommit,
    ]
  );
  const [postAllChanges, , loadingPost, errorPost] = useFetch({
    endpoint: "PUT_MYWANTS_BATCH",
    method: "POST",
    afterLoad: afterLoadPost,
  });
  /* end POST CHANGES ************************/

  const enabledBtn = useMemo(() => {
    return (
      canI.want &&
      (Object.keys(changes).length > 0 ||
        Object.keys(deletedWantgroupIds).length > 0)
    );
  }, [changes, deletedWantgroupIds, canI]);

  const onClick = useCallback(() => {
    const want_groups = processChanges(myWants, changes);

    if (want_groups.length) {
      postAllChanges({ params: { want_groups } });
    }
  }, [postAllChanges, myWants, changes]);

  const emptyWants = useMemo(() => {
    return (isLoadedWants && !myWants.length) || false;
  }, [isLoadedWants, myWants]);

  return {
    emptyWants,
    enabledBtn,
    onClick,
    loading: loadingPost,
    error: errorPost,
  };
};

export default useFooter;
