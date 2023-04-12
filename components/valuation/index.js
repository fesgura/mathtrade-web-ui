import { useId, useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import { UncontrolledPopover, UncontrolledTooltip } from "reactstrap";
import Question from "components/question";
import { useApi, MathTradeService } from "api_serv";
import I18N from "i18n";

const minValue = 0;
const maxValue = 10;
const step = 0.1;

const twoPointsReg = new RegExp(":", "g");

const Valuation = ({ className, items, afterAnyChange = () => {}, min }) => {
  const id = useId("valuation-b").replace(twoPointsReg, "");

  const [valueInternal, setValueInternal] = useState(minValue);
  const [isOpen, setIsOpen] = useState(false);

  const [notValuable, setNotValuable] = useState(true);

  useEffect(() => {
    if (items && items.length) {
      let minValueOp = 12;
      items.forEach((itm) => {
        console.log(itm.value);
        if (itm.value !== null) {
          const valueItem = itm.value ? parseFloat(itm.value) : 0;
          if (valueItem < minValueOp) {
            minValueOp = valueItem;
          }
        }
      });
      if (minValueOp === 12) {
        minValueOp = 0;
        setNotValuable(true);
      } else {
        setNotValuable(false);
      }
      setValueInternal(minValueOp);
    }
  }, [items]);

  ////////////////////////
  const [valuatePostItem, , loadingPutItem] = useApi({
    promise: MathTradeService.valuatePostItem,
    afterLoad: () => {
      afterAnyChange({ origin: "valuation", items, value: valueInternal });
    },
  });

  return (
    <>
      <button
        className={classNames("valuation-btn btn btn_circle btn-valuate-item", {
          "btn_circle_min valuation-btn_min": min,
        })}
        id={id + "-valuat"}
        onClick={() => {
          setIsOpen((v) => !v);
        }}
      >
        <Icon
          type={loadingPutItem ? "loading" : "star"}
          className={classNames(
            `valuation-btn_star star-color-${valueInternal.toFixed(0)}`,
            {
              "ic-loading": loadingPutItem,
            }
          )}
        />
        {loadingPutItem ? null : (
          <div className="valuation-btn_num">
            {notValuable ? "-" : valueInternal}
          </div>
        )}
      </button>
      <UncontrolledTooltip
        //placement="right"
        target={id + "-valuat"}
      >
        <I18N id="Valuation.Value.help" />
      </UncontrolledTooltip>
      <UncontrolledPopover
        className="valuation-popover"
        placement="bottom"
        target={id + "-valuat"}
        //trigger="click"
        flip
        isOpen={isOpen}
      >
        <div className="valuation-container">
          <div className="valuation-label">
            <I18N id="Valuation.Value" />
            <Question question="Valuation.Help" min /> :
            <input
              className="valuation-output"
              type="number"
              step={step}
              value={valueInternal}
              min={minValue}
              max={maxValue}
              onChange={(e) => {
                setNotValuable(false);
                let v = parseFloat(e.target.value);
                if (!isNaN(v)) {
                  v = v < minValue ? 0 : v;
                  v = v > maxValue ? 10 : v;
                  if (v !== items[0].value) {
                    setValueInternal(v);
                  }
                }
              }}
              onBlur={(e) => {
                setIsOpen(false);
                valuatePostItem({
                  data: {
                    value: `${e.target.value}`,
                    item_ids: items.map((itm) => {
                      return itm.id;
                    }),
                  },
                });
              }}
            />
          </div>
          <div className="valuation-range">
            <div className="valuation-range-input-container">
              <div className="valuation-range-input-container_line">
                <div
                  className="valuation-range-input-container_line_btn"
                  style={{ left: `${10 * valueInternal}%` }}
                />
              </div>
              <input
                type="range"
                min={minValue}
                max={maxValue}
                step={step}
                value={valueInternal}
                onChange={(e) => {
                  setNotValuable(false);
                  const v = parseFloat(e.target.value);
                  if (v !== items[0].value) {
                    setValueInternal(v);
                  }
                }}
                onBlur={(e) => {
                  setIsOpen(false);
                  valuatePostItem({
                    data: {
                      value: `${e.target.value}`,
                      item_ids: items.map((itm) => {
                        return itm.id;
                      }),
                    },
                  });
                }}
              />
            </div>
          </div>
        </div>
      </UncontrolledPopover>
    </>
  );
};
export default Valuation;
