import { useState, useEffect } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Button } from "reactstrap";

const WantButton = ({
  wantInfo,
  objectToWant,
  type,
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
        default:
        //
      }
    }
  }, [objectToWant, type]);

  return (
    <div className={classNames("mathtrade-tools")}>
      <Row className="g-0 align-items-center">
        <Col xs="auto" className="pe-2">
          <Button color="primary" size="sm" onClick={onClick}>
            {wantGroup ? (
              <>
                En mi Want List
                {/* <br />
                <span className="small">
                  (
                  {`ofrezco ${wantGroup.item_ids.length} item${
                    wantGroup.item_ids.length > 1 ? "s" : ""
                  }`}
                  )
                </span> */}
              </>
            ) : (
              "¡Lo quiero!"
            )}
          </Button>
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
