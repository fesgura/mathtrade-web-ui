import { useCallback } from "react";
import _ from "lodash";
import applyValidations from "./validations";

const Form = ({
  children,
  onSubmit,
  validations = {},
  // validationStatus,
  setValidationStatus = () => {},
  format = null,
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
        onSubmit(format ? format(formProps) : formProps);
      }
    },
    [onSubmit, format, validations, setValidationStatus]
  );

  return (
    <form onSubmit={onSubmitForm} noValidate>
      {children}
    </form>
  );
};
export default Form;
