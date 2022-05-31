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
};

const applyValidations = (value, validation, type) => {
  let error = null;

  const validationsToApply = validation && validation.length ? validation : [];

  switch (type) {
    case "email":
      validationsToApply.push("email");
      break;
    default:
    //
  }

  if (validationsToApply.length) {
    validationsToApply.forEach((name) => {
      if (validationTypes[name]) {
        error = error || validationTypes[name](value);
      }
    });
  }

  return error;
};

export default applyValidations;
