import { useState, useEffect } from "react";
import { Card, Row, Col } from "reactstrap";
import classNames from "classnames";
import Picture from "components/picture";
import BGGgameInfo from "components/bgg-gameinfo";
import DependencyBadge from "components/dependencyBadge";
import ItemGame from "./item";
import MT_ToolGame_GameMT from "./mt_tools/game_mt";

const Game = ({ game, wanted }) => {
  const [itemsSelected, setItemsSelected] = useState([]);

  useEffect(() => {
    if (game && game.items && game.items.length) {
      const newItemsSelected = game.items.map((item) => {
        return item.id;
      });
      setItemsSelected(newItemsSelected);
    }
  }, [game]);

  //console.log(game);

  return (
    <div className={classNames("game mb-4", { wanted, owner: game?.owner })}>
      <Row className="align-items-stretch g-0">
        <Col>
          <Card>
            <Row className="g-0 align-items-stretch">
              <Col sm={"auto"}>
                <div className="game-thumbnail-container">
                  <div
                    className="game-thumbnail-bg"
                    style={{ backgroundImage: `url("${game?.thumbnail}")` }}
                  />
                  <Picture src={game?.thumbnail} />
                </div>
              </Col>
              <Col>
                <div className="game-data-container">
                  <div className="game-data-header">
                    <Row className="align-items-center">
                      <Col xs="auto">
                        <div className="game-title">
                          {game?.name}
                          {/* {element.type === typeOfElements["expansion"] ? (
                        <Badge
                          color="expansion"
                          className="element-title-badge"
                        >
                          Expansión
                        </Badge>
                      ) : null} */}
                        </div>
                      </Col>
                      <Col xs="auto">
                        <BGGgameInfo element={game} />
                      </Col>
                      <Col>
                        <div className="game-data-dependency">
                          <b>Dependencia de idioma (BGG):</b>
                          <DependencyBadge element={game} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className="game-data-body">
                    {game && game.items && game.items.length ? (
                      <div className="game-data-itemlist">
                        {game.items.map((item, k) => {
                          return (
                            <ItemGame
                              key={k}
                              item={item}
                              bggId={game?.bgg_id}
                              itemsSelected={itemsSelected}
                              setItemsSelected={setItemsSelected}
                            />
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs="auto">
          <MT_ToolGame_GameMT
            game={game}
            // afterAnyChange={afterAnyChange}
            // wantInfo={wantInfo}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Game;
