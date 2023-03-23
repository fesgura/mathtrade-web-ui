import { useState, useEffect, useCallback } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import WantButton from "./wantButton";
import EditorWants from "./editor";
import I18N from "i18n";
import { useApi, MathTradeService } from "api_serv";
import { getItemInWantList } from "./utils";
import WantQuick from "./wantQuick";

const WantEditor = ({
  objectToWant,
  type = "item",
  wantGroupId,
  isItemInOtherGroup = false,
  afterAnyChange,
  isOwner,
  min,
  canEditWants,
  forceOpen,
  setForceOpen,
}) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);
  const [modalIsItemInOtherGroup, setModalIsItemInOtherGroup] = useState(false);

  const toggleModal = () => {
    if (setForceOpen) setForceOpen(false);
    setModalWantOpen(false);
  };
  const toggleModalIsItemInOtherGroup = () => {
    setModalIsItemInOtherGroup((v) => !v);
  };

  const [getWantGroup, wantGroup, loading] = useApi({
    promise: MathTradeService.getWant,
    afterLoad: () => {
      setModalIsItemInOtherGroup(false);
      setModalWantOpen(true);
    },
  });

  const onOpenModal = useCallback(() => {
    if (isItemInOtherGroup) {
      setModalIsItemInOtherGroup(true);
    } else {
      if (wantGroupId) {
        getWantGroup({ id: wantGroupId });
      } else {
        setModalWantOpen(true);
      }
    }
  }, [isItemInOtherGroup, wantGroupId]);

  useEffect(() => {
    if (forceOpen) {
      onOpenModal();
    }
  }, [forceOpen, onOpenModal]);

  return (
    <>
      <WantButton
        loading={loading}
        wantGroupId={wantGroupId}
        objectToWant={objectToWant}
        afterAnyChange={afterAnyChange}
        type={type}
        isOwner={isOwner}
        min={min}
        canEditWants={canEditWants}
        isItemInOtherGroup={isItemInOtherGroup}
        onClick={onOpenModal}
      />
      {!canEditWants || wantGroupId || type === "tag" ? null : (
        <WantQuick
          objectToWant={objectToWant}
          type={type}
          afterAnyChange={afterAnyChange}
        />
      )}

      {modalIsItemInOtherGroup && isItemInOtherGroup ? (
        <Modal
          isOpen={true}
          toggle={toggleModalIsItemInOtherGroup}
          centered
          size="lg"
        >
          <ModalBody>
            <div className="text-center  pt-2">
              <p className="mb-4">
                <I18N id="wantEditor.IsItemInOther" />
              </p>
            </div>
            <div className="text-center  pb-3">
              <Button
                color="link"
                size="sm"
                outline
                className="me-2"
                onClick={() => {
                  setModalIsItemInOtherGroup(false);
                }}
              >
                <I18N id="wantEditor.IsItemInOther.btn.Cancel" />
              </Button>
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  if (wantGroupId) {
                    getWantGroup({ id: wantGroupId });
                  } else {
                    setModalIsItemInOtherGroup(false);
                    setModalWantOpen(true);
                  }
                }}
              >
                <I18N id="wantEditor.IsItemInOther.btn.Yes" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
      {modalWantOpen && !isOwner ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="lg">
          <div className="text-center pt-4">
            <h3 className="m-0">
              {wantGroup ? (
                <I18N id="wantEditor.title.EditWant" />
              ) : (
                <I18N id="wantEditor.title.AddWant" />
              )}
            </h3>
          </div>

          <ModalBody>
            <EditorWants
              objectToWant={objectToWant}
              type={type}
              wantGroup={wantGroup}
              afterAnyChange={afterAnyChange}
              toggleModal={toggleModal}
              canEditWants={true}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default WantEditor;
