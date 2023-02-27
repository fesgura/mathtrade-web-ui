import classNames from "classnames";
import I18N from "i18n";
import { Alert } from "reactstrap";

const ErrorAlert = ({ errors, errorText, className }) => {
  return errors ? (
    <Alert color="danger" className={classNames("text-center", className)}>
      <I18N id={errorText || "error.General"} />
    </Alert>
  ) : null;
};

export default ErrorAlert;
