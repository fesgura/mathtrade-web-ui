import { Card } from "reactstrap";
import Element from "containers/element";
import classNames from "classnames";
import MathTradeItemTools from "components/mathtradeItemTools";

const ItemView = ({
  IamInMathTrade,
  item,
  itemMathTradeData,
  afterAnyChange,
  own,
}) => {
  return (
    <div className="item">
      <Card className="shadow-sm">
        <div
          className={classNames("item-card-container", {
            "for-combo": item?.elements?.length > 1,
            "published-item": itemMathTradeData,
          })}
        >
          {item?.elements?.length > 1 ? (
            <div className="item-title-combo">
              <div className="item-title-combo-cont">
                <b>Combo:</b> {item?.title}
              </div>
            </div>
          ) : null}
          {item && item.elements && item.elements.length ? (
            <div className="item-elements-list">
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
                      own={own}
                    />
                  );
                })}
            </div>
          ) : null}
          {own ? (
            <Element item={item} afterAnyChange={afterAnyChange} own={own} />
          ) : null}
        </div>
        {IamInMathTrade ? (
          <MathTradeItemTools
            item={item}
            itemMathTradeData={itemMathTradeData}
            afterAnyChange={afterAnyChange}
          />
        ) : null}
      </Card>
    </div>
  );
};
export default ItemView;
