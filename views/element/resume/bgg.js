import { useId, useState, useEffect, useRef } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import classNames from "classnames";

const twoPointsReg = new RegExp(":", "g");

const BGGinfoElement = ({ element }) => {
  const id = useId("a").replace(twoPointsReg, "");

  const stats = {
    rate: Math.round(element.rate * 10) / 10,
    rateClass: Math.floor(element.rate),
    rateVotes: parseInt(element.rate_votes, 10),
    weight: Math.round(element.weight * 100) / 100,
    weightVotes: parseInt(element.weight_votes, 10),
  };

  return (
    <div className="bgg-info-element">
      <Row className="align-items-center g-0">
        <Col xs="auto">
          <div className="bgg-info-element_rating">
            <div
              className={`bgg-info-element_rating-num bgg-rating-${stats.rateClass}`}
              id={`bgg-rank-${id}`}
            >
              {stats.rate}
            </div>
            <UncontrolledTooltip target={`bgg-rank-${id}`}>
              <div className="bgg-info-element_tooltip">
                <b>Rating BGG</b>
                <br />
                {stats.rateVotes} ratings
              </div>
            </UncontrolledTooltip>
          </div>
        </Col>
        <Col xs="auto">
          <div
            className="bgg-info-element_rating-dificultad"
            id={`bgg-dificultad-${id}`}
          >
            <div className="bgg-info-element_rating-dificultad-num">
              <b>{stats.weight}</b>/5
            </div>
            <div className="bgg-info-element_rating-dificultad-label">
              Dificultad
            </div>
          </div>
          <UncontrolledTooltip target={`bgg-dificultad-${id}`}>
            <div className="bgg-info-element_tooltip">
              <b>Dificultad</b>
              <br />
              {stats.weightVotes} votos
            </div>
          </UncontrolledTooltip>
        </Col>
        <Col xs="auto">
          <a
            href={`https://boardgamegeek.com/boardgame/${element?.bgg_id}/`}
            target="_blank"
            className="bgg-link"
            id={`bgg-link-${id}`}
          >
            BGG <Icon type="external-link" />
          </a>
          <UncontrolledTooltip target={`bgg-link-${id}`}>
            <div className="bgg-info-element_tooltip">
              Abrir página en la BGG
            </div>
          </UncontrolledTooltip>
        </Col>
      </Row>
    </div>
  );
};

export default BGGinfoElement;
