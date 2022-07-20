import { useId, useState, useEffect, useRef } from "react";
import { Col, Row, UncontrolledTooltip } from "reactstrap";
import Icon from "components/icon";
import classNames from "classnames";

const twoPointsReg = new RegExp(":", "g");

const BGGinfoElement = ({ element }) => {
  const id = useId("a").replace(twoPointsReg, "");
  return (
    <div className="bgg-info-element">
      <Row className="align-items-center g-0">
        {/* <Col xs="auto">
          <div className="bgg-info-element_rating">
            <div
              className={`bgg-info-element_rating-num bgg-rating-${6}`}
              id={`bgg-rank-${id}`}
            >
              6.7
            </div>
            <UncontrolledTooltip target={`bgg-rank-${id}`}>
              <div className="bgg-info-element_tooltip">
                <b>Rating BGG</b>
                <br />
                535 ratings
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
              <b>1.25</b>/5
            </div>
            <div className="bgg-info-element_rating-dificultad-label">
              Dificultad
            </div>
          </div>
          <UncontrolledTooltip target={`bgg-dificultad-${id}`}>
            <div className="bgg-info-element_tooltip">
              <b>Dificultad</b>
              <br />
              46 votos
            </div>
          </UncontrolledTooltip>
        </Col> */}
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
