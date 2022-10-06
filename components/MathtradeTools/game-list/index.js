import { useState, useEffect } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Modal, ModalBody, Button } from "reactstrap";
import WantEditor from "../wantEditor";
import GameExtense from "components/gameExtense";

const MathtradeTools_GameList = ({ game, wantInfo, afterAnyChange }) => {
  if (!game) {
    return null;
  }

  const [modalWantOpen, setModalWantOpen] = useState(false);

  const [noItems, setNoItems] = useState(true);

  // For Game
  const [itemsInGameToWant, setItemsInGameToWant] = useState([]);

  useEffect(() => {
    const newList = [];

    game?.items.forEach((itm) => {
      if (!itm.owner) {
        newList.push(itm.id);
      }
    });
    setItemsInGameToWant(newList);
    setNoItems(newList.length === 0);
  }, [game]);

  return (
    <>
      <div className={classNames("mathtrade-tools")}>
        <Row className="g-0 align-items-center">
          <Col xs="auto" className="pe-2">
            {noItems ? (
              <div className="small mt_tools_owner-banner">
                Sin opción de items
              </div>
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
                      {`por ${wantInfo.length} game${
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
            <Valuation
              items={game?.items || []}
              afterAnyChange={afterAnyChange}
            />
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
              objToWant={
                <GameExtense
                  game={game}
                  itemsInGameToWant={itemsInGameToWant}
                  setItemsInGameToWant={setItemsInGameToWant}
                  inModal
                />
              }
              game={game}
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

export default MathtradeTools_GameList;
