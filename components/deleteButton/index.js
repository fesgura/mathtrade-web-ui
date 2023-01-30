import { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Icon from "components/icon";

const DeleteButton = ({
  text = "Eliminar",
  size = "sm",
  className,
  itemName,
  onDelete = () => {},
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((v) => !v);
  };

  return (
    <>
      <Button
        size={size}
        className={className}
        color="danger"
        outline
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Icon type="trash" className="me-1" /> {text}
      </Button>

      {modalOpen ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="md">
          <ModalBody className="text-center p-4">
            <h3 className="mb-4 bold">{`¿Eliminar${
              itemName ? " " + itemName : ""
            }?`}</h3>
            <div>
              <Button
                color="link"
                // tag="a"
                className="me-2 mb-sm-0 mb-2"
                outline
                onClick={(e) => {
                  setModalOpen(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  setModalOpen(false);
                  onDelete();
                }}
              >
                Eliminar
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default DeleteButton;
