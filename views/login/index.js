import { useState } from "react";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";
import Icon from "components/icon";

const data = {
  nombre: "Pablito",
  apellido: "Cazorla",
  puede: true,
};

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
    <PublicLayout>
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
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="email"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      before={<Icon type="user" />}
                    />
                    <Input
                      label="Contraseña"
                      name="password"
                      type="password"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      before={<Icon type="key" />}
                    />

                    <div className="text-center py-4">
                      <Button color="primary" size="lg" type="submit">
                        Ingresar
                      </Button>
                    </div>
                  </Form>
                  {/* <Form
                    onSubmit={onSubmit}
                    //data={data}
                    loading={loading}
                    respOnSave={respOnSave}
                    errors={errors}
                    errorText="Please, Correct!!!"
                    footer={
                      <div className="text-center py-4">
                        <Button color="primary" size="lg" type="submit">
                          Ingresar
                        </Button>
                      </div>
                    }
                  >
                    <Input
                      name="email"
                      label="Email"
                      type="email"
                      required
                      size="lg"
                    />
                    <Input
                      name="password"
                      label="Contraseña"
                      type="password"
                      required
                      size="lg"
                      classNameContainer="mb-0"
                    />
                    <div className="text-end">
                      <a href="#" className="smallest">
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                  </Form> */}
                  <hr />
                  <div className="text-center">
                    <p className="muted small">
                      Si todavía no creaste tu cuenta, podés hacerlo aquí:
                    </p>
                    <Button color="secondary" size="sm" outline href="#">
                      Registrate
                    </Button>
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
