import { useId } from "react";
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
      {before ? <span className="input-group-text">{before}</span> : null}
      {beforeButton ? beforeButton : null}

      {children}

      {after ? <span className="input-group-text">{after}</span> : null}
      {afterButton ? afterButton : null}
    </div>
  );
};

const InputComp = ({
  name,
  value,
  onChange,
  error,
  required,
  //
  type,
  label,
  size,
  className,
  classNameContainer,
  after,
  icon,
  before,
  afterButton,
  beforeButton,
  options,
  labelCheckbox,
  readOnly,
  placeholder,
  question,
  ...rest
}) => {
  const id = useId("a").replace(twoPointsReg, "");
  let inputContent = null;

  const beforeContent = icon ? <Icon type={icon} /> : null;

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
            onChange={onChange}
            type={type}
            className={classNames(
              "form-select",
              error ? "is-invalid" : "",
              className
            )}
            {...rest}
          >
            <option value="">{placeholder || "Selecciona..."}</option>
            {options.map((opt) => {
              return (
                <option value={opt.value} key={opt.value}>
                  {opt.text}
                </option>
              );
            })}
          </select>
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
              const a = {
                target: { value: e.target.checked },
              };
              onChange(a);
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
                  onChange={onChange}
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
          onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
