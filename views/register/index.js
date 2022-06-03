import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";
import Icon from "components/icon";

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
                    <h1>Creá tu cuenta</h1>
                    <p className="muted">
                      Completá los datos para crear tu cuenta
                    </p>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    formStatus={formStatus}
                    setFormStatus={setFormStatus}
                  >
                    <Input
                      label="Nombre y apellido"
                      name="name"
                      placeholder="Nombre y apellido"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                      //question="Ayudita"
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="email"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="envelope"
                    />
                    <Input
                      label="Teléfono"
                      name="phone"
                      type="phone"
                      placeholder="Teléfono"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="phone"
                    />
                    <Input
                      label="Telegram"
                      name="telegram"
                      placeholder="Telegram"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="telegram"
                    />

                    <div className="text-center py-4">
                      <Button color="primary" size="lg" type="submit">
                        Crear cuenta
                      </Button>
                    </div>
                  </Form>
                  <hr />
                  <div className="text-center">
                    <p className="muted small">
                      ¿Ya tenés cuenta, ingresá aquí:
                    </p>
                    <Link href={`/${publicRoutes.signin.path}`}>
                      <Button color="secondary" size="sm" outline>
                        Ingresar
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
