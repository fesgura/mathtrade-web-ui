import I18N from "@/i18n";
import clsx from "clsx";

const ErrorAlert = ({ error, errorMessage, className }) => {
  return error ? (
    <div
      className={clsx(
        "animate-fadein bg-danger text-white text-sm p-3 mb-3 rounded-md text-center",
        className
      )}
    >
      <I18N
        id={
          errorMessage
            ? errorMessage
            : typeof error === "string"
            ? error
            : "error.General"
        }
      />
    </div>
  ) : null;
};

export default ErrorAlert;
