import { useId, useState, useEffect, useRef } from "react";
import { UncontrolledTooltip } from "reactstrap";
import classNames from "classnames";
import Icon from "components/icon";

const twoPointsReg = new RegExp(":", "g");

const InputGroup = ({
  size,
  error,
  before,
  beforeButton,
  after,
  afterButton,
  children,
}) => {
  return (
    <div
      className={classNames("input-group", size ? `input-group-${size}` : "", {
        "is-invalid": error,
        "with-before": before || beforeButton,
        "with-after": after || afterButton,
      })}
    >
      {before ? (
        <span className="input-group-text before">{before}</span>
      ) : null}
      {beforeButton ? beforeButton : null}

      {children}

      {after ? <span className="input-group-text after">{after}</span> : null}
      {afterButton ? afterButton : null}
    </div>
  );
};

const InputComp = ({
  name,
  value,
  required,
  error,
  //
  onChange,
  //
  type,
  label,
  labelCheckbox,
  placeholder,
  //
  size,
  className,
  classNameContainer,
  readOnly,
  //
  after,
  before,
  icon,
  afterButton,
  beforeButton,
  //
  question,
  loading,
  //
  options,
  drop,
  nowrite,
  startFocus,
  //
  ...rest
}) => {
  const id = useId("a").replace(twoPointsReg, "");
  let inputContent = null;
  const beforeContent = icon ? <Icon type={icon} /> : null;

  /* DROP */
  const [isFocus, setIsFocus] = useState(false);
  const [waitBlur, setWaitBlur] = useState(false);
  const inputDropRef = useRef(null);

  useEffect(() => {
    if (startFocus && inputDropRef && inputDropRef.current) {
      inputDropRef.current.focus();
      setIsFocus(true);
    }
  }, [inputDropRef, startFocus]);

  useEffect(() => {
    let timer = null;
    if (waitBlur) {
      setWaitBlur(false);
      timer = setTimeout(() => {
        setIsFocus(false);
      }, 200);
    }
  }, [waitBlur]);
  /* END DROP */

  switch (type) {
    case "select":
      inputContent = (
        <InputGroup
          size={size}
          error={error}
          before={beforeContent}
          beforeButton={beforeButton}
          after={after}
          afterButton={afterButton}
        >
          <select
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            type={type}
            className={classNames(
              "form-select",
              {
                "is-invalid": error,
              },
              className
            )}
            {...rest}
          >
            {loading ? null : (
              <option value="">{placeholder || "Seleccioná..."}</option>
            )}
            {options.map((opt) => {
              if (loading) {
                return null;
              }
              return (
                <option value={opt.value} key={opt.value}>
                  {opt.text}
                </option>
              );
            })}
          </select>
          {loading ? (
            <div className="input-loading">
              <Icon type="refresh fa-spin" />
            </div>
          ) : null}
        </InputGroup>
      );
      break;
    case "checkbox":
    case "switch":
      inputContent = (
        <div
          className={classNames(
            "form-check",
            type === "switch" ? "form-switch" : ""
          )}
        >
          <input
            className={classNames(
              "form-check-input",
              error ? "is-invalid" : ""
            )}
            type="checkbox"
            id={`checkbox-${id}`}
            checked={value}
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            {...rest}
          />
          <input
            type="hidden"
            value={value === "" ? "false" : value}
            name={name}
          />
          {labelCheckbox ? (
            <label className="form-check-label" htmlFor={`checkbox-${id}`}>
              {labelCheckbox}
            </label>
          ) : null}
        </div>
      );
      break;
    case "radio":
      inputContent = (
        <>
          {options.map((opt, k) => {
            return (
              <div className="form-check" key={opt.value}>
                <input
                  className={classNames(
                    "form-check-input",
                    error ? "is-invalid" : ""
                  )}
                  name={"__excluded__" + name}
                  value={opt.value}
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  type="radio"
                  id={`radio-${id}-${k}-${opt.value}`}
                  {...rest}
                />
                <label
                  className="form-check-label"
                  htmlFor={`radio-${id}-${k}-${opt.value}`}
                >
                  {opt.text}
                </label>
              </div>
            );
          })}
          <input type="hidden" name={name} value={value} />
        </>
      );
      break;
    case "range":
      inputContent = (
        <input
          name={name}
          type="range"
          className="form-range"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          {...rest}
        />
      );
      break;
    case "textarea":
      inputContent = (
        <InputGroup
          size={size}
          error={error}
          before={beforeContent}
          beforeButton={beforeButton}
          after={after}
          afterButton={afterButton}
        >
          <textarea
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            type={type}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              error ? "is-invalid" : "",
              className
            )}
            readOnly={readOnly}
            {...rest}
          />
        </InputGroup>
      );
      break;
    case "input-drop":
      inputContent = (
        <InputGroup
          size={size}
          error={error}
          before={loading ? <Icon type="refresh fa-spin" /> : beforeContent}
          beforeButton={beforeButton}
          after={after}
          afterButton={afterButton}
        >
          <input
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            onBlur={() => {
              setWaitBlur(true);
            }}
            onFocus={(e) => {
              setIsFocus(true);
              e.target.select();
            }}
            ref={inputDropRef}
            type={type}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              type === "color" ? "form-control-color" : "",
              error ? "is-invalid" : "",
              className
            )}
            readOnly={readOnly}
            {...rest}
          />
          {nowrite ? (
            <div className="no-write">
              <input
                onBlur={() => {
                  setWaitBlur(true);
                }}
                onFocus={() => {
                  setIsFocus(true);
                }}
              />
            </div>
          ) : null}
          {drop && isFocus ? (
            <div className="input-drop-pad_cont">
              <div className="input-drop-pad">{drop}</div>
            </div>
          ) : null}
        </InputGroup>
      );
      break;
    default:
      inputContent = (
        <InputGroup
          size={size}
          error={error}
          before={beforeContent}
          beforeButton={beforeButton}
          after={after}
          afterButton={afterButton}
        >
          <input
            name={name}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            type={type}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              type === "color" ? "form-control-color" : "",
              error ? "is-invalid" : "",
              className
            )}
            readOnly={readOnly}
            {...rest}
          />
        </InputGroup>
      );
  }

  return (
    <div className={classNames("input-container", classNameContainer)}>
      {label ? (
        <label className="form-label">
          {label}
          {required ? <span className="req">*</span> : null}
          {question ? (
            <>
              <span className="form-question" id={`tt-label-q-${id}`}>
                ?
              </span>
              <UncontrolledTooltip
                //placement="right"
                target={`tt-label-q-${id}`}
              >
                {question}
              </UncontrolledTooltip>
            </>
          ) : null}
        </label>
      ) : null}
      {inputContent}
      {error ? (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default InputComp;
