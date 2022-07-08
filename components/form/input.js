import InputUI from "./input-ui";
import { useState, useEffect } from "react";

const Input = ({
  data,
  name,
  //
  validations,
  validationStatus,
  setValidationStatus,
  //
  onChange,
  //
  type = "text",
  label,
  labelCheckbox,
  placeholder = "",
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
  options = [],
  //
  ...rest
}) => {
  const [value, setValue] = useState("");
  const [required, setRequired] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (data && typeof data[name] !== "undefined") {
      setValue(data[name]);
    }
  }, [data, name]);

  useEffect(() => {
    if (
      validations &&
      validations[name] &&
      validations[name].indexOf("required") >= 0
    ) {
      setRequired(true);
    }
  }, [validations, name]);

  useEffect(() => {
    setError((validationStatus && validationStatus[name]) || null);
  }, [validationStatus, name]);

  return (
    <InputUI
      name={name}
      value={value}
      required={required}
      error={error}
      //
      onChange={(v) => {
        setValue(v);
        if (error) {
          setError(null);
          setValidationStatus((vs) => {
            delete vs[name];
            return vs;
          });
        }
        if (onChange) {
          onChange(v);
        }
      }}
      //
      type={type}
      label={label}
      labelCheckbox={labelCheckbox}
      placeholder={placeholder}
      //
      size={size}
      className={className}
      classNameContainer={classNameContainer}
      readOnly={readOnly}
      //
      after={after}
      before={before}
      icon={icon}
      afterButton={afterButton}
      beforeButton={beforeButton}
      //
      question={question}
      loading={loading}
      //
      options={options}
      {...rest}
    />
  );
};
export default Input;
