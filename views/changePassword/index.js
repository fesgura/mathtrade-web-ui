import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import Icon from "components/icon";
import { Button, Alert } from "reactstrap";
import { LoadingBox } from "components/loading";

const ChangePasswordView = ({ loginUser, errors, loading }) => {
  const [formStatus, setFormStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    }
  }, [errors]);
  return (
    <div className="relative py-3 px-4">
      <div className="text-center mb-4">
        <h4>Cambiar contraseña</h4>
        <p className="muted">Por favor, ingresa contraseña actual.</p>
      </div>
      <Form
        onSubmit={loginUser}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
      >
        <Input
          label="Contraseña actual"
          name="password"
          type="password"
          formStatus={formStatus}
          setFormStatus={setFormStatus}
          validation={["required"]}
          icon="key"
        />
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
