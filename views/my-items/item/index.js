import Element from "containers/my-items/element";
import classNames from "classnames";
import { Col, Row } from "reactstrap";
import MT_ToolItem_MyItem from "components/item/mt_tools/my_item";

const ItemView = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  own,
  card = true,
}) => {
  return (
    <div className="item  mb-4">
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
                    return (
                      <Element
                        key={k}
                        element={element}
                        item={item}
                        afterAnyChange={afterAnyChange}
                      />
                    );
                  })}
              </div>
            ) : null}
            <Element item={item} afterAnyChange={afterAnyChange} own={own} />
          </div>
        </Col>
        {IamInMathTrade ? (
          <Col xs="auto">
            <MT_ToolItem_MyItem
              item={item}
              itemMathTradeData={itemMathTradeData}
              afterAnyChange={afterAnyChange}
            />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};
export default ItemView;
