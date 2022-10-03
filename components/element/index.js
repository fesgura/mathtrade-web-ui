import { useId, useState, useEffect } from "react";
import { Col, Row, Badge, UncontrolledTooltip } from "reactstrap";
import classNames from "classnames";
import StatusBadge from "components/statusBadge";
import Icon from "components/icon";
import { typeOfElements } from "config";
import DependencyBadge from "components/dependencyBadge";
import BGGgameInfo from "components/bgg-gameinfo";
import Picture from "components/picture";

const twoPointsReg = new RegExp(":", "g");

const Element = ({ element, owner }) => {
  const id = useId("a").replace(twoPointsReg, "");
  return (
    <div className={classNames("element", { owner })}>
      <div className="element-container">
        <Row className="g-0 align-items-stretch">
          <Col sm={"auto"}>
            <div className="element-thumbnail-container">
              <div
                className="element-thumbnail-bg"
                style={{ backgroundImage: `url("${element?.thumbnail}")` }}
              />

              <Picture src={element?.thumbnail} />
            </div>
          </Col>
          <Col>
            <div className="element-data-container">
              <div className="element-data-game">
                <Row className="align-items-center">
                  <Col xs="auto">
                    <div className="element-title">
                      {element.name}{" "}
                      {element.type === typeOfElements["expansion"] ? (
                        <Badge
                          color="expansion"
                          className="element-title-badge"
                        >
                          Expansión
                        </Badge>
                      ) : null}
                    </div>
                  </Col>
                  <Col>
                    <BGGgameInfo element={element} />
                  </Col>
                </Row>
              </div>
              <div className="element-data-element">
                <div className="element-data-element_row">
                  <b>Edición:</b>
                  <br />
                  {`${element.publisher} (${element.year})`}{" "}
                  {element.bgg_version_id &&
                  element.bgg_version_id !== "other" ? (
                    <>
                      <a
                        href={`https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`}
                        target="_blank"
                        className="bgg-link"
                        id={`bgg-link-edition-${id}`}
                      >
                        BGG <Icon type="external-link" />
                      </a>
                      <UncontrolledTooltip target={`bgg-link-edition-${id}`}>
                        <div className="bgg-info-element_tooltip">
                          Ver edición en la BGG
                        </div>
                      </UncontrolledTooltip>
                    </>
                  ) : null}
                </div>
                <div className="element-data-element_row">
                  <b>Idioma:</b>
                  <br />
                  {element.language.replace(/,/g, ", ")}
                </div>

                <div className="element-data-element_row">
                  <b>Estado:</b>
                  <br />
                  <StatusBadge status={element.status} />
                </div>
                {element.comment !== "" ? (
                  <div className="element-data-element_row">
                    <b>Comentario:</b>
                    <br />
                    {element.comment}
                  </div>
                ) : null}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Element;
