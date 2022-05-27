import classNames from "classnames";
import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Alert } from "reactstrap";
import { LoadingBox } from "components/loading";

// const isEmpty = (o) => {
//   return Object.keys(o).length === 0 && o.constructor === Object;
// };

const Form = ({
  onSubmit,
  data = {},
  className,
  errorText,
  children,
  footer = null,
  respOnSave,
  errors,
  loading,
}) => {
  const methods = useForm({ defaultValues: data });

  const [showRespOnSave, set_howRespOnSave] = useState(false);

  // useEffect(() => {
  //   methods.reset(data);
  // }, [methods, data]);

  useEffect(() => {
    let timer = null;
    if (respOnSave) {
      set_howRespOnSave(true);
      timer = setTimeout(() => {
        set_howRespOnSave(false);
      }, 1600);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [respOnSave]);

  return (
    <div className={classNames("form-container", { loading })}>
      {errors ? (
        <Alert color="danger" className="text-center">
          {errors.error}
        </Alert>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={classNames("form-react", className)}
            noValidate
          >
            {children}
            {/* {errorText && !isEmpty(methods.formState.errors) ? (
              <Alert color="danger" className="text-center">
                {errorText}
              </Alert>
            ) : null} */}

            {showRespOnSave ? (
              <Alert color="success" className="text-center">
                Data saved!
              </Alert>
            ) : null}
            {footer}
          </form>
        </FormProvider>
      )}

      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default Form;
