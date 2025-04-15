import { useCallback, useContext, useState, useMemo } from "react";
import { PageContext } from "@/context/page";
import { MyWantsContext } from "@/context/myWants/all";
import useFetch from "@/hooks/useFetch";
import { processChanges } from "./utils";

import { GotoTopContext } from "@/context/goto-top";

const useFooter = () => {
  const { gotoTop } = useContext(GotoTopContext);

  /* PAGE CONTEXT **********************************************/
  const { myWants, setMyWants, canI, mustConfirm, mustConfirmDate } =
    useContext(PageContext);
  /* end PAGE CONTEXT */

  /* MYWANTS CONTEXT **********************************************/
  const {
    changes,
    setChanges,
    deletedWantgroupIds,
    setDeletedWantgroupIds,
    isLoadedWants,
  } = useContext(MyWantsContext);
  /* end MYWANTS CONTEXT **********************************************/

  /* COMMIT CHANGES MODAL ************************/
  const [showCommitChangesModal, setShowCommitChangesModal] = useState(false);
  const toggleCommitChangesModal = useCallback(() => {
    setShowCommitChangesModal((v) => !v);
  }, []);
  /* end COMMIT CHANGES MODAL ************************/

  /* POST CHANGES ************************/
  const afterLoadPost = useCallback(
    (updatedWants) => {
      if (updatedWants && updatedWants.want_groups) {
        setMyWants(updatedWants.want_groups);
        gotoTop();
        setChanges({});
        setDeletedWantgroupIds({});
      }
    },
    [gotoTop, setMyWants, setChanges, setDeletedWantgroupIds]
  );
  const [postAllChanges, , loadingPost, errorPost] = useFetch({
    endpoint: "PUT_MYWANTS_BATCH",
    method: "POST",
    afterLoad: afterLoadPost,
  });
  /* end POST CHANGES ************************/

  const { buttonFor, enabledBtn } = useMemo(() => {
    if (canI.want) {
      return {
        buttonFor: "want",
        enabledBtn:
          Object.keys(changes).length > 0 ||
          Object.keys(deletedWantgroupIds).length > 0,
      };
    }
    if (canI.commit) {
      return { buttonFor: "commit", enabledBtn: mustConfirm };
    }
    return { buttonFor: "none", enabledBtn: false };
  }, [changes, deletedWantgroupIds, canI, mustConfirm]);

  const onClick = useCallback(() => {
    if (buttonFor === "commit") {
      toggleCommitChangesModal();
    }

    if (buttonFor === "want") {
      const want_groups = processChanges(myWants, changes);

      if (want_groups.length) {
        postAllChanges({ params: { want_groups } });
      }
    }
  }, [buttonFor, postAllChanges, myWants, changes, toggleCommitChangesModal]);

  const emptyWants = useMemo(() => {
    return (isLoadedWants && !myWants.length) || false;
  }, [isLoadedWants, myWants]);

  return {
    emptyWants,
    buttonFor,
    enabledBtn,
    onClick,
    loading: loadingPost,
    error: errorPost,
    mustConfirmDate,
    showCommitChangesModal,
    toggleCommitChangesModal,
  };
};

export default useFooter;
