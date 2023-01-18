import { useId, useState, useEffect } from "react";
import { UncontrolledTooltip } from "reactstrap";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Icon from "components/icon";
import { Col, Row } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";
import ElementBox from "components/elementBox";

const GameQuadCard = ({ game, wanted, rightHeader, footer, inModal }) => {
  return (
    <Col xs={12}>
      <div className="game-quad-card">
        <CardComp
          // title={game?.name}
          // rightHeader={rightHeader}
          // leftHeader={leftHeader}
          noHeader
          high={wanted}
          inModal={inModal}
          variant="variant-1"
        >
          <div className="game-quad-card_content">
            <Row>
              <Col xs={3}>
                <Thumbnail src={game?.thumbnail || ""} className="mb-2" />
              </Col>
              <Col>
                <div className="game-quad-card_content_row-1">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="game-quad-card_title">{game?.name}</h3>
                    </Col>
                    {rightHeader ? <Col xs={"auto"}>{rightHeader}</Col> : null}
                  </Row>
                </div>
                <div className="game-quad-card_content_row-2">
                  <BggGameBox element={game} />
                </div>
                <div className="game-quad-card_content_row-3">{footer}</div>
              </Col>
            </Row>
          </div>
        </CardComp>
      </div>
    </Col>
  );
};
export default GameQuadCard;
