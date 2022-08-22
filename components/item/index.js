import Element from "components/element";
import classNames from "classnames";
import User from "./user";
import { Col, Row } from "reactstrap";

const Item = ({ item, afterAnyChange, card = true, tools }) => {
  return (
    <div className="item mb-4">
      <Row className="align-items-stretch g-0">
        <Col>
          <div
            className={classNames("item-container", {
              "card shadow-sm": card,
            })}
          >
            {item?.elements?.length > 1 ? (
              <div className="item-title">
                <b>Combo:</b> {item?.title}
              </div>
            ) : null}
            {item && item.elements && item.elements.length ? (
              <div
                className={classNames("item-elementlist", {
                  combo: item?.elements?.length > 1,
                })}
              >
                {item.elements
                  .sort((a, b) => {
                    return a.id < b.id ? -1 : 1;
                  })
                  .map((element, k) => {
                    return <Element key={k} element={element} item={item} />;
                  })}
              </div>
            ) : null}
            {item && item.user ? <User user={item.user} /> : null}
          </div>
        </Col>
        {tools ? <Col xs="auto">{tools}</Col> : null}
      </Row>
    </div>
  );
};
export default Item;
