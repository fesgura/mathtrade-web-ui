import { useState, useRef, useEffect } from "react";
import I18N from "i18n";
import Icon from "components/icon";
import { Button, Modal, ModalBody } from "reactstrap";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PDFcredencial from "components/PDFcredencial";

const cuadro_w = 76;

const UserCardSign = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  return user ? (
    <>
      <div className="user-card-sign_container">
        <p>
          {" "}
          <I18N id="UserCardSign.help" />
        </p>
        <Button
          color="primary"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <Icon type="address-card-o" className="me-2" />
          <I18N id="UserCardSign.btn.print_download" />
        </Button>
      </div>

      {showModal ? (
        <Modal
          isOpen={true}
          toggle={() => {
            setShowModal(false);
          }}
          centered
          size="xl"
        >
          <div className="text-center pt-4 pb-3 border-bottom">
            <h3 className="m-0">
              <I18N id="UserCardSign.modal.title" />
            </h3>
          </div>
          <ModalBody>
            <div className="text-center">
              <PDFcredencial user={user} />
            </div>
            <div className="text-center pt-3">
              <Button
                color="link"
                outline
                onClick={() => {
                  setShowModal(false);
                }}
              >
                <I18N id="btn.Accept" />
              </Button>
            </div>
          </ModalBody>
        </Modal>
      ) : null}
    </>
  ) : null;
};

export default UserCardSign;
