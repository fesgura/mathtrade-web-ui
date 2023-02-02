import { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import WantButton from "./wantButton";
import EditorWants from "./editor";

const WantEditor = ({
  objectToWant,
  type = "item",
  wantGroup,
  afterAnyChange,
  isOwner,
}) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);

  const toggleModal = () => {
    setModalWantOpen((v) => !v);
  };

  return (
    <>
      <WantButton
        wantGroup={wantGroup}
        objectToWant={objectToWant}
        afterAnyChange={afterAnyChange}
        type={type}
        isOwner={isOwner}
        onClick={() => {
          setModalWantOpen(true);
        }}
      />

      {modalWantOpen && !isOwner ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="lg">
          <div className="text-center pt-4">
            <h3 className="m-0">
              {wantGroup ? "Editar Want" : "Agregar a Mis Wants"}
            </h3>
          </div>

          <ModalBody>
            <EditorWants
              objectToWant={objectToWant}
              type={type}
              wantGroup={wantGroup}
              afterAnyChange={afterAnyChange}
              toggleModal={toggleModal}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default WantEditor;
