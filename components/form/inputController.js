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
  afterButton = null,
  beforeButton = null,
  options = [],
  labelCheckbox,
  readOnly = false,
  placeholder = "",
  question = null,
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
            error: applyValidations(value, validation, type),
          },
        };
      });
    }
  }, [initial, name, data, setFormStatus]);

  useEffect(() => {
    setFormStatus((obj) => {
      const value = data && typeof data[name] !== "undefined" ? data[name] : "";
      return {
        ...obj,
        [name]: {
          value,
          validation,
          error: applyValidations(value, validation, type),
        },
      };
    });
  }, [data, setFormStatus]);

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
        setFormStatus((obj) => {
          const value = e.target.value;
          return {
            ...obj,
            [name]: {
              value,
              validation,
              error: applyValidations(value, validation, type),
            },
          };
        });
      }}
      error={errorMessage}
      //
      type={type}
      label={label}
      size={size}
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
