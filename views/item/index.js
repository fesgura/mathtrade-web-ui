import { useState, useEffect } from "react";
import { Card } from "reactstrap";
import Element from "containers/element";
import classNames from "classnames";

const ItemView = ({ item }) => {
  const [isCombo, setIsCombo] = useState(false);

  useEffect(() => {
    setIsCombo(item?.elements?.length > 1);
  }, [item]);

  return (
    <div className="item">
      <Card>
        <div
          className={classNames("item-card-container", {
            "for-combo": isCombo,
          })}
        >
          {isCombo ? (
            <div className="item-title-combo">
              <div className="item-title-combo-cont">
                <b>Combo:</b> {item?.title}
              </div>
            </div>
          ) : null}
          {item && item.elements && item.elements.length ? (
            <div className="item-elements-list">
              {item.elements.map((element, k) => {
                return (
                  <Element
                    element={element}
                    key={k}
                    itemId={item?.id}
                    forCombo={isCombo}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
};
export default ItemView;
