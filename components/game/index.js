import { useId, useState, useEffect } from "react";
import CardComp from "components/cardComp";
import UserBox from "components/userBox";
import Icon from "components/icon";
import { Col, Row, DropdownItem, UncontrolledTooltip } from "reactstrap";
import classNames from "classnames";
import Thumbnail from "components/thumbnail";
import BggGameBox from "components/bggGameBox";
import ElementBox from "components/elementBox";
import Pill from "components/pillData";
import { dependencyToData } from "utils";
import I18N, { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

const Game = ({ game, wanted, btnRowListGame }) => {
  const id = useId("a").replace(twoPointsReg, "");

  const [stats, setStats] = useState({
    rate: 1,
    rateClass: 1,
    rateVotes: 1,
    weight: 1,
    weightVotes: 1,
  });
  const [dataDependency, setDataDependency] = useState({
    most: getI18Ntext("NoData"),
    list: [],
  });

  useEffect(() => {
    if (game) {
      setStats({
        rate: Math.round(game.rate * 10) / 10,
        rateClass: Math.floor(game.rate),
        rateVotes: parseInt(game.rate_votes, 10),
        weight: Math.round(game.weight * 100) / 100,
        weightVotes: parseInt(game.weight_votes, 10),
      });
      setDataDependency(
        dependencyToData({
          value: game.dependency,
          votes: game.dependency_votes,
        })
      );
    }
  }, [game]);

  return (
    <div className={classNames("game-container", { wanted })}>
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
        </div>
      </div>
    </div>
  );
};

export default Game;
