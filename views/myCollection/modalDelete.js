import { Button, Modal, ModalBody } from "reactstrap";
import I18N from "i18n";
import { useApi, ElementService, myCollectionService } from "api_serv";
import { LoadingBox } from "components/loading";

const ModalDeleteItem = ({ objToDelete, onClose, afterAnyChange }) => {
  // DELETE ELEMENT
  const [deleteElement, , loadingDeleteElement, errorDeleteMessage] = useApi({
    promise: ElementService.delete,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End DELETE ELEMENT

  // DELETE ITEM
  const [deleteItem, , loadingDeleteItem, errorDeleteItemMessage] = useApi({
    promise: myCollectionService.deleteItem,
    afterLoad: () => {
      onClose();
      afterAnyChange();
    },
  });
  // End DELETE ELEMENT

  return objToDelete ? (
    <Modal isOpen={true} toggle={onClose} centered size="lg">
      <ModalBody>
        <div className="text-center relative py-4">
          {loadingDeleteElement || loadingDeleteItem ? <LoadingBox /> : null}
          <h3 className="mb-4">
            <I18N id="Delete" /> "{objToDelete.element.name}"?
          </h3>
          <div className="text-center">
            <Button
              color="link"
              tag="a"
              className="me-2 mb-sm-0 mb-2"
              outline
              onClick={onClose}
            >
              <I18N id="btn.Cancel" />
            </Button>
            <Button
              color="danger"
              onClick={() => {
                if (objToDelete.item.elements.length === 1) {
                  deleteItem(objToDelete.item.id);
                } else {
                  deleteElement(objToDelete.element.id);
                }
              }}
            >
              <I18N id="btn.Delete" />
            </Button>
          </div>
        </div>
      </ModalBody>
    </Modal>
  ) : null;
};

export default ModalDeleteItem;
