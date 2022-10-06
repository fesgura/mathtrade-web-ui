import { useState } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import WantEditor from "../wantEditor";
import ItemExtense from "components/itemExtense";

const MathtradeTools_ItemList = ({ item, wantInfo, afterAnyChange }) => {
  if (!item) {
    return null;
  }

  const [modalWantOpen, setModalWantOpen] = useState(false);

  return (
    <>
      <div className={classNames("mathtrade-tools")}>
        <Row className="g-0 align-items-center">
          <Col xs="auto" className="pe-2">
            {item?.owner ? (
              <div className="small mt_tools_owner-banner">Item propio</div>
            ) : (
              <Button
                color="primary"
                size="sm"
                onClick={() => {
                  setModalWantOpen(true);
                }}
              >
                {wantInfo ? (
                  <>
                    En mi Want List
                    <br />
                    <span className="small">
                      (
                      {`por ${wantInfo.length} item${
                        wantInfo.length > 1 ? "s" : ""
                      }`}
                      )
                    </span>
                  </>
                ) : (
                  "¡Lo quiero!"
                )}
              </Button>
            )}
          </Col>
          <Col xs="auto">
            <Valuation items={[item]} afterAnyChange={afterAnyChange} />
          </Col>
        </Row>
      </div>
      <Modal
        isOpen={modalWantOpen}
        toggle={() => {
          setModalWantOpen((v) => !v);
        }}
        centered
        size="lg"
      >
        <ModalBody>
          {modalWantOpen ? (
            <WantEditor
              objToWant={<ItemExtense item={item} inModal />}
              item={item}
              afterAnyChange={afterAnyChange}
              setModalWantOpen={setModalWantOpen}
              wantInfo={wantInfo}
            />
          ) : null}
        </ModalBody>
      </Modal>
    </>
  );
};

export default MathtradeTools_ItemList;
