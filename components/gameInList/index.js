import { useState, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import classNames from "classnames";
import Picture from "components/picture";
import BGGgameInfo from "components/bgg-gameinfo";
import DependencyBadge from "components/dependencyBadge";
import ItemGame from "./item";
import MT_ToolGame_GameMT from "./mt_tools/game_mt";
import GameExtended from "./gameExtended";
import GameQuad from "./gameQuad";

const Game = ({ viewType, game, wanted }) => {
  return viewType === 0 ? (
    <Col xs={4}>
      <GameQuad game={game} wanted={wanted} showTools />
    </Col>
  ) : (
    <Col xs={12}>
      <GameExtended game={game} wanted={wanted} showTools />
    </Col>
  );
};
export default Game;
