import { useState } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import Valuation from "components/valuation";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

const MathtradeTools_MyItems = ({
  item,
  itemMathTradeData,
  afterAnyChange,
}) => {
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
    <>
      <div className={classNames("mathtrade-tools")}>
        {!itemMathTradeData ? (
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
                {loadingPublishItem ? "Publicando..." : "PUBLICAR en el MT"}
              </Col>
            </Row>
          </Button>
        ) : (
          <Row className="g-0 align-items-center">
            <Col xs="auto" className="pe-2">
              {" "}
              <Button
                color="white"
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
                  <Col xs="auto">
                    {loadingPublishItem ? "Quitando..." : "Quitar del MT"}
                  </Col>
                </Row>
              </Button>
            </Col>
            <Col xs="auto">
              <Valuation
                items={[itemMathTradeData]}
                afterAnyChange={afterAnyChange}
              />
            </Col>
          </Row>
        )}
      </div>
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
    </>
  );
};

export default MathtradeTools_MyItems;
