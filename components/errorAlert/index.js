import classNames from "classnames";
import { Alert } from "reactstrap";

const ErrorAlert = ({ errors, className }) => {
  return errors ? (
    <Alert color="danger" className={classNames("text-center", className)}>
      Ocurrió un error. Por favor, intenta nuevamente.
    </Alert>
  ) : null;
};

export default ErrorAlert;
