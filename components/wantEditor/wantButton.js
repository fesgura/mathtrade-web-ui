import { useState, useEffect } from "react";
import classNames from "classnames";
import Valuation from "components/valuation";
import { Col, Row, Button } from "reactstrap";
import I18N from "i18n";

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
        <Col xs="auto">
          {isOwner ? (
            <Button color="transparent" size="sm" disabled>
              <I18N id="wantEditor.btn.OwnItem" />
            </Button>
          ) : (
            <Button
              color="primary"
              size={type === "tag" ? "xs" : "sm"}
              onClick={onClick}
            >
              {wantGroup ? (
                <I18N id="wantEditor.btn.InMyWantList" />
              ) : (
                <I18N id="wantEditor.btn.IwantIt" />
              )}
            </Button>
          )}
        </Col>
        {type !== "tag" ? (
          <Col xs="auto" className="ps-2">
            <Valuation
              items={itemListToWant || []}
              afterAnyChange={afterAnyChange}
            />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};
export default WantButton;
