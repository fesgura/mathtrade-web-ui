import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";

const LoginView = ({ loading, errors, onSubmit, respOnSave }) => {
  const [formStatus, setFormStatus] = useState({});
  /*
  {
    nombre : {
      value:'',
      validation:[],
      error:null
    },
    apellido : {
      value:'',
      validation:[],
      error:null
    },
    __SHOW_ERRORS__:false
  }
*/
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
                    <h1>Hola!</h1>
                    <p className="muted">
                      Ingresa con tu nombre email y contraseña
                    </p>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    formStatus={formStatus}
                    setFormStatus={setFormStatus}
                  >
                    <Input
                      label="Nombre de usuario"
                      name="username"
                      placeholder="Nombre de usuario"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                    />
                    <Input
                      label="Contraseña"
                      name="password"
                      type="password"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
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
