"use client";
import { useCallback, useContext, useEffect } from "react";
import { PageContext } from "@/context/page";
import Modal from "@/components/modal";
import ItemPreview from "./item";
import GamePreview from "./game";
import TagPreview from "./tag";
import RemoveButton from "./removeBtn";
import useFetch from "@/hooks/useFetch";
import { LoadingBox } from "@/components/loading";
import ErrorAlert from "@/components/errorAlert";

const ModalPreviewerWantGroup = () => {
  /* PAGE CONTEXT **********************************************/
  const {
    canI,
    showPreviewWantGroupModal,
    tooglePreviewWantGroupModal,
    previewWantGroup,
    setPreviewWantGroup,
    previewWantGroupId,
    setPreviewWantGroupId,
  } = useContext(PageContext);
  /* end PAGE CONTEXT */

  /* FETCH *************************************************/
  const afterLoad = useCallback(
    (newWantGroup) => {
      setPreviewWantGroup(newWantGroup);
      setPreviewWantGroupId(null);
    },
    [setPreviewWantGroup, setPreviewWantGroupId]
  );
  const [getWantGroup, , loading, error] = useFetch({
    endpoint: "GET_WANT",
    initialState: null,
    afterLoad,
  });

  useEffect(() => {
    if (previewWantGroupId && showPreviewWantGroupModal) {
      setPreviewWantGroup(null);
      getWantGroup({ urlParams: [previewWantGroupId] });
    }
  }, [
    setPreviewWantGroup,
    getWantGroup,
    previewWantGroupId,
    showPreviewWantGroupModal,
  ]);

  /* end FETCH */

  /*****************************************************/

  let content = null;

  if (previewWantGroup) {
    switch (previewWantGroup?.type) {
      case "item":
        content = <ItemPreview wantGroup={previewWantGroup} />;
        break;
      case "game":
        content = <GamePreview wantGroup={previewWantGroup} />;
        break;
      case "tag":
        content = <TagPreview wantGroup={previewWantGroup} />;
        break;
      default:
      //
    }
  }

  return (
    <Modal
      isOpen={showPreviewWantGroupModal}
      onClose={tooglePreviewWantGroupModal}
      size="md2"
    >
      <div className="relative min-h-60">
        {content}
        {previewWantGroup && canI.want ? (
          <RemoveButton wantGroup={previewWantGroup} />
        ) : null}
        <ErrorAlert error={error} />
        <LoadingBox loading={loading} />
      </div>
    </Modal>
  );
};

export default ModalPreviewerWantGroup;
