import { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import WantButton from "./wantButton";
import EditorWants from "./editor";

const WantEditor = ({
  objectToWant,
  type = "item",
  wantInfo,
  afterAnyChange,
}) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);

  return (
    <>
      <WantButton
        wantInfo={wantInfo}
        objectToWant={objectToWant}
        afterAnyChange={afterAnyChange}
        type={type}
        onClick={() => {
          setModalWantOpen(true);
        }}
      />

      {modalWantOpen ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setModalWantOpen((v) => !v);
          }}
          centered
          size="lg"
        >
          <ModalHeader>
            <h4 className="text-center bold p-0 m-0">Agregar a Mis Wants</h4>
          </ModalHeader>

          <ModalBody>
            <EditorWants
              objectToWant={objectToWant}
              type={type}
              afterAnyChange={afterAnyChange}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default WantEditor;
