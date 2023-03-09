import { useId, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import { selectMultipleToArray } from "./utils";
import Question from "components/question";
import { getI18Ntext } from "i18n";
import { InputGroup } from ".";

const SelectHot = ({
  size,
  error,
  before,
  beforeButton,
  after,
  afterButton,
  options,
  name,
  value,
  placeholder,
  onChange,
  readOnly,
  className,
  disabled,
}) => {
  const [visible, setVisible] = useState(false);
  const [textInp, setTextInp] = useState("");
  const [valueInp, setValueInp] = useState("");
  const [optionsInp, setOptionsInp] = useState([]);

  useEffect(() => {
    if (options && options.length) {
      if (textInp.length) {
        const optionsFiltered = options.filter((opt) => {
          return opt.text.toLowerCase().indexOf(textInp.toLowerCase()) >= 0;
        });
        setOptionsInp(optionsFiltered);
      } else {
        setOptionsInp(options);
        setValueInp("");
      }
    }
  }, [options, textInp]);

  useEffect(() => {
    if (options && options.length && value) {
      setValueInp(value);

      const isOpt = options.filter((opt) => {
        return `${opt.value}` === `${value}`;
      });

      if (isOpt[0]) {
        setTextInp(isOpt[0].text);
      }
    } else {
      setValueInp("");
      setTextInp("");
    }
  }, [options, value]);

  return (
    <InputGroup
      size={size}
      error={error}
      before={before}
      beforeButton={beforeButton}
      after={
        <div
          className="pointer"
          onClick={() => {
            setValueInp("");
            setTextInp("");
            onChange("");
          }}
        >
          <Icon />
        </div>
      }
      afterButton={afterButton}
    >
      <input
        value={textInp}
        placeholder={placeholder}
        onChange={(e) => {
          setTextInp(e.target.value);
        }}
        onFocus={() => {
          setVisible(true);
        }}
        onBlur={() => {
          setTimeout(() => {
            setVisible(false);
          }, 150);
        }}
        type="text"
        className={classNames(
          readOnly ? "form-control-plaintext" : "form-control",
          error ? "is-invalid" : "",
          className
        )}
        readOnly={readOnly}
        disabled={disabled}
      />
      <input name={name} type="hidden" value={valueInp} />
      {visible ? (
        <div className="select-hot_pad">
          {optionsInp.map((opt, k) => {
            return (
              <div
                className="select-hot_item"
                key={k}
                onClick={() => {
                  setTextInp(opt.text);
                  setValueInp(opt.value);
                  onChange(opt.value);
                }}
              >
                {opt.text}
              </div>
            );
          })}
        </div>
      ) : null}
    </InputGroup>
  );
};
export default SelectHot;
