import { useId, useState, useEffect } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import { UncontrolledPopover } from "reactstrap";
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

  useEffect(() => {
    if (items && items.length) {
      let minValue = 12;
      items.forEach((itm) => {
        const valueItem = itm.value ? parseFloat(itm.value) : 0;
        if (valueItem < minValue) {
          minValue = valueItem;
        }
      });
      setValueInternal(minValue);
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
          <div className="valuation-btn_num">{valueInternal}</div>
        )}
      </button>
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
            <div className="valuation-output">{valueInternal}</div>
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
