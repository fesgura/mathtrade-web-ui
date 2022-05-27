import { useId } from "react";
import { useFormContext } from "react-hook-form";
import classNames from "classnames";

const twoPointsReg = new RegExp(":", "g");

const validateMessage = {
  required: "Este campo es requerido",
  email: "Email inválido",
};

const Input = ({
  label,
  labelFloating,
  type = "text",
  name = "",
  size,
  className,
  classNameContainer,
  validation,
  required = false,
  readOnly,
  after = null,
  before = null,
  afterButton = null,
  beforeButton = null,
  onChange = () => {},
  options = [],
  labelCheckbox,
  ...rest
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const id = useId("a").replace(twoPointsReg, "");

  let inputContent = null;

  switch (type) {
    case "select":
      inputContent = (
        <div
          className={classNames(
            "input-group",
            size ? `input-group-${size}` : ""
          )}
        >
          {before ? <span className="input-group-text">{before}</span> : null}
          {beforeButton ? beforeButton : null}
          <select
            {...register(name, {
              ...(required ? { required: validateMessage.required } : {}),
              ...(validation ? validation : {}),
            })}
            className={classNames(
              "form-select",
              size ? `form-select-${size}` : "",
              errors && errors[name] ? "is-invalid" : "",
              className
            )}
            onChange={onChange}
            {...rest}
          >
            {options.map((opt) => {
              return (
                <option value={opt.value} key={opt.value}>
                  {opt.text}
                </option>
              );
            })}
          </select>
          {after ? <span className="input-group-text">{after}</span> : null}
          {afterButton ? afterButton : null}
        </div>
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
              errors && errors[name] ? "is-invalid" : ""
            )}
            {...register(name, {
              ...(required ? { required: validateMessage.required } : {}),
            })}
            type="checkbox"
            id={`checkbox-${id}`}
            {...rest}
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
                    errors && errors[name] ? "is-invalid" : ""
                  )}
                  {...register(name, {
                    ...(required ? { required: validateMessage.required } : {}),
                  })}
                  name={name}
                  value={opt.value}
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
        </>
      );
      break;
    case "range":
      inputContent = (
        <input
          type="range"
          className="form-range"
          {...register(name, {
            ...(required ? { required: validateMessage.required } : {}),
          })}
          {...rest}
        />
      );
      break;
    case "textarea":
      inputContent = (
        <div
          className={classNames(
            "input-group",
            size ? `input-group-${size}` : ""
          )}
        >
          {before ? <span className="input-group-text">{before}</span> : null}
          {beforeButton ? beforeButton : null}

          <textarea
            id={id + "-textarea"}
            {...register(name, {
              ...(required ? { required: validateMessage.required } : {}),
              ...(validation ? validation : {}),
            })}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              type === "color" ? "form-control-color" : "",
              errors && errors[name] ? "is-invalid" : ""
            )}
            //valid={false}
            readOnly={readOnly}
            onChange={onChange}
            {...rest}
          />
          {after ? <span className="input-group-text">{after}</span> : null}
          {afterButton ? afterButton : null}
        </div>
      );
      break;
    default:
      inputContent = (
        <div
          className={classNames(
            "input-group",
            size ? `input-group-${size}` : ""
          )}
        >
          {before ? <span className="input-group-text">{before}</span> : null}
          {beforeButton ? beforeButton : null}

          <input
            type={type}
            id={id + "-input"}
            {...register(name, {
              ...(required ? { required: validateMessage.required } : {}),
              ...(validation ? validation : {}),
              ...(type === "email"
                ? {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: validateMessage.email,
                    },
                  }
                : {}),
            })}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              type === "color" ? "form-control-color" : "",
              errors && errors[name] ? "is-invalid" : ""
            )}
            readOnly={readOnly}
            onChange={onChange}
            {...rest}
          />
          {after ? <span className="input-group-text">{after}</span> : null}
          {afterButton ? afterButton : null}
        </div>
      );
  }

  return (
    <div className={classNames("input-container", classNameContainer)}>
      {label ? (
        <label className="form-label">
          {label}
          {required ? <span className="req">*</span> : null}
        </label>
      ) : null}
      {inputContent}
      {errors && errors[name] && (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

export default Input;
