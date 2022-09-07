import { useId } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import BggLink from "./bgg_link";

const twoPointsReg = new RegExp(":", "g");

const BGGgameInfo = ({ element }) => {
  const id = useId("a").replace(twoPointsReg, "");

  const stats = {
    rate: Math.round(element.rate * 10) / 10,
    rateClass: Math.floor(element.rate),
    rateVotes: parseInt(element.rate_votes, 10),
    weight: Math.round(element.weight * 100) / 100,
    weightVotes: parseInt(element.weight_votes, 10),
  };

  return (
    <div className="bgg-game-info">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <div className="bgg-game-info_rating">
            <div
              className={`bgg-game-info_rating-num bgg-rating-${stats.rateClass}`}
              id={`bgg-rank-${id}`}
            >
              {stats.rate}
            </div>
            <UncontrolledTooltip target={`bgg-rank-${id}`}>
              <div className="bgg-game-info_tooltip">
                <b>Rating BGG</b>
                <br />
                {stats.rateVotes} ratings
              </div>
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xs="auto">
          <div
            className="bgg-game-info_rating-dificultad"
            id={`bgg-dificultad-${id}`}
          >
            <div className="bgg-game-info_rating-dificultad-num">
              <b>{stats.weight}</b>/5
            </div>
            <div className="bgg-game-info_rating-dificultad-label">
              Dificultad
            </div>
          </div>
          <UncontrolledTooltip target={`bgg-dificultad-${id}`}>
            <div className="bgg-game-info_tooltip">
              <b>Dificultad</b>
              <br />
              {stats.weightVotes} votos
            </div>
          </UncontrolledTooltip>
        </Col>
        <Col xs="auto">
          <BggLink bgg_id={element?.bgg_id} />
        </Col>
      </Row>
    </div>
  );
};

export default BGGgameInfo;
