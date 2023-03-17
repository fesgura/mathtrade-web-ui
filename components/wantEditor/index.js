import { useState, useEffect } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import WantButton from "./wantButton";
import EditorWants from "./editor";
import I18N from "i18n";
import { getItemInWantList } from "./utils";

const WantEditor = ({
  objectToWant,
  type = "item",
  wantGroup,
  afterAnyChange,
  isOwner,
  min,
  wantList,
  canEditWants,
}) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);
  const [modalIsItemInOtherGroup, setModalIsItemInOtherGroup] = useState(false);
  const [isItemInOtherGroup, setIsItemInOtherGroup] = useState(null);

  const toggleModal = () => {
    setModalWantOpen((v) => !v);
  };
  const toggleModalIsItemInOtherGroup = () => {
    setModalIsItemInOtherGroup((v) => !v);
  };

  useEffect(() => {
    if (!wantGroup && type === "item" && objectToWant && wantList) {
      const isItemInWantList = getItemInWantList(objectToWant, wantList);

      if (isItemInWantList.inGroup) {
        setIsItemInOtherGroup(isItemInWantList);
      }
    }
  }, [objectToWant, wantGroup, type, wantList]);

  return (
    <>
      <WantButton
        wantGroup={wantGroup}
        objectToWant={objectToWant}
        afterAnyChange={afterAnyChange}
        type={type}
        isOwner={isOwner}
        min={min}
        canEditWants={canEditWants}
        isItemInOtherGroup={isItemInOtherGroup}
        onClick={() => {
          if (isItemInOtherGroup && isItemInOtherGroup.inGroup) {
            setModalIsItemInOtherGroup(true);
          } else {
            setModalWantOpen(true);
          }
        }}
      />

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
                <I18N
                  id={`wantEditor.IsItemInOther.${isItemInOtherGroup.inGroup.type}`}
                  values={[isItemInOtherGroup.inGroup.name]}
                />
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
                  setModalIsItemInOtherGroup(false);
                  setModalWantOpen(true);
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
