import { useState, useEffect } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Button } from "reactstrap";

const WantButton = ({
  objectToWant,
  type,
  isOwner,
  wantGroup,
  onClick,
  afterAnyChange,
}) => {
  const [itemListToWant, set_itemListToWant] = useState([]);

  useEffect(() => {
    if (objectToWant) {
      switch (type) {
        case "game":
          set_itemListToWant(objectToWant?.items || []);
          break;
        case "item":
          set_itemListToWant([objectToWant] || []);
          break;
        default:
        //
      }
    }
  }, [objectToWant, type]);

  return (
    <div className={classNames("mathtrade-tools")}>
      <Row className="g-0 align-items-center">
        <Col xs="auto" className="pe-2">
          {isOwner ? (
            <Button color="transparent" size="sm" disabled>
              Item propio
            </Button>
          ) : (
            <Button color="primary" size="sm" onClick={onClick}>
              {wantGroup ? "En mi Want List" : "¡Lo quiero!"}
            </Button>
          )}
        </Col>
        <Col xs="auto">
          <Valuation
            items={itemListToWant || []}
            afterAnyChange={afterAnyChange}
          />
        </Col>
      </Row>
    </div>
  );
};
export default WantButton;
