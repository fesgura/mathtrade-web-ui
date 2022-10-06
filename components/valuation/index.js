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

export const ValuationLabel = ({ loading, value }) => {
  return (
    <div className="valuation-btn">
      <Icon
        type={loading ? "loading" : "star"}
        className={`valuation-btn_star star-color-${value}`}
      />
      <div className="valuation-btn_num">{value}</div>
    </div>
  );
};

const Valuation = ({ className, items, afterAnyChange }) => {
  const [valueInternal, setValueInternal] = useState(minValue);

  const [valueHover, setValueHover] = useState(minValue);

  const resetValueHover = (val) => {
    if (typeof val === "number" && val >= minValue && val <= maxValue) {
      setValueHover(val);
    }
  };

  useEffect(() => {
    if (
      items &&
      items[0] &&
      typeof items[0].value === "number" &&
      items[0].value >= minValue &&
      items[0].value <= maxValue
    ) {
      setValueInternal(items[0].value);
    }
    if (items && items[0]) {
      resetValueHover(items[0]?.value || 0);
    }
  }, [items]);

  ////////////////////////
  const [valuatePostItem, , loadingPutItem] = useApi({
    promise: MathTradeService.valuatePostItem,
    afterLoad: () => {
      afterAnyChange();
    },
  });

  return (
    <div className={classNames("valuation", className)}>
      <UncontrolledDropdown direction="down">
        <DropdownToggle tag="div" className="valuation-btn-cont">
          <ValuationLabel loading={loadingPutItem} value={valueInternal} />
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem tag="div">
            <div className="valuation-label">
              Valor
              <Question
                question="Podés asignarle un valor a este item, según tu propio criterio. Esto te va a ayudar luego a filtrar items, asociarlos, tec."
                min
              />{" "}
              :
            </div>
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
                      if (v !== items[0].value) {
                        setValueInternal(v);
                        console.log(items);
                        valuatePostItem({
                          data: {
                            value: v,
                            item_ids: items.map((itm) => {
                              return itm.id;
                            }),
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
