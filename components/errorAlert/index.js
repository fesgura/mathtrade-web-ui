import { Alert } from "reactstrap";

const ErrorAlert = ({ errors }) => {
  return errors ? (
    <Alert color="danger" className="text-center">
      Ocurrió un error. Por favor, intenta nuevamente.
    </Alert>
  ) : null;
};

export default ErrorAlert;
