import BggLink from "components/bgg-gameinfo/bgg_link";
import StatusBadge from "components/statusBadge";
import { Col, Row } from "reactstrap";

const ItemGameElement = ({ element, isCombo }) => {
  //console.log(element);
  return (
    <div className="item-game-element">
      <Row className="align-items-center g-0">
        {isCombo ? (
          <Col xs={12}>
            <div className="item-game-element_sec item-game-element_title">
              <b>{element.name}</b>
              <BggLink bgg_id={element.bgg_id} />
            </div>
          </Col>
        ) : null}
        <Col xs="auto">
          <div className="item-game-element_sec item-game-element_language">
            <div className="lab">Idioma</div>
            {element.language}
          </div>
        </Col>
        <Col xs="auto">
          <div className="item-game-element_sec item-game-element_publisher">
            <div className="lab">Editorial</div>
            {`${element.publisher} (${element.year})`}
          </div>
        </Col>
        <Col xs="auto">
          <div className="item-game-element_sec item-game-element_status">
            <div className="lab">Estado</div>
            <StatusBadge status={element.status} />
          </div>
        </Col>
        {element.comment && element.comment !== "" ? (
          <Col xs="auto">
            <div className="item-game-element_sec item-game-element_comment">
              <div className="lab">Comentario</div>
              {element.comment}
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default ItemGameElement;
