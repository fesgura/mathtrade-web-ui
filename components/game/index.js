import { useId, useState, useEffect } from "react";
import { Col, Row, DropdownItem, UncontrolledTooltip } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import Pill from "components/pillData";
import { getStatsOfElement } from "utils";
import I18N, { getI18Ntext } from "i18n";
import BanButton from "components/ban/banButton";

const twoPointsReg = new RegExp(":", "g");

const Game = ({
  game,
  wanted,
  inModal,
  noBan,
  btnRowListGame,
  afterAnyChange,
}) => {
  console.log("game", game);
  const id = useId("a").replace(twoPointsReg, "");

  const [stats, setStats] = useState(getStatsOfElement(null).stats);
  const [dataDependency, setDataDependency] = useState(
    getStatsOfElement(null).dataDependency
  );

  const [type, setType] = useState(1);

  useEffect(() => {
    if (game) {
      const o = getStatsOfElement(game);
      setStats(o.stats);
      setDataDependency(o.dataDependency);

      let newType = 1;

      game.items[0].elements.forEach((elem) => {
        if (game.bgg_id === elem.bgg_id) {
          newType = elem.type;
        }
      });

      setType(newType);
    }
  }, [game]);

  return (
    <div className={classNames("game-container", { wanted, inModal })}>
      <div className="game">
        <div className="game_thumbnail">
          <Thumbnail src={game?.thumbnail || ""} />
        </div>
        <div className="game_data">
          <div className="game_title">
            <a
              href={`https://boardgamegeek.com/boardgame/${game?.bgg_id}/`}
              target="_blank"
              id={`bgg-game-link-${id}`}
            >
              {game?.name}
            </a>
            <UncontrolledTooltip target={`bgg-game-link-${id}`}>
              <div className="bgg-game-info_tooltip">
                <I18N id="element.BGG.OpenGameInBGG" />
              </div>
            </UncontrolledTooltip>
            <div>
              <div className={classNames("element-type-badge", `b-${type}`)}>
                <I18N id={`element-type-badge-${type}`} />
              </div>
            </div>
          </div>
          <div className="game_pills">
            <Row className="justify-content-center">
              <Col xs="auto">
                <Pill
                  label="element.BGG.rating"
                  text={
                    <b
                      className={`bgg-rating-num bgg-rating-num-${stats.rateClass}`}
                    >
                      {stats.rate}
                    </b>
                  }
                  question={`${stats.rateVotes} ${getI18Ntext(
                    "element.BGG.votes"
                  )}`}
                  noTranslateQuestion
                />
              </Col>
              <Col xs="auto">
                <Pill
                  label="element.BGG.weight"
                  text={
                    <>
                      <b>{stats.weight}</b>/5
                    </>
                  }
                  question={`${stats.weightVotes} ${getI18Ntext(
                    "element.BGG.votes"
                  )}`}
                  noTranslateQuestion
                />
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col xs="auto">
                <Pill
                  label="element.BGG.dependency"
                  text={<b>{dataDependency.most}</b>}
                  question={
                    <>
                      {dataDependency.list.map((dep, k) => {
                        return (
                          <DropdownItem text key={k}>
                            <div className="bgg-game-box_dependency_list-item">
                              <Row className="align-items-center">
                                <Col>{dep.text}</Col>
                                <Col xs="auto">
                                  <b>{`(${dep.value} ${getI18Ntext(
                                    "element.BGG.vote"
                                  )}${dep.value === 1 ? "" : "s"})`}</b>
                                </Col>
                              </Row>
                            </div>
                          </DropdownItem>
                        );
                      })}
                    </>
                  }
                  noTranslateQuestion
                  dropdown
                />
              </Col>
            </Row>
          </div>
          {btnRowListGame && btnRowListGame.length ? (
            <div className="game_btn-list">
              {btnRowListGame.map((btnFunc, k) => {
                return btnFunc(k);
              })}
            </div>
          ) : null}
          {noBan ? null : (
            <BanButton
              label="ban.Game"
              element={game}
              type="game"
              afterAnyChange={afterAnyChange}
              className="for-game"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
