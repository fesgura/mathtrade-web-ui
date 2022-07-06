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
  const [formStatus, setFormStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const [modified, setModified] = useState(false);

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
                    formStatus={formStatus}
                    setFormStatus={setFormStatus}
                  >
                    <h5 className="py-4 m-0">Datos de ingreso</h5>
                    <Row className="align-items-end">
                      <Col md={6}>
                        <Input
                          data={data}
                          label="Nombre de usuario"
                          name="username"
                          placeholder="Nombre"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
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
                          label="Nombre"
                          name="first_name"
                          placeholder="Nombre"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
                          icon="user"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Input
                          data={data}
                          label="Apellido"
                          name="last_name"
                          placeholder="Apellido"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
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
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="email"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
                          icon="envelope"
                          onChange={() => {
                            setModified(true);
                          }}
                        />
                      </Col>
                      <Col md={5}>
                        <Input
                          data={data}
                          label="Ubicación"
                          name="location"
                          type="select"
                          options={locationsToOptions(dataLocations)}
                          loading={loadingLocations}
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
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
                          label="Teléfono"
                          name="phone"
                          type="phone"
                          placeholder="Teléfono"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
                          icon="phone"
                          onChange={() => {
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
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
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
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          validation={["required"]}
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
                          label="Usuario en la BGG"
                          name="bgg_user"
                          placeholder="Usuario BGG"
                          formStatus={formStatus}
                          setFormStatus={setFormStatus}
                          icon="bgg"
                          question="Podés poner tu alias en la BGG."
                          compareValue={validBGGuser}
                          validation={[
                            "required",
                            (v, compareValue) => {
                              return !compareValue
                                ? "Tenés que comprobar tu usuario en BGG."
                                : compareValue === "no"
                                ? "Este usuario no aparece en la BGG."
                                : null;
                            },
                          ]}
                          onChange={() => {
                            setModified(true);
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
                            username={formStatus?.bgg_user?.value}
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
