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

const GameQuadCard = ({
  game,
  wanted,
  rightHeader,
  leftHeader,
  footer,
  inModal,
}) => {
  return (
    <Col md={4}>
      <div className="game-quad-card">
        <CardComp
          title={game?.name}
          rightHeader={rightHeader}
          leftHeader={leftHeader}
          footer={footer}
          high={wanted}
          inModal={inModal}
        >
          <Thumbnail src={game?.thumbnail || ""} className="mb-2" />
          <BggGameBox element={game} />
        </CardComp>
      </div>
    </Col>
  );
};
export default GameQuadCard;
