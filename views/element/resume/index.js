import { useState, useEffect } from "react";
import { Col, Row, Badge, Alert } from "reactstrap";
import classNames from "classnames";
import StatusBadge from "components/statusBadge";
import { dependencyTypes } from "config";
import MinMenu from "components/min-menu";
import { typeOfElements } from "config";
import { LoadingBox } from "components/loading";
import Icon from "components/icon";

const ElementResume = ({ element, item, menuOptions, loading, errors }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    let timer = null;
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    } else {
      setErrorMessage(null);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [errors]);

  return element ? (
    <div
      className={classNames("element element-resume fade-in", {
        "for-combo": item?.elements?.length > 1,
      })}
    >
      <Row className="g-0 align-items-stretch">
        <Col sm={"auto"}>
          <div
            className={classNames("element-thumbnail-container mx-auto mb-4", {
              "for-combo": item?.elements?.length > 1,
            })}
          >
            <div className="element-thumbnail">
              {element && element.thumbnail ? (
                <img src={element.thumbnail} alt="" />
              ) : (
                <div className="element-thumbnail_placeholder" />
              )}
            </div>
          </div>
        </Col>
        <Col>
          <div
            className={classNames("element-data-container", {
              "for-combo": item?.elements?.length > 1,
            })}
          >
            <div className="element-name">
              <div className="element-name-cont">
                {element.name}{" "}
                {element.type === typeOfElements["expansion"] ? (
                  <Badge color="expansion" className="element-name-badge">
                    Expansión
                  </Badge>
                ) : null}
                <a
                  href={`https://boardgamegeek.com/boardgame/${element.bgg_id}/`}
                  target="_blank"
                  className="element-name-bgg-link"
                >
                  BGG <Icon type="external-link" />
                </a>
              </div>
            </div>
            <div className="element-row">
              <div className="element-col">
                <b>Edición:</b>
                <br />
                {`${element.publisher} (${element.year})`}
              </div>
              <div className="element-col">
                <b>Idioma:</b>
                <br />
                {element.language}
              </div>
              <div className="element-col">
                <b>Dependencia de idioma:</b>
                <br />
                {dependencyTypes[element.dependency]}
              </div>
              <div className="element-col">
                <b>Estado:</b>
                <br />
                <StatusBadge status={element.status} />
              </div>
            </div>
            {element.comment !== "" ? (
              <div className="element-row">
                <div className="element-col pb-0">
                  <b>Comentario:</b>
                  <br />
                  {element.comment}
                </div>
              </div>
            ) : null}
            {errorMessage ? (
              <Alert color="danger" className="text-center mt-3">
                {errorMessage}
              </Alert>
            ) : null}
          </div>
        </Col>
        <Col sm={"auto"} xs={12} className="pt-sm-0 pt-3 text-end">
          <MinMenu options={menuOptions} />
        </Col>
      </Row>
      {loading ? <LoadingBox /> : null}
    </div>
  ) : null;
};
export default ElementResume;
