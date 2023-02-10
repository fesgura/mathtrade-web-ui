import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import LoginSlider from "components/pages/loginSlider";
import { Form, Input } from "components/form";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";

const dataInitial = null; //{ username: "math", password: "MeepleLand" };

const validations = {
  username: ["required"],
  password: ["required"],
};

const LoginView = ({ loading, errors, onSubmit }) => {
  const [validationStatus, setValidationStatus] = useState({});

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
                  >
                    <Input
                      data={dataInitial}
                      validations={validations}
                      validationStatus={validationStatus}
                      setValidationStatus={setValidationStatus}
                      label="form.Username"
                      name="username"
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
                    />
                    <ErrorAlert errors={errors} />
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
