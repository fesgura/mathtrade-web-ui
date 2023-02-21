import I18N from "i18n";
import { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Checkbox from "components/checkbox";
import classNames from "classnames";

const OrderBy = ({
  valueInitial,
  options = [],
  onChange = () => {},
  defaultValue = "",
  twoRows,
}) => {
  const [optionValue, setOptionValue] = useState(defaultValue);
  const [desc, setDesc] = useState(false);

  useEffect(() => {
    if (valueInitial) {
      if (valueInitial.indexOf("-") === 0) {
        setDesc(true);
      }
      setOptionValue(valueInitial.replace("-", ""));
    } else {
      if (defaultValue !== "") {
        if (defaultValue.indexOf("-") === 0) {
          setDesc(true);
        }
        setOptionValue(defaultValue.replace("-", ""));
      }
    }
  }, [valueInitial, defaultValue]);

  return (
    <div className={classNames("order-by", { "two-rows": twoRows })}>
      <Row className={classNames("g-0", { "align-items-center": !twoRows })}>
        <Col xs={twoRows ? 12 : "auto"}>
          <div className="order-by_label">
            <I18N id="orderBy.Title" />:
          </div>
        </Col>
        <Col xs="auto">
          <div className="order-by_select">
            <select
              value={optionValue}
              onChange={(e) => {
                setOptionValue(e.target.value);
                onChange(e.target.value, desc);
              }}
            >
              {defaultValue === "" ? (
                <option value="">
                  <I18N id="form.SelectOptInstruction" />
                </option>
              ) : null}
              {options.map((op, k) => {
                return (
                  <option value={op.value} key={k}>
                    {op.text}
                  </option>
                );
              })}
            </select>
          </div>
        </Col>
        <Col xs="auto" className="px-1">
          {/* <input
            type="checkbox"
            className="order-by_checkbox cursor-pointer"
            checked={desc}
            onChange={(e) => {
              setDesc(e.target.checked);
              if (optionValue !== "") {
                onChange(optionValue, e.target.checked);
              }
            }}
            id="order-by-desc"
          /> */}
          <Checkbox
            value={desc}
            onClick={(e) => {
              setDesc(!desc);
              if (optionValue !== "") {
                onChange(optionValue, !desc);
              }
            }}
          />
        </Col>
        <Col xs="auto">
          <label
            className="order-by_label cursor-pointer"
            onClick={(e) => {
              setDesc(!desc);
              if (optionValue !== "") {
                onChange(optionValue, !desc);
              }
            }}
          >
            <I18N id="orderBy.Descent" />
          </label>
        </Col>
      </Row>
    </div>
  );
};

export default OrderBy;
