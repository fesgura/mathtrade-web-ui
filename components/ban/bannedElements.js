import Icon from "components/icon";
import I18N from "i18n";
import { Button, Modal, ModalBody } from "reactstrap";
import { useState, useCallback } from "react";
import BannedList from "./bannedList";

const BannedElements = ({ afterAnyChange }) => {
  const [modalOpen, setModalOpen] = useState();
  const [withChanges, setWithChanges] = useState(false);

  const onCloseModal = useCallback(() => {
    setModalOpen(false);
    if (withChanges) {
      afterAnyChange();
    }
  }, [withChanges]);

  return (
    <>
      <div
        className="banned-elements-btn"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Icon type="ban" className="ic-ban" />
        <I18N id="ban.linkToOpen" />
        <Icon type="external-link" className="ic-link" />
      </div>

      {modalOpen ? (
        <Modal isOpen={true} toggle={onCloseModal} centered size="xl">
          <div className="text-center py-3 border-bottom mb-4">
            <h3 className="m-0">
              <I18N id="ban.Title" />
            </h3>
          </div>
          <ModalBody>
            <BannedList
              onCloseModal={onCloseModal}
              setWithChanges={setWithChanges}
            />
          </ModalBody>
        </Modal>
      ) : null}
    </>
  );
};

export default BannedElements;
