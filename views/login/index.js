import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";
import LinkInternal from "components/link-internal";

const dataInitial = null; //{ username: "math", password: "MeepleLand" };

const LoginView = ({
  loading,
  errors,
  onSubmit,
  acceptView,
  handleAcceptTerms,
}) => {
  const [validationStatus, setValidationStatus] = useState({});

  const [terms_acceptance, setTerms_acceptance] = useState(false);

  const validations = {
    username: ["required"],
    password: ["required"],
    // app_key: ["required"],
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
                  {acceptView ? (
                    <div className="py-5">
                      <Row className="g-0">
                        <Col xs="auto">
                          <Input
                            type="checkbox"
                            // labelCheckbox="accept.TyC"
                            name="username"
                            onChange={setTerms_acceptance}
                          />
                        </Col>
                        <Col>
                          <div className="ps-2">
                            <I18N id="accept.TyC1" />
                            <LinkInternal hrefPrecise="tyc" blank>
                              <I18N id="title.TyC" />
                            </LinkInternal>
                            <I18N id="accept.TyC2" />
                          </div>
                        </Col>
                      </Row>

                      <div className="text-center pt-4">
                        <Button
                          color="primary"
                          size="lg"
                          disabled={!terms_acceptance}
                          onClick={handleAcceptTerms}
                        >
                          <I18N id="btn.Enter" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="text-center mb-4">
                        <h1>
                          <I18N id="sign.Title" />
                        </h1>
                        <p className="muted">
                          <I18N id="sign.instruction" />
                        </p>
                      </div>
                      <Form
                        validations={validations}
                        validationStatus={validationStatus}
                        setValidationStatus={setValidationStatus}
                        onSubmit={onSubmit}
                        // format={(dataToSend) => {
                        //   delete dataToSend.appkeyui;
                        //   return dataToSend;
                        // }}
                      >
                        <Input
                          data={dataInitial}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Username"
                          name="username"
                          noSpaces
                          placeholder="form.Username"
                          size="lg"
                          icon="user"
                        />
                        <Input
                          data={dataInitial}
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.Password"
                          name="password"
                          type="password"
                          placeholder="*****"
                          notTranslatePlaceholder
                          size="lg"
                          icon="key"
                          classNameContainer="m-0"
                        />
                        <div className="sign-forgot-pass">
                          <Link href={`/${publicRoutes.forgotPassword.path}`}>
                            <a>
                              <I18N id="sign.ForgotPassword" />
                            </a>
                          </Link>
                        </div>
                        {/* <Input
                          validations={validations}
                          validationStatus={validationStatus}
                          setValidationStatus={setValidationStatus}
                          label="form.KeyApp"
                          name="app_key"
                          placeholder="******"
                          notTranslatePlaceholder
                          notTranslateQuestion
                          question="Si no tenés esta clave, no podrás registrarte. Contacta a los administradores para que te la proporcionen."
                          size="lg"
                          icon="puzzle-piece"
                          classNameContainer="mb-0 mt-4"
                        /> */}
                        <ErrorAlert errors={errors} className="mt-4" />
                        <div className="text-center py-4">
                          <Button color="primary" size="lg" type="submit">
                            <I18N id="btn.Enter" />
                          </Button>
                        </div>
                      </Form>
                      <hr />
                      <div className="text-center">
                        <p className="muted small">
                          <I18N id="sign.IfDontCreateAccount" />
                        </p>
                        <Link href={`/${publicRoutes.signup.path}`}>
                          <Button color="secondary" size="sm" outline>
                            <I18N id="btn.Register" />
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

export default LoginView;
