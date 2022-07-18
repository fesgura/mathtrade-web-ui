import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input, Hidden } from "components/form";
import { locationsToOptions } from "utils";
import Icon from "components/icon";
import TestBGGuser from "components/testBGGuser";

const RegisterView = ({
  errors,
  loading,
  dataLocations,
  loadingLocations,
  onSubmit,
  isSuccess,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");
  const [avatar, setAvatar] = useState("");
  const [BGGuser, setBGGuser] = useState("");

  const [validBGGuser, onValidateBGGuser] = useState(null);

  useEffect(() => {
    if (errors) {
      let errorMge = "Ocurrió un error. Por favor, intenta nuevamente.";
      setErrorMessage(errorMge);
    } else {
      setErrorMessage(null);
    }
  }, [errors]);

  const validations = {
    username: ["required"],
    password: ["required"],
    password2: [
      "required",
      function () {
        return passwordValue === password2Value
          ? null
          : "Las contraseñas no coinciden";
      },
    ],
    first_name: ["required"],
    last_name: ["required"],
    email: ["required", "email"],
    phone: ["required", "phone"],
    whatsapp: ["phone"],
    location: ["required"],
    bgg_user: [
      "required",
      function () {
        validBGGuser;
        return !validBGGuser
          ? "Tenés que comprobar tu usuario en BGG."
          : validBGGuser === "no"
          ? "Este usuario no aparece en la BGG."
          : null;
      },
    ],
  };

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
                  {isSuccess ? (
                    <div className="fade-in">
                      <div className="text-center mb-4">
                        <h1>¡Listo!</h1>
                        <p className="muted">
                          ¡Genial! Tu cuenta <b>ha sido creada</b>.<br></br>
                          Ya podés ingresar:
                        </p>
                      </div>
                      <div className="text-center py-4">
                        <Link href={`/${publicRoutes.signin.path}`}>
                          <Button color="secondary" size="lg">
                            Ingresar
                          </Button>
                        </Link>
                      </div>
                      <hr className="mb-0" />
                    </div>
                  ) : (
                    <>
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
                        validations={validations}
                        validationStatus={validationStatus}
                        setValidationStatus={setValidationStatus}
                        onSubmit={onSubmit}
                        format={(dataToSend) => {
                          delete dataToSend.password2;
                          return dataToSend;
                        }}
                      >
                        <hr />
                        <h5 className="text-center py-4 m-0">
                          Datos de ingreso
                        </h5>
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Nombre de usuario"
                          name="username"
                          placeholder="Nombre"
                          size="lg"
                          icon="user"
                          question="Tu nombre de usuario. Lo necesitarás para poder ingresar al sistema."
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

                        <h5 className="text-center py-4 m-0">
                          Datos de tu cuenta
                        </h5>
                        <Hidden name="avatar" value={avatar} />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Nombre"
                          name="first_name"
                          placeholder="Nombre"
                          size="lg"
                          icon="user"
                          //question="Ayudita"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Apellido"
                          name="last_name"
                          placeholder="Apellido"
                          size="lg"
                          icon="user"
                          //question="Ayudita"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="email"
                          size="lg"
                          icon="envelope"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Teléfono"
                          name="phone"
                          type="phone"
                          placeholder="Teléfono"
                          size="lg"
                          icon="phone"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="WhatsApp"
                          name="whatsapp"
                          type="phone"
                          placeholder="Teléfono"
                          size="lg"
                          icon="whatsapp"
                        />
                        <Input
                          label="Telegram"
                          name="telegram"
                          placeholder="Telegram"
                          size="lg"
                          icon="telegram"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Ubicación"
                          name="location"
                          type="select"
                          options={locationsToOptions(dataLocations)}
                          loading={loadingLocations}
                          size="lg"
                          icon="map-marker"
                          question="Si no aparece tu ciudad, o no estás cerca de ninguna de las ciudades del listado, por favor contactate con la organización."
                        />
                        <hr />
                        <h5 className="text-center py-4 m-0">
                          Datos desde BGG
                        </h5>
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Usuario en la BGG"
                          name="bgg_user"
                          placeholder="Usuario BGG"
                          size="lg"
                          icon="bgg"
                          question="Podés poner tu alias en la BGG."
                          onChange={(v) => {
                            setBGGuser(v);
                            onValidateBGGuser(null);
                          }}
                          after={
                            validBGGuser ? (
                              <Icon
                                type={
                                  validBGGuser === "yes" ? "check" : "times"
                                }
                                className={
                                  validBGGuser === "yes"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              />
                            ) : null
                          }
                          classNameContainer="mb-2"
                        />
                        <div className="text-center">
                          <TestBGGuser
                            username={BGGuser}
                            onValidateUser={onValidateBGGuser}
                            onGetAvatar={(avatarlink) => {
                              setAvatar(avatarlink);
                            }}
                          />
                        </div>
                        <Hidden name="referred" value="Luis Olcese" />
                        <hr />
                        {errorMessage ? (
                          <Alert color="danger" className="text-center">
                            {errorMessage}
                          </Alert>
                        ) : null}
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
                    </>
                  )}
                </CardBody>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default RegisterView;
