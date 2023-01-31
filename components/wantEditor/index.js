import { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import storage from "utils/storage";
import WantButton from "./wantButton";
import EditorWants from "./editor";

const WantEditor = ({
  objectToWant,
  type = "item",
  wantGroup,
  afterAnyChange,
}) => {
  const [modalWantOpen, setModalWantOpen] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const toggleModal = () => {
    setModalWantOpen((v) => !v);
  };

  useEffect(() => {
    if (type === "item") {
      const user = storage.getFromStore("user");
      setIsOwner(user?.id === objectToWant?.user?.id);
    }
  }, [objectToWant, type]);

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
