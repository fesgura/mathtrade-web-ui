import { useId, useState, useEffect, useRef } from "react";
import classNames from "classnames";
import Icon from "components/icon";
import { selectMultipleToArray } from "./utils";
import Question from "components/question";
import RangeMultiple from "./range-multiple";
import SelectHot from "./select-hot";
import { getI18Ntext } from "i18n";

const twoPointsReg = new RegExp(":", "g");

export const InputGroup = ({
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
  lowercase,
  noSpaces,
  //
  onChange,
  //
  type,
  label,
  labelCheckbox,
  placeholder,
  notTranslateLabels,
  notTranslatePlaceholder,
  notTranslateOptions,
  notTranslateQuestion,
  notTranslateError,
  translateType,
  showTagText,
  //
  size,
  className,
  classNameContainer,
  classNameLabel,
  classNameLabelCheckbox,
  classNameLabelRadio,
  readOnly,
  //
  after,
  before,
  icon,
  afterButton,
  beforeButton,
  //
  question,
  questionMin,
  questionDropdown,
  loading,
  //
  options,
  optgroups,
  drop,
  nowrite,
  startFocus,
  disabled,
  textSize,
  showTextSize,
  //
  min,
  max,
  step,
  //
  ...rest
}) => {
  const id = useId("a").replace(twoPointsReg, "");
  let inputContent = null;
  const beforeContent = icon ? <Icon type={icon} /> : null;

  const placeholderString = notTranslatePlaceholder
    ? placeholder
    : getI18Ntext(placeholder);

  /* DROP */
  const [isFocus, setIsFocus] = useState(false);
  const [waitBlur, setWaitBlur] = useState(false);
  const inputDropRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (startFocus && inputDropRef && inputDropRef.current) {
      inputDropRef.current.focus();
      setIsFocus(true);
    }
  }, [inputDropRef, startFocus]);

  useEffect(() => {
    if (startFocus && inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef, startFocus]);

  useEffect(() => {
    //let timer = null;
    if (waitBlur) {
      setWaitBlur(false);
      // timer =
      setTimeout(() => {
        setIsFocus(false);
      }, 200);
    }
  }, [waitBlur]);
  /* END DROP */

  switch (type) {
    case "select-hot":
      inputContent = (
        <SelectHot
          size={size}
          error={error}
          before={beforeContent}
          beforeButton={beforeButton}
          after={after}
          afterButton={afterButton}
          //
          name={name}
          value={value}
          options={options}
          placeholder={placeholderString}
          onChange={onChange}
          readOnly={readOnly}
          className={className}
          disabled={disabled}
        />
      );
      break;
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
            disabled={disabled}
            {...rest}
          >
            {loading ? null : (
              <option value="">
                {placeholderString || getI18Ntext("form.SelectOptInstruction")}
              </option>
            )}

            {optgroups
              ? options.map((optGroup, k) => {
                  if (loading) {
                    return null;
                  }
                  return (
                    <optgroup label={optGroup.text} key={k}>
                      {optGroup.value.map((opt) => {
                        return (
                          <option value={opt.value} key={opt.value}>
                            {opt.text}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })
              : options.map((opt) => {
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
            type === "switch" ? "form-switch" : "for-checkbox"
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
            disabled={disabled}
            {...rest}
          />
          <input
            type="hidden"
            value={value === "" ? "false" : value}
            name={name}
          />
          {type === "checkbox" ? (
            <div className="checkbox-btn primary">
              <div
                className={classNames("checkbox-btn-square", {
                  checked: value,
                  disabled,
                })}
                // onClick={() => {
                //   if (!disabled) onClick();
                // }}
              >
                <Icon type="check" />
              </div>
            </div>
          ) : null}
          {labelCheckbox ? (
            <>
              <label
                className={classNames(
                  "form-check-label",
                  classNameLabelCheckbox
                )}
                htmlFor={`checkbox-${id}`}
              >
                {notTranslateLabels
                  ? labelCheckbox
                  : getI18Ntext(labelCheckbox)}
              </label>
              <Question
                question={question}
                dropdown={questionDropdown}
                min={questionMin}
                noTranslateQuestion={notTranslateQuestion}
              />
            </>
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
                  disabled={disabled}
                  {...rest}
                />
                <label
                  className={classNames(
                    "form-check-label",
                    classNameLabelRadio
                  )}
                  htmlFor={`radio-${id}-${k}-${opt.value}`}
                >
                  {notTranslateOptions ? opt.text : getI18Ntext(opt.text)}
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
          disabled={disabled}
          {...rest}
        />
      );
      break;
    case "range-multiple":
      inputContent = (
        <RangeMultiple
          name={name}
          value={value}
          onChange={(newVal) => {
            onChange(newVal);
          }}
          min={min}
          max={max}
          step={step}
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
            placeholder={placeholderString}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            maxLength={textSize || 99999}
            type={type}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              error ? "is-invalid" : "",
              className
            )}
            readOnly={readOnly}
            disabled={disabled}
            {...rest}
          />
        </InputGroup>
      );
      break;
    case "textinfo":
      inputContent = (
        <div className={classNames("form-info-control", className)}>
          {value}
        </div>
      );
      break;

    case "select-multiple":
      inputContent = (
        <div
          className={classNames(
            "form-control form-select-multiple",
            error ? "is-invalid" : "",
            className,
            { disabled, readOnly }
          )}
        >
          {selectMultipleToArray(value).map((lab, k) => {
            const labText = (() => {
              const getText = (ops) => {
                const opsFiltered = ops.filter((o) => {
                  return `${o.value}` === `${lab}`;
                });
                if (opsFiltered[0]) {
                  return opsFiltered[0].text;
                }
                return "";
              };
              if (showTagText) {
                if (optgroups) {
                  let text = "";
                  options.forEach((og) => {
                    const t = getText(og.value);

                    if (t !== "") {
                      text = t;
                    }
                  });
                  return text;
                } else {
                  return getText(options);
                }
              }
              return lab;
            })();

            const tagText = notTranslateOptions
              ? labText
              : getI18Ntext(
                  `${translateType ? translateType + "." : ""}${labText}`
                );

            return (
              <div className="form-select-multiple_badge" key={k}>
                <span className="form-select-multiple_label">{tagText}</span>
                <span
                  className={classNames("form-select-multiple_icon", {
                    disabled: disabled || readOnly,
                  })}
                  onClick={() => {
                    if (!disabled && !readOnly) {
                      const arr = selectMultipleToArray(value);
                      const ind = arr.indexOf(lab);
                      // const resArr =
                      arr.splice(ind, 1);
                      onChange(arr.join(","));
                    }
                  }}
                >
                  <Icon />
                </span>
              </div>
            );
          })}
          <input type="hidden" name={name} value={value} disabled={disabled} />
          <select
            onChange={(e) => {
              const newValue =
                value + (value === "" ? e.target.value : "," + e.target.value);
              onChange(newValue);
            }}
            disabled={disabled}
          >
            {loading ? null : (
              <option value="">
                {placeholderString || getI18Ntext("form.SelectOptInstruction")}
              </option>
            )}
            {optgroups
              ? options.map((optGroup, k) => {
                  if (loading) {
                    return null;
                  }
                  return (
                    <optgroup label={optGroup.text} key={k}>
                      {optGroup.value.map((opt) => {
                        if (value.indexOf(opt.value) >= 0) {
                          return null;
                        }
                        if (loading) {
                          return null;
                        }
                        return (
                          <option value={opt.value} key={opt.value}>
                            {notTranslateOptions
                              ? opt.text
                              : getI18Ntext(opt.text)}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })
              : options.map((opt) => {
                  if (value.indexOf(opt.value) >= 0) {
                    return null;
                  }
                  if (loading) {
                    return null;
                  }
                  return (
                    <option value={opt.value} key={opt.value}>
                      {notTranslateOptions ? opt.text : getI18Ntext(opt.text)}
                    </option>
                  );
                })}
          </select>
          {value === "" && placeholderString !== "" ? (
            <div className="form-placeholder-float">{placeholderString}</div>
          ) : null}
        </div>
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
              // setWaitBlur(true);
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
            disabled={disabled}
            {...rest}
          />
          {nowrite ? (
            <div className="no-write">
              <input
                onClick={() => {
                  if (!isFocus) {
                    setIsFocus(true);
                  } else {
                    setWaitBlur(true);
                  }
                }}
                onFocus={() => {}}
                disabled={disabled}
              />
            </div>
          ) : null}
          {drop && isFocus ? (
            <div
              className="input-drop-pad_cont"
              onClick={() => {
                setWaitBlur(true);
              }}
            >
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
            maxLength={textSize || 99999}
            placeholder={placeholderString}
            onChange={(e) => {
              let val = lowercase
                ? e.target.value.toLocaleLowerCase()
                : e.target.value;
              if (noSpaces) {
                val = val.replace(/\s/g, "");
              }

              if (type === "phone") {
                val = e.target.value.replace(/\D/g, "");
              }
              onChange(val);
            }}
            type={type}
            className={classNames(
              readOnly ? "form-control-plaintext" : "form-control",
              type === "color" ? "form-control-color" : "",
              error ? "is-invalid" : "",
              className
            )}
            readOnly={readOnly}
            disabled={disabled}
            ref={inputRef}
            {...rest}
          />
        </InputGroup>
      );
  }

  return (
    <div className={classNames("input-container", classNameContainer)}>
      {label ? (
        <label className={classNames("form-label", classNameLabel)}>
          {notTranslateLabels ? label : getI18Ntext(label)}
          {required && !readOnly ? <span className="req">*</span> : null}
          {textSize && showTextSize ? (
            <span className="form-label-resume">{`(${getI18Ntext(
              "form.MaxTextSize"
            )} ${textSize} ${getI18Ntext("form.MaxTextCharaters")})`}</span>
          ) : null}
          <Question
            question={question}
            dropdown={questionDropdown}
            min={questionMin}
            noTranslateQuestion={notTranslateQuestion}
          />
        </label>
      ) : null}
      {inputContent}
      {error ? (
        <div className="invalid-feedback" style={{ display: "block" }}>
          {notTranslateError ? error : getI18Ntext(error)}
        </div>
      ) : null}
    </div>
  );
};

export default InputComp;
