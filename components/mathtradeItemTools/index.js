import Icon from "components/icon";
import Valuation from "components/valuation";
import { useState, useEffect } from "react";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";
import classNames from "classnames";

const MathTradeItemTools = ({ item, itemMathTradeData, afterAnyChange }) => {
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
      <div
        className={classNames("mathtrade-item-tools", {
          "published-item": itemMathTradeData,
        })}
      >
        {!itemMathTradeData ? (
          <div className="mathtrade-item-tools_add">
            <Row className="justify-content-end">
              <Col xs="auto">
                <div
                  className={classNames(
                    "mathtrade-item-tools_btn btn-publish",
                    {
                      error: errorPublishItem,
                    }
                  )}
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
                  <Icon
                    type={loadingPublishItem ? "loading" : "plus"}
                    className="me-1"
                  />
                  {loadingPublishItem
                    ? "Publicando"
                    : `PUBLICAR en el Math Trade ${"Octubre 2022"}${
                        errorPublishItem ? " (ERRROR)" : ""
                      }`}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="mathtrade-item-tools_edit">
            <Row className="justify-content-between align-items-center">
              <Col xs="auto">
                <div
                  className={classNames(
                    "mathtrade-item-tools_btn btn-unpublish",
                    {
                      error: errorUnpublishItem,
                    }
                  )}
                  onClick={() => {
                    if (!loadingUnpublishItem) {
                      setModalDeleteOpen(true);
                    }
                  }}
                >
                  {loadingUnpublishItem
                    ? "Quitando"
                    : `PUBLICADO el Math Trade ${"Octubre 2022"}  (Quitar) ${
                        errorUnpublishItem ? " (ERRROR)" : ""
                      }`}
                </div>
              </Col>
              <Col xs="auto">
                <Valuation
                  item={itemMathTradeData}
                  afterAnyChange={afterAnyChange}
                />
              </Col>
            </Row>
          </div>
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

export default MathTradeItemTools;
