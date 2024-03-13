const validationTypes = {
  required: (value) => {
    if (!value || value === "") {
      return "validation.required";
    }
    return null;
  },
  email: (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "validation.email";
    }
    return null;
  },
  phone: (value) => {
    if (
      value &&
      !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g.test(
        value
      )
    ) {
      return "validation.phone";
    }
    return null;
  },
  password: (value) => {
    if (value && value.length < 8) {
      return "validation.password";
    }
    return null;
  },
};

const applyValidations = (value, validationsToApply, formProps) => {
  let error = null;

  if (validationsToApply.length) {
    validationsToApply.forEach((validation) => {
      if (typeof validation === "string" && validationTypes[validation]) {
        error = error || validationTypes[validation](value);
      }
      if (typeof validation === "function") {
        error = error || validation.apply(null, [value, formProps]);
      }
    });
  }

  return error;
};

export default applyValidations;
