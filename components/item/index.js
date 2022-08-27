import Element from "components/element";
import classNames from "classnames";
import User from "./user";
import { Col, Row } from "reactstrap";

const Item = ({
  item,
  afterAnyChange,
  wanted,
  card = true,
  bordered,
  className,
  tools,
}) => {
  return (
    <div className={classNames("item mb-4", { wanted, owner: item?.owner })}>
      <Row className="align-items-stretch g-0">
        <Col>
          <div
            className={classNames(
              "item-container",
              {
                "card shadow-sm": card,
                bordered,
              },
              className
            )}
          >
            {item?.elements?.length > 1 ? (
              <div className={classNames("item-title", { owner: item?.owner })}>
                <b>Combo:</b> {item?.title}
              </div>
            ) : null}
            {item && item.elements && item.elements.length ? (
              <div
                className={classNames("item-elementlist", {
                  combo: item?.elements?.length > 1,
                  owner: item?.owner,
                })}
              >
                {item.elements
                  .sort((a, b) => {
                    return a.id < b.id ? -1 : 1;
                  })
                  .map((element, k) => {
                    return (
                      <Element
                        key={k}
                        element={element}
                        item={item}
                        owner={item?.owner}
                      />
                    );
                  })}
              </div>
            ) : null}
            {item && item.user && !item?.owner ? (
              <User user={item.user} />
            ) : null}
          </div>
        </Col>
        {tools ? <Col xs="auto">{tools}</Col> : null}
      </Row>
    </div>
  );
};
export default Item;
