import { useState } from "react";
import Icon from "components/icon";
import { Modal, ModalBody, Button } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import I18N from "i18n";
import BtnCircle from "components/btnCircle";

const PublishInMT = ({ item, itemMathTradeData, afterAnyChange }) => {
  if (!item) {
    return null;
  }

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [publishItem, , loadingPublishItem] = useApi({
    promise: MathTradeService.publishItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  const [unpublishItem, , loadingUnpublishItem] = useApi({
    promise: MathTradeService.unpublishItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  return (
    <>
      <BtnCircle
        className={!itemMathTradeData ? "btn-publish-mt" : "btn-unpublish-mt"}
        label={
          !itemMathTradeData
            ? "myCollection.publishInMathTrade"
            : "myCollection.quitFromMathTrade"
        }
        onClick={() => {
          if (!itemMathTradeData) {
            if (!loadingPublishItem) {
              publishItem({
                data: {
                  item_id: item.id,
                },
              });
            }
          } else {
            if (!loadingUnpublishItem) {
              setModalDeleteOpen(true);
            }
          }
        }}
      >
        {!itemMathTradeData ? (
          <Icon type={loadingPublishItem ? "loading" : "addToMT"} />
        ) : (
          <Icon type={loadingPublishItem ? "loading" : "quitFromMT"} />
        )}
      </BtnCircle>
      <Modal
        isOpen={modalDeleteOpen}
        toggle={() => {
          setModalDeleteOpen((v) => !v);
        }}
        centered
      >
        <ModalBody className="text-center">
          <h5 className="mb-4">
            <I18N id="myCollection.modal.quitFromMathTrade" />
          </h5>
          <div>
            <Button
              color="link"
              tag="a"
              className="me-1"
              outline
              onClick={() => {
                setModalDeleteOpen(false);
              }}
            >
              <I18N id="btn.Cancel" />
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setModalDeleteOpen(false);
                unpublishItem({
                  itemId: item.id,
                });
              }}
            >
              <I18N id="btn.YesQuit" />
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PublishInMT;
