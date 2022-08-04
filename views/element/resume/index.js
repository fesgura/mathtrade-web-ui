import { useId, useState, useEffect } from "react";
import { Col, Row, Badge, Alert, UncontrolledTooltip } from "reactstrap";
import classNames from "classnames";
import StatusBadge from "components/statusBadge";
import Icon from "components/icon";
import MinMenu from "components/min-menu";
import { typeOfElements } from "config";
import { LoadingBox } from "components/loading";
import Dependency from "./dependency";
import BGGinfoElement from "./bgg";

const twoPointsReg = new RegExp(":", "g");

const ElementResume = ({ element, item, menuOptions, loading, errors }) => {
  const id = useId("a").replace(twoPointsReg, "");
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
            className={classNames(
              "element-thumbnail-container mx-auto mb-md-0 mb-4",
              {
                "for-combo": item?.elements?.length > 1,
              }
            )}
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
            <Row className="align-items-center mb-4">
              <Col xs="auto">
                <div className="element-name">
                  <div className="element-name-cont">
                    {element.name}{" "}
                    {element.type === typeOfElements["expansion"] ? (
                      <Badge color="expansion" className="element-name-badge">
                        Expansión
                      </Badge>
                    ) : null}
                  </div>
                </div>
              </Col>
              <Col>
                <BGGinfoElement element={element} />
              </Col>
            </Row>

            <div className="element-row">
              <div className="element-col">
                <b>Edición:</b>
                <br />
                {`${element.publisher} (${element.year})`}{" "}
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
              </div>
              <div className="element-col">
                <b>Idioma:</b>
                <br />
                {element.language.replace(/,/g, ", ")}
              </div>
              <div className="element-col">
                <b>Dependencia de idioma (BGG):</b>
                <Dependency element={element} />
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
