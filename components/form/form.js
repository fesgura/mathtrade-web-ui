import { useCallback } from "react";

import { Form } from "reactstrap";

const FormComp = ({ onSubmit, formStatus, setFormStatus, children }) => {
  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formProps = Object.fromEntries(formData);

      const formToSend = {};

      let __SHOW_ERRORS__ = false;

      for (let a in formProps) {
        if (formStatus && formStatus[a] && formStatus[a].error) {
          __SHOW_ERRORS__ = true;
        } else {
          if (a.indexOf("__excluded__") !== 0) {
            formToSend[a] = formProps[a];
          }
        }
      }
      setFormStatus((obj) => {
        return {
          ...obj,
          __SHOW_ERRORS__,
        };
      });
      if (!__SHOW_ERRORS__) {
        onSubmit(formToSend);
      }
    },
    [onSubmit, formStatus, setFormStatus]
  );

  return (
    <form onSubmit={onSubmitForm} noValidate>
      {children}
    </form>
  );
};
export default FormComp;
