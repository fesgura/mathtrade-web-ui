import useInputContainer from "./useInputContainer";
import clsx from "clsx";
import I18N, { getI18Ntext } from "@/i18n";

const Input = ({
  validate,
  error,
  className = "mb-4",
  children,
  customErrorText,
}) => {
  const { errorMessage } = useInputContainer(validate, error);

  return (
    <div
      className={clsx(className, { "is-invalid": errorMessage })}
      aria-invalid={errorMessage ? true : null}
      aria-errormessage={errorMessage ? getI18Ntext(errorMessage) : null}
    >
      {children}
      {errorMessage && (
        <div className="text-danger text-sm">
          <I18N id={customErrorText || errorMessage} />
        </div>
      )}
    </div>
  );
};

export default Input;
