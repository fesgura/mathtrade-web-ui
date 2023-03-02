import { useId, useState } from "react";
import BtnCircle from "components/btnCircle";
import { Button, Modal, ModalBody } from "reactstrap";
import Icon from "components/icon";
import I18N from "i18n";

const twoPointsReg = new RegExp(":", "g");

const BtnDelete = ({ onDelete }) => {
  const id = useId("grid-btn-menu").replace(twoPointsReg, "");

  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen((v) => !v);
  };
  return (
    <>
      <BtnCircle
        className="btn btn_circle mywants-grid_btn-menu-group for-delete"
        onClick={() => {
          setModalOpen(true);
        }}
        label="btn.Delete"
      >
        <Icon />
      </BtnCircle>

      {modalOpen ? (
        <Modal isOpen={true} toggle={toggleModal} centered size="md">
          <ModalBody className="text-center p-4">
            <h3 className="mb-4 bold">
              <I18N id="MyWants.Grid.DeleteGroupQuestion" />
            </h3>
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
                <I18N id="btn.Cancel" />
              </Button>
              <Button
                color="danger"
                type="submit"
                onClick={() => {
                  setModalOpen(false);
                  onDelete();
                }}
              >
                <I18N id="btn.Delete" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};
export default BtnDelete;
