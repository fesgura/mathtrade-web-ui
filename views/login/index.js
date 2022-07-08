import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";

const dataInitial = null; //{ username: "math", password: "MeepleLand" };

const validations = {
  username: ["required"],
  password: ["required"],
};

const LoginView = ({ loading, errors, onSubmit }) => {
  const [validationStatus, setValidationStatus] = useState({});

  return (
    <PublicLayout loading={loading}>
      <Row className="justify-content-center">
        <Col lg={10} md={6}>
          <Card>
            <Row className="align-items-stretch g-0">
              <Col lg={6}>
                <LoginSlider />
              </Col>
              <Col lg={6}>
                <CardBody className="p-5">
                  <div className="text-center mb-4">
                    <h1>¡Hola!</h1>
                    <p className="muted">
                      Ingresa con tu nombre email y contraseña
                    </p>
                  </div>
                  <Form
                    validations={validations}
                    validationStatus={validationStatus}
                    setValidationStatus={setValidationStatus}
                    onSubmit={onSubmit}
                  >
                    <Input
                      data={dataInitial}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Nombre de usuario"
                      name="username"
                      placeholder="Nombre de usuario"
                      size="lg"
                      icon="user"
                    />
                    <Input
                      data={dataInitial}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="Contraseña"
                      name="password"
                      type="password"
                      size="lg"
                      icon="key"
                    />
                    {errors ? (
                      <Alert color="danger" className="text-center">
                        Error, usuario y/o contraseña incorrectos.
                      </Alert>
                    ) : null}
                    <div className="text-center py-4">
                      <Button color="primary" size="lg" type="submit">
                        Ingresar
                      </Button>
                    </div>
                  </Form>
                  <hr />
                  <div className="text-center">
                    <p className="muted small">
                      Si todavía no creaste tu cuenta, podés hacerlo aquí:
                    </p>
                    <Link href={`/${publicRoutes.signup.path}`}>
                      <Button color="secondary" size="sm" outline>
                        Registrate
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default LoginView;
