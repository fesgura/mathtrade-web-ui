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
        <Col xl={5} lg={6} md={7} sm={9}>
          <Card>
            <CardBody className="p-5">
              <div className="text-center mb-4">
                <h1>Nueva contraseña</h1>
                <p className="muted">Ingresa tu nueva contraseña</p>
              </div>
              <Form
                onSubmit={onSubmit}
                formStatus={formStatus}
                setFormStatus={setFormStatus}
              >
                <Input
                  label="Nueva contraseña"
                  name="password"
                  type="password"
                  formStatus={formStatus}
                  setFormStatus={setFormStatus}
                  validation={["required"]}
                  size="lg"
                  icon="key"
                />
                <Input
                  label="Repetir nueva contraseña"
                  name="password2"
                  type="password"
                  formStatus={formStatus}
                  setFormStatus={setFormStatus}
                  validation={[
                    "required",
                    (password2) => {
                      const password = formStatus.password.value;
                      return password2 !== password
                        ? "Las contraseñas no coinciden"
                        : null;
                    },
                  ]}
                  size="lg"
                  icon="key"
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
