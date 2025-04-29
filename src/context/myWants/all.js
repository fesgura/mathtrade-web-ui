import { createContext, useCallback, useState } from "react";

export const MyWantsContext = createContext({
  matchValues: {},
  setMatchValues: () => {},
  changes: {},
  setChanges: () => {},
  deletedWantgroupIds: {},
  setDeletedWantgroupIds: () => {},

  //
  previewItemId: null,
  setPreviewItemId: () => {},
  showPreviewItemModal: false,
  tooglePreviewItemModal: () => {},

  //
  isLoadedWants: false,
  setIsLoadedWants: () => {},
  //
  acceptChecksCommit: {
    accept_1: false,
    accept_2: false,
  },
  setAcceptChecksCommit: () => {},
});

export const MyWantsContextProvider = ({ children }) => {
  const [matchValues, setMatchValues] = useState({});
  const [changes, setChanges] = useState({});
  const [deletedWantgroupIds, setDeletedWantgroupIds] = useState({});

  //
  const [previewItemId, setPreviewItemId] = useState(null);
  const [showPreviewItemModal, setShowPreviewItemModal] = useState(false);
  const tooglePreviewItemModal = useCallback(() => {
    setShowPreviewItemModal((v) => !v);
  }, []);

  const [isLoadedWants, setIsLoadedWants] = useState(false);

  const [acceptChecksCommit, setAcceptChecksCommit] = useState({
    accept_1: false,
    accept_2: false,
  });

  return (
    <MyWantsContext.Provider
      value={{
        matchValues,
        setMatchValues,
        changes,
        setChanges,
        deletedWantgroupIds,
        setDeletedWantgroupIds,

        //
        previewItemId,
        setPreviewItemId,
        showPreviewItemModal,
        tooglePreviewItemModal,

        //
        isLoadedWants,
        setIsLoadedWants,
        //
        acceptChecksCommit,
        setAcceptChecksCommit,
      }}
    >
      {children}
    </MyWantsContext.Provider>
  );
};
