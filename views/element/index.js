import { Col, Row } from "reactstrap";
import classNames from "classnames";
import StatusBadge from "components/statusBadge";
import { dependencyTypes } from "config";

const ElementView = ({ element, forCombo }) => {
  console.log("element", element);
  return (
    <div
      className={classNames("element", {
        "for-combo": forCombo,
      })}
    >
      <Row className="g-0 align-items-stretch">
        <Col md={"auto"}>
          <div
            className={classNames("element-thumbnail-container", {
              "for-combo": forCombo,
            })}
          >
            <div className="element-thumbnail">
              <img src={element?.thumbnail} alt="" />
            </div>
          </div>
        </Col>
        <Col>
          <div
            className={classNames("element-data-container", {
              "for-combo": forCombo,
            })}
          >
            <div className="element-name">
              <div className="element-name-cont">{element.name}</div>
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
                {element.languaje}
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
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default ElementView;
