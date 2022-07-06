import { useState, useEffect } from "react";
import applyValidations from "./validations";
import InputComp from "./input";

const InputController = ({
  data,
  name,
  formStatus,
  setFormStatus,
  validation = [],
  //
  type = "text",
  label,
  size,
  className,
  classNameContainer,
  after = null,
  icon = null,
  before = null,
  loading = false,
  afterButton = null,
  beforeButton = null,
  options = [],
  labelCheckbox,
  readOnly = false,
  placeholder = "",
  question = null,
  onChange = null,
  compareValue = null,
  ...rest
}) => {
  const [initial, setInitial] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (initial) {
      setInitial(false);
      setFormStatus((obj) => {
        const value =
          data && typeof data[name] !== "undefined" ? data[name] : "";
        return {
          ...obj,
          [name]: {
            value,
            validation,
            error: applyValidations(value, validation, type, compareValue),
          },
        };
      });
    }
  }, [initial, name, data, setFormStatus, compareValue]);

  useEffect(() => {
    setFormStatus((obj) => {
      const value =
        obj && typeof obj[name] !== "undefined" && obj[name].value !== ""
          ? obj[name].value
          : data && typeof data[name] !== "undefined"
          ? data[name]
          : "";
      return {
        ...obj,
        [name]: {
          value,
          validation,
          error: applyValidations(value, validation, type, compareValue),
        },
      };
    });
  }, [data, setFormStatus, compareValue]);

  useEffect(() => {
    if (
      formStatus &&
      typeof formStatus[name] !== "undefined" &&
      formStatus[name].error &&
      formStatus.__SHOW_ERRORS__
    ) {
      setErrorMessage(formStatus[name].error);
    } else {
      setErrorMessage(null);
    }
  }, [name, formStatus]);

  return (
    <InputComp
      name={name}
      value={
        formStatus && typeof formStatus[name] !== "undefined"
          ? formStatus[name].value
          : ""
      }
      required={
        validation && validation.length && validation.indexOf("required") >= 0
      }
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
        setFormStatus((obj) => {
          const value = e.target.value;
          return {
            ...obj,
            [name]: {
              value,
              validation,
              error: applyValidations(value, validation, type, compareValue),
            },
          };
        });
      }}
      error={errorMessage}
      //
      type={type}
      label={label}
      size={size}
      loading={loading}
      className={className}
      classNameContainer={classNameContainer}
      after={after}
      icon={icon}
      before={before}
      afterButton={afterButton}
      beforeButton={beforeButton}
      options={options}
      labelCheckbox={labelCheckbox}
      readOnly={readOnly}
      placeholder={placeholder}
      question={question}
      {...rest}
    />
  );
};
export default InputController;
