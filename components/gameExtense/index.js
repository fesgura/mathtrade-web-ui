import { useId, useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Icon from "components/icon";
import { Col, Row } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";
import ItemMinimal from "components/itemMinimal";
import Checkbox from "components/checkbox";
const GameExtense = ({
  game,
  wanted,
  rightHeader,
  leftHeader,
  footer,
  inModal,
  itemsInGameToWant,
  setItemsInGameToWant,
}) => {
  const [itemsSelectAll, setItemsSelectAll] = useState(false);

  useEffect(() => {
    const length = game.items.filter((itm) => {
      return !itm.owner;
    }).length;

    if (length) {
      setItemsSelectAll(length === itemsInGameToWant.length);
    }
  }, [game, itemsInGameToWant]);

  return (
    <div className="game-extense">
      <CardComp
        title={game?.name}
        rightHeader={rightHeader}
        leftHeader={leftHeader}
        footer={footer}
        high={wanted}
        inModal={inModal}
      >
        <div className={classNames("game-extense_content")}>
          <Row className="g-0">
            <Col xs="auto">
              <Thumbnail src={game?.thumbnail || ""} />
            </Col>
            <Col className="ps-3">
              <BggGameBox element={game} />
              <div className="min-list-items">
                <div className="min-list-items_header">
                  <Row className="align-items-center g-0">
                    <Col xs="auto" className="pe-2">
                      <Checkbox
                        value={itemsSelectAll}
                        onClick={() => {
                          let newList = [];
                          if (!itemsSelectAll) {
                            game?.items.forEach((itm) => {
                              if (!itm.owner) {
                                newList.push(itm.id);
                              }
                            });
                          }
                          setItemsInGameToWant(newList);
                        }}
                      />
                    </Col>
                    <Col className="ps-2">
                      <b>Quiero 1 de estos items:</b>
                    </Col>
                  </Row>
                </div>

                {game?.items.map((itm, k) => {
                  const { id, owner } = itm;
                  const index = itemsInGameToWant.indexOf(id);
                  return (
                    <div
                      className={classNames("min-item bordered", {
                        selected: index >= 0,
                      })}
                      key={id}
                    >
                      <Row className="align-items-center g-0">
                        <Col xs="auto">
                          <Checkbox
                            value={index >= 0}
                            onClick={() => {
                              let currentListCopy = [...itemsInGameToWant];
                              if (index >= 0) {
                                currentListCopy.splice(index, 1);
                              } else {
                                currentListCopy = currentListCopy.concat([id]);
                              }

                              setItemsInGameToWant(currentListCopy);
                            }}
                            disabled={owner}
                          />
                        </Col>
                        <Col className="ps-3 pe-1">
                          <ItemMinimal item={itm} disabled={owner} />
                        </Col>
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </div>
      </CardComp>
    </div>
  );
};
export default GameExtense;
