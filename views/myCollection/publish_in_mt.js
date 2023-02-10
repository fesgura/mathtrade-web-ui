import { useState } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import Valuation from "components/valuation";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import { useApi, MathTradeService } from "api_serv";
import I18N from "i18n";

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
      <div className={classNames("mathtrade-tools")}>
        {!itemMathTradeData ? (
          <Button
            color="primary"
            size="xs"
            onClick={() => {
              if (!loadingPublishItem) {
                publishItem({
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
                  <I18N id="myCollection.publishing" />
                ) : (
                  <I18N id="myCollection.publishInMathTrade" />
                )}
              </Col>
            </Row>
          </Button>
        ) : (
          <Row className="g-0 align-items-center">
            <Col xs="auto" className="pe-2">
              {" "}
              <Button
                color="primary"
                size="xs"
                style={{ boxShadow: "0 0 3px 1px #FFF" }}
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
                    {loadingPublishItem ? (
                      <I18N id="myCollection.quittingFromMathtrade" />
                    ) : (
                      <I18N id="myCollection.quitFromMathTrade" />
                    )}
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
