const validationTypes = {
  required: (value) => {
    if (!value || value === "") {
      return "Este campo es requerido";
    }
    return null;
  },
  email: (value) => {
    if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Completa el email correctamente";
    }
    return null;
  },
  phone: (value) => {
    if (value && !/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(value)) {
      return "Completa el teléfono correctamente";
    }
    return null;
  },
};

const applyValidations = (value, validation, type) => {
  let error = null;

  const validationsToApply = validation && validation.length ? validation : [];

  switch (type) {
    case "email":
      if (validationsToApply.indexOf("email") < 0) {
        validationsToApply.push("email");
      }
      break;
    case "phone":
      if (validationsToApply.indexOf("phone") < 0) {
        validationsToApply.push("phone");
      }
      break;
    default:
    //
  }

  if (validationsToApply.length) {
    validationsToApply.forEach((name) => {
      if (typeof name === "string" && validationTypes[name]) {
        error = error || validationTypes[name](value);
      }
      if (typeof name === "function") {
        error = error || name.apply(null, [value]);
      }
    });
  }

  return error;
};

export default applyValidations;
