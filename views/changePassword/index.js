import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import Icon from "components/icon";
import { Button, Alert } from "reactstrap";
import { LoadingBox } from "components/loading";

const ChangePasswordView = ({ loginUser, errors, loading }) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    }
  }, [errors]);

  const validations = {
    oldpassword: ["required"],
    password: ["required"],
    password2: [
      "required",
      function () {
        return passwordValue === password2Value
          ? null
          : "Las contraseñas no coinciden";
      },
    ],
  };
  return (
    <div className="relative py-3 px-4">
      <div className="text-center mb-4">
        <h4>Cambiar contraseña</h4>
        <p className="muted">Por favor, ingresa contraseña actual.</p>
      </div>
      <Form
        validations={validations}
        validationStatus={validationStatus}
        setValidationStatus={setValidationStatus}
        onSubmit={loginUser}
        format={(dataToSend) => {
          delete dataToSend.password2;
          return dataToSend;
        }}
      >
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Contraseña actual"
          name="oldpassword"
          type="password"
          icon="key"
        />
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Contraseña"
          name="password"
          placeholder="******"
          type="password"
          size="lg"
          icon="key"
          onChange={setPasswordValue}
        />
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Repetí la contraseña"
          name="password2"
          placeholder="******"
          type="password"
          size="lg"
          icon="key"
          onChange={setPassword2Value}
        />
        <hr />
        {errorMessage ? (
          <Alert color="danger" className="text-center">
            {errorMessage}
          </Alert>
        ) : null}
        <div className="text-center">
          <Button color="secondary" type="submit">
            Continuar <Icon type="chevron-right" />
          </Button>
        </div>
      </Form>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default ChangePasswordView;
