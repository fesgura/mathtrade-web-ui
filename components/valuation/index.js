import { useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Question from "components/question";
import { useApi, MathTradeService } from "api";
import { getMathtradeStored } from "utils";

const minValue = 0;
const maxValue = 10;
const valuesPossibles = (() => {
  const list = [];
  let d = minValue;
  while (d <= maxValue) {
    list.push(d);
    d++;
  }
  return list;
})();

const Valuation = ({ className, item, afterAnyChange }) => {
  const [valueInternal, setValueInternal] = useState(minValue);

  const [valueHover, setValueHover] = useState(minValue);

  const resetValueHover = (val) => {
    if (typeof val === "number" && val >= minValue && val <= maxValue) {
      setValueHover(val);
    }
  };

  useEffect(() => {
    if (
      item &&
      typeof item.value === "number" &&
      item.value >= minValue &&
      item.value <= maxValue
    ) {
      setValueInternal(item.value);
    }
    resetValueHover(item.value);
  }, [item]);

  ////////////////////////
  const [valuatePutItem, , loadingPutItem] = useApi({
    promise: MathTradeService.valuatePutItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  return (
    <div className={classNames("valuation", className)}>
      <UncontrolledDropdown direction="down">
        <DropdownToggle tag="div" className="valuation-row">
          <div className="valuation-col">
            <span className="valuation-label">Valor</span>
            <Question
              question="Podés asignarle un valor a este item, según tu propio criterio. Esto te va a ayudar luego a filtrar items, asociarlos, tec."
              min
            />{" "}
            :
          </div>
          <div className="valuation-col ps-2">
            <div className="valuation-btn">
              <Icon
                type={loadingPutItem ? "loading" : "star"}
                className={`valuation-btn_star star-color-${valueInternal}`}
              />
              <div className="valuation-btn_num">{valueInternal}</div>
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag="div">
            <div
              className="valuation-liner"
              onMouseLeave={() => {
                resetValueHover(valueInternal);
              }}
            >
              {valuesPossibles.map((v) => {
                return (
                  <div
                    className="valuation-line-star"
                    key={v}
                    onMouseEnter={() => {
                      setValueHover(v);
                    }}
                    onClick={() => {
                      if (v !== item.value) {
                        setValueInternal(v);
                        const mathtradeStored = getMathtradeStored();
                        const mathTradeId = mathtradeStored.data.id;
                        valuatePutItem({
                          mathTradeId,
                          itemId: item.id,
                          data: {
                            value: v,
                            item_id: item.id,
                          },
                        });
                      }
                    }}
                  >
                    <div
                      className={classNames("valuation-line-btn", {
                        prev: v < valueHover,
                        current: v === valueHover,
                      })}
                    >
                      <Icon
                        type="star"
                        className={`valuation-line-btn_star star-color-${v}`}
                      />
                      <div className="valuation-line-btn_num">{v}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  );
};
export default Valuation;
