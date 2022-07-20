import { Card } from "reactstrap";
import Element from "containers/element";
import classNames from "classnames";

const ItemView = ({ item, afterAnyChange }) => {
  return (
    <div className="item">
      <Card className="shadow-sm">
        <div
          className={classNames("item-card-container", {
            "for-combo": item?.elements?.length > 1,
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
                    />
                  );
                })}
            </div>
          ) : null}
          <Element item={item} afterAnyChange={afterAnyChange} />
        </div>
      </Card>
    </div>
  );
};
export default ItemView;
