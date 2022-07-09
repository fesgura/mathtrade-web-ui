import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import Icon from "components/icon";
import { Button, Alert } from "reactstrap";
import { LoadingBox } from "components/loading";

const ChangePasswordView = ({
  setIsOpenModalPassword,
  onSubmit,
  errors,
  loading,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      if (errors?.data?.old_password) {
        errorMge = "La contraseña actual es incorrecta.";
      }
      setErrorMessage(errorMge);
    }
  }, [errors]);

  const validations = {
    old_password: ["required"],
    new_password: ["required"],
    new_password2: [
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
      </div>
      <Form
        validations={validations}
        validationStatus={validationStatus}
        setValidationStatus={setValidationStatus}
        onSubmit={onSubmit}
        format={(dataToSend) => {
          delete dataToSend.new_password2;
          return dataToSend;
        }}
      >
        <p className="muted text-center">
          Por favor, ingresa contraseña actual, luego tu nueva contraseña.
        </p>
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Contraseña actual"
          name="old_password"
          type="password"
          icon="key"
        />
        <hr />
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Nueva contraseña"
          name="new_password"
          placeholder="******"
          type="password"
          icon="key"
          onChange={setPasswordValue}
        />
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="Repetí la nueva contraseña"
          name="new_password2"
          placeholder="******"
          type="password"
          icon="key"
          onChange={setPassword2Value}
        />

        {errorMessage ? (
          <Alert color="danger" className="text-center">
            {errorMessage}
          </Alert>
        ) : null}
        <Alert color="warning" className="text-center">
          Recuerda que luego <b>deberás volver a ingresar</b> con{" "}
          <b>tu nueva contraseña</b>.
        </Alert>
        <div className="text-center">
          <Button
            className="me-2"
            color="cancel"
            onClick={() => {
              setIsOpenModalPassword(false);
            }}
          >
            Cancelar
          </Button>
          <Button color="secondary" type="submit">
            Cambiar contraseña
          </Button>
        </div>
      </Form>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default ChangePasswordView;
