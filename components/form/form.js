import { useCallback } from "react";
import _ from "lodash";
import applyValidations from "./validations";

const Form = ({
  children,
  onSubmit,
  validations = {},
  // validationStatus,
  setValidationStatus = () => {},
  setErrors = () => {},
  format = null,
  scrollTop,
}) => {
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      const errorsForm = {};

      for (let a in formProps) {
        if (validations[a]) {
          const error = applyValidations(formProps[a], validations[a]);
          if (error) {
            errorsForm[a] = error;
          }
        }
      }

      setValidationStatus(errorsForm);

      if (_.isEmpty(errorsForm)) {
        setErrors(null);
        onSubmit(format ? format(formProps) : formProps);
      } else {
        setErrors(errorsForm);
        if (scrollTop && window) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }
    },
    [onSubmit, format, validations, setValidationStatus, scrollTop, setErrors]
  );

  return (
    <form onSubmit={onSubmitForm} noValidate>
      {children}
    </form>
  );
};
export default Form;
