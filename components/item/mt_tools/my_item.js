import Icon from "components/icon";
import Valuation from "components/valuation";
import { useState } from "react";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

const MT_ToolItem_MyItem = ({ item, itemMathTradeData, afterAnyChange }) => {
  if (!item) {
    return null;
  }

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const [publishItem, , loadingPublishItem, errorPublishItem] = useApi({
    promise: MathTradeService.publishItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });
  const [unpublishItem, , loadingUnpublishItem, errorUnpublishItem] = useApi({
    promise: MathTradeService.unpublishItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  return (
    <div className="mt_tools">
      {!itemMathTradeData ? (
        <div className="mt_tools-container">
          <Button
            color="primary"
            size="xs"
            onClick={() => {
              if (!loadingPublishItem) {
                const mathtradeStored = getMathtradeStored();
                const mathTradeId = mathtradeStored.data.id;
                publishItem({
                  mathTradeId,
                  data: {
                    item_id: item.id,
                  },
                });
              }
            }}
          >
            <Row className="align-items-center g-0 text-start">
              <Col xs="auto">
                <Icon
                  type={loadingPublishItem ? "loading" : "plus"}
                  className="me-2"
                />
              </Col>
              <Col>
                {loadingPublishItem ? (
                  <>Publicando...</>
                ) : (
                  <>
                    PUBLICAR
                    <br />
                    en el Math Trade
                  </>
                )}
              </Col>
            </Row>
          </Button>
        </div>
      ) : (
        <>
          <div className="mt_tools-title">En el Math Trade</div>
          <div className="mt_tools-container">
            <Valuation
              items={[itemMathTradeData]}
              afterAnyChange={afterAnyChange}
              className="mb-3"
            />
            <Button
              color="primary"
              size="xs"
              outline
              onClick={() => {
                if (!loadingUnpublishItem) {
                  setModalDeleteOpen(true);
                }
              }}
            >
              <Row className="align-items-center g-0 text-start">
                <Col xs="auto">
                  <Icon
                    type={loadingPublishItem ? "loading" : "minus"}
                    className="me-2"
                  />
                </Col>
                <Col>
                  {loadingPublishItem ? (
                    <>Quitando...</>
                  ) : (
                    <>
                      Quitar
                      <br />
                      del Math Trade
                    </>
                  )}
                </Col>
              </Row>
            </Button>
          </div>
        </>
      )}
      <Modal
        isOpen={modalDeleteOpen}
        toggle={() => {
          setModalDeleteOpen((v) => !v);
        }}
        centered
      >
        <ModalBody className="text-center">
          <h5 className="mb-4">¿Quitar este item del Math Trade?</h5>
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
              Cancelar
            </Button>
            <Button
              color="danger"
              onClick={() => {
                setModalDeleteOpen(false);

                const mathtradeStored = getMathtradeStored();
                const mathTradeId = mathtradeStored.data.id;
                unpublishItem({
                  mathTradeId,
                  itemId: item.id,
                });
              }}
            >
              Sí, quitar
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default MT_ToolItem_MyItem;
