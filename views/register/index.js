import { useState, useEffect } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input, Hidden } from "components/form";
import { locationsToOptions } from "utils";
import Icon from "components/icon";
import TestBGGuser from "components/testBGGuser";
import I18N, { getI18Ntext } from "i18n";

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
      let errorMge = getI18Ntext("error.General");
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
          : getI18Ntext("validation.passwordNotMatch");
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
          ? getI18Ntext("validation.BGGuser")
          : validBGGuser === "no"
          ? getI18Ntext("validation.BGGuserDoesNotExist")
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
                        <h1>
                          <I18N id="register.ReadyTitle" />
                        </h1>
                        <p className="muted">
                          <I18N id="register.ReadySubtitle" forHtml />
                        </p>
                      </div>
                      <div className="text-center py-4">
                        <Link href={`/${publicRoutes.signin.path}`}>
                          <Button color="secondary" size="lg">
                            <I18N id="btn.Enter" />
                          </Button>
                        </Link>
                      </div>
                      <hr className="mb-0" />
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-4">
                        <h1>
                          <I18N id="register.Title" />
                        </h1>
                        <p className="muted">
                          <I18N id="register.Subtitle" />
                        </p>
                      </div>
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
                          <I18N id="register.EnterData" />
                        </h5>
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Username"
                          name="username"
                          placeholder="form.Username"
                          size="lg"
                          icon="user"
                          question="form.Username.help"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Password"
                          name="password"
                          placeholder="******"
                          notTranslatePlaceholder
                          type="password"
                          size="lg"
                          icon="key"
                          onChange={setPasswordValue}
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.PasswordRepeat"
                          name="password2"
                          placeholder="******"
                          notTranslatePlaceholder
                          type="password"
                          size="lg"
                          icon="key"
                          onChange={setPassword2Value}
                        />
                        <hr />

                        <h5 className="text-center py-4 m-0">
                          <I18N id="register.AccountData" />
                        </h5>
                        <Hidden name="avatar" value={avatar} />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.FirstName"
                          name="first_name"
                          placeholder="form.FirstName"
                          size="lg"
                          icon="user"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.LastName"
                          name="last_name"
                          placeholder="form.LastName"
                          size="lg"
                          icon="user"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Email"
                          name="email"
                          type="email"
                          placeholder="form.Email"
                          size="lg"
                          icon="envelope"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Phone"
                          name="phone"
                          type="phone"
                          placeholder="form.Phone"
                          size="lg"
                          icon="phone"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="WhatsApp"
                          notTranslateLabels
                          name="whatsapp"
                          type="phone"
                          placeholder="form.Phone"
                          size="lg"
                          icon="whatsapp"
                        />
                        <Input
                          label="Telegram"
                          name="telegram"
                          notTranslateLabels
                          notTranslatePlaceholder
                          placeholder="Telegram"
                          size="lg"
                          icon="telegram"
                        />
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Location"
                          name="location"
                          type="select"
                          options={locationsToOptions(dataLocations)}
                          loading={loadingLocations}
                          size="lg"
                          icon="map-marker"
                          question="form.Location.help"
                        />
                        <hr />
                        <h5 className="text-center py-4 m-0">
                          <I18N id="register.BGGdata" />
                        </h5>
                        <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.BGGuser"
                          name="bgg_user"
                          placeholder="form.BGGuser"
                          size="lg"
                          icon="bgg"
                          question="form.BGGuser.help"
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
                          <I18N id="register.AlreadyHaveAccount" />
                        </p>
                        <Link href={`/${publicRoutes.signin.path}`}>
                          <Button color="secondary" size="sm" outline>
                            <I18N id="btn.Enter" />
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
