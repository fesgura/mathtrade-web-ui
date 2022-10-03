import { useId } from "react";
import classNames from "classnames";
import Box from "components/box";
import Icon from "components/icon";
import StatusBadge from "components/statusBadge";
import { Col, Row, Badge, UncontrolledTooltip } from "reactstrap";

const twoPointsReg = new RegExp(":", "g");

const ElementBox = ({ element, className }) => {
  const id = useId("b").replace(twoPointsReg, "");
  return (
    <Box className={classNames("element-box pb-0", className)} color="element">
      <Row className="align-items-center">
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">
              {`${element.publisher} (${element.year}) `}
              <a
                href={`https://boardgamegeek.com/boardgameversion/${element?.bgg_version_id}/`}
                target="_blank"
                className="bgg-link d-inline"
                id={`bgg-link-${id}`}
              >
                BGG <Icon type="external-link" />
              </a>
              <UncontrolledTooltip target={`bgg-link-${id}`}>
                <div className="bgg-game-info_tooltip">
                  Ver edición en la BGG
                </div>
              </UncontrolledTooltip>
            </div>
            <div className="box_item-label">Edición</div>
          </div>
        </Col>
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">
              {element.language.replace(/,/g, ", ")}
            </div>
            <div className="box_item-label">Idioma</div>
          </div>
        </Col>
        <Col xs="auto" className="element-box_col">
          <div className="box_item">
            <div className="box_item-text">
              <StatusBadge status={element.status} />
            </div>
            <div className="box_item-label">Estado</div>
          </div>
        </Col>
        {element.comment !== "" ? (
          <Col xs={12} className="element-box_col">
            <div className="box_item">
              <div className="box_item-text">{element.comment}</div>
              <div className="box_item-label">Comentario</div>
            </div>
          </Col>
        ) : null}
      </Row>
    </Box>
  );
};
export default ElementBox;
