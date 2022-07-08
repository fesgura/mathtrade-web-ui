import { useState, useEffect } from "react";
import Router from "next/router";
import PrivateLayout from "layouts/private";
import PageHeader from "components/pageHeader";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Alert,
  Modal,
  ModalBody,
} from "reactstrap";
import { Form, Input } from "components/form";
import { locationsToOptions } from "utils";
import TestBGGuser from "components/testBGGuser";
import Icon from "components/icon";
import UserAvatar from "components/avatar";
import ChangePassword from "containers/changePassword";

const MyAccountView = ({
  data,
  loading,
  dataLocations,
  loadingLocations,
  onSubmit,
  errors,
}) => {
  const [validationStatus, setValidationStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [modified, setModified] = useState(false);

  const [BGGuser, setBGGuser] = useState(
    data && data.bgg_user ? data.bgg_user : ""
  );
  const [validBGGuser, onValidateBGGuser] = useState("yes");

  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);

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
    <PrivateLayout loading={loading}>
      <Row className="justify-content-center">
        <Col xl={12}>
          <PageHeader title="Mi cuenta" />
          <Card>
            <CardBody className="pe-5">
              <Row>
                <Col md={3}>
                  <div className="p-5">
                    <div
                      style={{
                        maxWidth: 120,
                        margin: "0 auto",
                      }}
                    >
                      <UserAvatar size="full" />
                    </div>
                    <div className="text-center pt-3">
                      <h4 className="m-0">{data?.username}</h4>
                      <p className="m-0">
                        ({`${data?.first_name} ${data?.last_name}`})
                      </p>
                      <p>
                        <b>BGG:</b> <em>{data?.bgg_user}</em>
                      </p>
                    </div>
                  </div>
                </Col>
                <Col md={9}>
                  <Form
                    onSubmit={(formData) => {
                      onSubmit(data.id, formData);
                    }}
                    validations={validations}
                    validationStatus={validationStatus}
                    setValidationStatus={setValidationStatus}
                  >
                    <h5 className="py-4 m-0">Datos de ingreso</h5>
                    <Row className="align-items-end">
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Nombre de usuario"
                          name="username"
                          placeholder="Nombre"
                          icon="user"
                          question="Tu nombre de usuario lo necesitarás para poder ingresar al sistema."
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      {/* <Col xs="auto">
                        <div className="pb-4">
                          <Button
                            outline
                            color="info"
                            size="sm"
                            onClick={() => {
                              setIsOpenModalPassword(true);
                            }}
                          >
                            Modificar contraseña
                          </Button>
                        </div>
                      </Col> */}
                    </Row>

                    {/* <Input
                      data={data}
                      label="Contraseña"
                      name="password"
                      placeholder="******"
                      type="password"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      validation={["required"]}
                      icon="user"
                    />
                    <Input
                      data={data}
                      label="Repetí la contraseña"
                      name="password2"
                      placeholder="******"
                      type="password"
                      formStatus={formStatus}
                      setFormStatus={setFormStatus}
                      compareValue={formStatus?.password?.value}
                      validation={[
                        "required",
                        (password2, compareValue) => {
                          return password2 !== compareValue
                            ? "Las contraseñas no coinciden"
                            : null;
                        },
                      ]}
                      icon="user"
                    />{" "} */}
                    <hr />
                    <h5 className="py-4 m-0">Datos de tu cuenta</h5>
                    <Row>
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Nombre"
                          name="first_name"
                          placeholder="Nombre"
                          icon="user"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Apellido"
                          name="last_name"
                          placeholder="Apellido"
                          icon="user"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={7}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="email"
                          icon="envelope"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Ubicación"
                          name="location"
                          type="select"
                          options={locationsToOptions(dataLocations)}
                          loading={loadingLocations}
                          icon="map-marker"
                          question="Si no aparece tu ciudad, o no estás cerca de ninguna de las ciudades del listado, por favor contactate con la organización."
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Teléfono"
                          name="phone"
                          type="phone"
                          placeholder="Teléfono"
                          icon="phone"
                          onChange={(v) => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <Input
                          data={data}
                          label="WhatsApp"
                          name="whatsapp"
                          type="phone"
                          placeholder="Teléfono"
                          icon="whatsapp"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={4}>
                        <Input
                          data={data}
                          label="Telegram"
                          name="telegram"
                          placeholder="Telegram"
                          icon="telegram"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                    </Row>
                    <hr />
                    <h5 className="py-4 m-0">Datos desde BGG</h5>
                    <Row className="align-items-end">
                      <Col>
                        <Input
                          data={data}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="Usuario en la BGG"
                          name="bgg_user"
                          placeholder="Usuario BGG"
                          icon="bgg"
                          question="Podés poner tu alias en la BGG."
                          onChange={(v) => {
                            setModified(true);
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
                      </Col>
                      <Col xs="auto">
                        <div className="pb-2">
                          <TestBGGuser
                            username={BGGuser}
                            onValidateUser={onValidateBGGuser}
                          />
                        </div>
                      </Col>
                    </Row>

                    <input type="hidden" name="referred" value="Luis Olcese" />
                    <hr />
                    {errorMessage ? (
                      <Alert color="danger" className="text-center">
                        {errorMessage}
                      </Alert>
                    ) : null}
                    <div className="text-center py-4">
                      <Button
                        color="link"
                        tag="a"
                        className="me-2"
                        outline
                        onClick={(e) => {
                          e.preventDefault();
                          Router.push("/");
                        }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        disabled={!modified}
                        size="lg"
                      >
                        Guardar cambios
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal
        isOpen={isOpenModalPassword}
        centered
        toggle={() => {
          setIsOpenModalPassword((v) => !v);
        }}
      >
        <ModalBody>{isOpenModalPassword ? <ChangePassword /> : null}</ModalBody>
      </Modal>
    </PrivateLayout>
  );
};

export default MyAccountView;
