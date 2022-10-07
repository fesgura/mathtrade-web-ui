import { useState } from "react";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import { Form, Input } from "components/form";

const LoginView = ({ loading, onSubmit }) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  const validations = {
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
    <PublicLayout loading={loading}>
      <Row className="justify-content-center">
        <Col xl={5} lg={6} md={7} sm={9}>
          <Card>
            <CardBody className="p-5">
              <div className="text-center mb-4">
                <h1>Nueva contraseña</h1>
                <p className="muted">Ingresa tu nueva contraseña</p>
              </div>
              <Form
                onSubmit={onSubmit}
                validations={validations}
                validationStatus={validationStatus}
                setValidationStatus={setValidationStatus}
                format={(dataToSend) => {
                  delete dataToSend.password2;
                  return dataToSend;
                }}
              >
                <Input
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="Nueva contraseña"
                  name="password"
                  type="password"
                  size="lg"
                  icon="key"
                  onChange={setPasswordValue}
                />
                <Input
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="Repetir nueva contraseña"
                  name="password2"
                  type="password"
                  size="lg"
                  icon="key"
                  onChange={setPassword2Value}
                />

                <div className="text-center pt-4">
                  <Button color="primary" size="lg" type="submit">
                    Cambiar
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default LoginView;
