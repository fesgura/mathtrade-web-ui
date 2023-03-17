import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row } from "reactstrap";
import { Form, Input } from "components/form";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";

const LoginView = ({ loading, errors, onSubmit, step }) => {
  const [validationStatus, setValidationStatus] = useState({});

  const validations = {
    target: ["required"],
  };

  return (
    <PublicLayout loading={loading}>
      <Row className="justify-content-center">
        <Col xl={6} lg={7} md={8} sm={10}>
          <Card>
            <CardBody className="p-5">
              {step === 0 ? (
                <>
                  {/* <div className="text-center">
                    <p>
                      De momento, escribinos a{" "}
                      <a href="mailto:mathtradearg@gmail.com">
                        mathtradearg@gmail.com
                      </a>{" "}
                      para pedir el blanqueo de tu contraseña.
                    </p>
                    <p className="m-0">
                      Muy pronto tendremos el flujo de recupero completo y
                      funcional.
                    </p>
                  </div> */}

                  <div className="text-center mb-4">
                    <h2>
                      <I18N id="forgotPassword.title" />
                    </h2>
                    <p className="muted">
                      <I18N id="forgotPassword.help" />
                    </p>
                  </div>
                  <Form
                    onSubmit={onSubmit}
                    validations={validations}
                    validationStatus={validationStatus}
                    setValidationStatus={setValidationStatus}
                  >
                    <Input
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="forgotPassword.usernameOrEmail"
                      name="target"
                      size="lg"
                      icon="user"
                    />
                    <ErrorAlert errors={errors} />
                    <div className="text-center pt-4">
                      <Button color="primary" size="lg" type="submit">
                        <I18N id="forgotPassword.btn" />
                      </Button>
                    </div>
                    <hr />
                    <div className="text-center">
                      <Link href={`/${publicRoutes.signin.path}`}>
                        <Button color="link" size="sm" outline>
                          <I18N id="btn.Cancel" />
                        </Button>
                      </Link>
                    </div>
                  </Form>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <h3 className="mb-4">
                      <I18N id="forgotPassword.title2" />
                    </h3>

                    <p className="muted lead">
                      <I18N id="forgotPassword.ok1" />
                    </p>
                    <p className="muted lead">
                      <I18N id="forgotPassword.ok2" />
                    </p>
                  </div>
                  <hr />
                  <div className="text-center">
                    <Link href={`/${publicRoutes.signin.path}`}>
                      <Button color="primary" ssize="sm">
                        <I18N id="btn.Enter" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PublicLayout>
  );
};

export default LoginView;
