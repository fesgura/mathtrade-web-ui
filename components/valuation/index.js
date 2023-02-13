import { useState, useEffect } from "react";
import classNames from "classnames";
import BtnCircle from "components/btnCircle";
import Icon from "components/icon";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Question from "components/question";
import { useApi, MathTradeService } from "api_serv";
import I18N from "i18n";

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

export const ValuationTitle = ({ loading, value }) => {
  return (
    <>
      <Icon
        type={loading ? "loading" : "star"}
        className={classNames(`valuation-btn_star star-color-${value}`, {
          "ic-loading": loading,
        })}
      />
      <div className="valuation-btn_num">{value}</div>
    </>
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
    <UncontrolledDropdown direction="down" className="d-inline-block">
      <DropdownToggle className="valuation-title btn btn_circle btn-valuate-item">
        <ValuationTitle loading={loadingPutItem} value={valueInternal} />
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag="div" className="valuation-container">
          <div className="valuation-label">
            <I18N id="Valuation.Value" />
            <Question question="Valuation.Help" min /> :
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
  );
};
export default Valuation;
