import { useState, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import classNames from "classnames";
import Picture from "components/picture";
import BGGgameInfo from "components/bgg-gameinfo";
import DependencyBadge from "components/dependencyBadge";
import ItemGame from "./item";
import MT_ToolGame_GameMT from "./mt_tools/game_mt";

const GameQuad = ({ game, wanted, showTools }) => {
  return (
    <div className={classNames("game-quad", { wanted })}>
      <Card>
        <div className="game-thumbnail-container">
          <div
            className="game-thumbnail-bg"
            style={{ backgroundImage: `url("${game?.thumbnail}")` }}
          />
          <Picture src={game?.thumbnail} />
        </div>
        <div className="game-quad-content">
          <div className="game-title">{game?.name}</div>
          <div className="game-data-bgg">
            <BGGgameInfo element={game} centered />
          </div>

          <div className="game-data-dependency">
            <b>Dependencia de idioma (BGG):</b>
            <DependencyBadge element={game} />
          </div>
        </div>

        {showTools ? (
          <div>
            <MT_ToolGame_GameMT
              game={game}
              style={{ borderRadius: 0, textAlign: "center" }}
            />
          </div>
        ) : null}
      </Card>
    </div>
  );
};

export default GameQuad;
