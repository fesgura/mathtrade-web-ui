import { useCallback, useState } from "react";
import applyValidations from "./validations";

const formatsByType = (value, type) => {
  if (typeof value === "undefined") {
    return value;
  }
  const types = {
    boolean: (value) => value === "true",
    number: (value) => parseFloat(value),
    multiple: (value) => {
      const valueArray = value.split(",");
      if (valueArray.length === 1 && valueArray[0] === "") {
        return [];
      }
      return valueArray;
    },
  };

  return types[type] ? types[type](value) : value;
};

const useForm = (validations, formatTypes, onSubmit, showTopAlert) => {
  const [errorsComp, setErrorsComp] = useState({
    errors: null,
    hasErrors: false,
  });

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      Object.entries(formatTypes).forEach(([key, type]) => {
        formProps[key] = formatsByType(formProps[key], type);
      });

      const errorsForm = {};
      let withErrors = false;

      Object.entries(formProps).forEach(([key, value]) => {
        if (validations[key]) {
          const error = applyValidations(value, validations[key], formProps);
          if (error) {
            errorsForm[key] = error;
            withErrors = true;
          }
        }
      });

      if (!withErrors) {
        setErrorsComp({ errors: null, hasErrors: false });
        onSubmit(formProps);
      } else {
        setErrorsComp({ errors: errorsForm, hasErrors: true });
        if (showTopAlert && window) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    },
    [validations, formatTypes, onSubmit, showTopAlert]
  );
  return { ...errorsComp, onSubmitForm };
};

export default useForm;
