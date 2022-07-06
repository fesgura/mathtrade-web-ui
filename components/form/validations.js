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
    if (
      value &&
      !/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/g.test(
        value
      )
    ) {
      return "Completa el teléfono correctamente";
    }
    return null;
  },
  password: (value) => {
    if (value && value.length < 8) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    return null;
  },
};

const applyValidations = (value, validation, type, compareValue) => {
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
    case "password":
      if (validationsToApply.indexOf("password") < 0) {
        validationsToApply.push("password");
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
        error = error || name.apply(null, [value, compareValue]);
      }
    });
  }

  return error;
};

export default applyValidations;
