import classNames from "classnames";
import I18N from "i18n";
import { Alert } from "reactstrap";

const ErrorAlert = ({ errors, className }) => {
  return errors ? (
    <Alert color="danger" className={classNames("text-center", className)}>
      <I18N id="error.General" />
    </Alert>
  ) : null;
};

export default ErrorAlert;
