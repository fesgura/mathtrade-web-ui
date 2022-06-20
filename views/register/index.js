import { useState, useEffect } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";
import { locationsToOptions } from "utils";
import Icon from "components/icon";

const LoginView = ({
  dataInitial = null,
  loading,
  dataLocations,
  loadingLocations,
  onSubmit,
  respOnSave,
}) => {
  const [formStatus, setFormStatus] = useState({});

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
                  {/* <div className="text-danger text-center">
                    No está abierta la registración por el momento.
                  </div> */}
                  <Form
                    onSubmit={onSubmit}
                    formStatus={formStatus}
                    setFormStatus={setFormStatus}
                  >
                    <hr />
                    <h5 className="text-center py-4 m-0">Datos de ingreso</h5>
                    <Input
                      data={dataInitial}
                      label="Nombre de usuario"
                      name="username"
                      placeholder="Nombre"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                      //question="Ayudita"
                    />
                    <Input
                      data={dataInitial}
                      label="Contraseña"
                      name="password"
                      placeholder="******"
                      type="password"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                      //question="Ayudita"
                    />
                    <Input
                      data={dataInitial}
                      label="Repetí la contraseña"
                      name="password2"
                      placeholder="******"
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
                      icon="user"
                      //question="Ayudita"
                    />{" "}
                    <hr />
                    <h5 className="text-center py-4 m-0">Datos de tu cuenta</h5>
                    <Input
                      data={dataInitial}
                      label="Nombre"
                      name="first_name"
                      placeholder="Nombre"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                      //question="Ayudita"
                    />
                    <Input
                      data={dataInitial}
                      label="Apellido"
                      name="last_name"
                      placeholder="Apellido"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="user"
                      //question="Ayudita"
                    />
                    <Input
                      data={dataInitial}
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
                      data={dataInitial}
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
                      data={dataInitial}
                      label="WhatsApp"
                      name="whatsapp"
                      type="phone"
                      placeholder="Teléfono"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="whatsapp"
                    />
                    <Input
                      data={dataInitial}
                      label="Telegram"
                      name="telegram"
                      placeholder="Telegram"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="telegram"
                    />
                    <Input
                      data={dataInitial}
                      label="Ubicación"
                      name="location"
                      type="select"
                      options={locationsToOptions(dataLocations)}
                      loading={loadingLocations}
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      size="lg"
                      icon="map-marker"
                      question="Si no aparece tu ciudad, o no estás cerca de ninguna de las ciudades del listado, por favor contactate con la organización."
                    />
                    <hr />
                    <h5 className="text-center py-4 m-0">Datos desde BGG</h5>
                    <Input
                      data={dataInitial}
                      label="Usuario en la BGG"
                      name="bgg_user"
                      placeholder="Usuario BGG"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      size="lg"
                      icon="bgg"
                      question="Podés poner tu alias en la BGG."
                      validation={["required"]}
                    />
                    <input type="hidden" name="referred" value="Luis Olcese" />
                    <hr />
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
