import { useState } from "react";
import Link from "next/link";
import { publicRoutes } from "config/routes";
import PublicLayout from "layouts/public";
import { Card, CardBody, Button, Col, Row, Alert } from "reactstrap";
import { Form, Input } from "components/form";
import I18N from "i18n";
import ErrorAlert from "components/errorAlert";

const ChangePasswordView = ({ loading, errors, onSubmit, step }) => {
  const [validationStatus, setValidationStatus] = useState({});

  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  const validations = {
    new_password: ["required"],
    new_password2: [
      "required",
      function () {
        return passwordValue === password2Value
          ? null
          : "validation.passwordNotMatch";
      },
    ],
  };

  return (
    <PublicLayout loading={loading}>
      <Row className="justify-content-center">
        <Col xl={6} lg={7} md={8} sm={10}>
          <Card>
            <CardBody className="p-5">
              <div className="text-center mb-4">
                <h2>
                  <I18N id="form.changePassword.title" />
                </h2>
                <p className="muted">
                  <I18N id="form.changePassword.login.help" />
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
                  label="form.Password.new"
                  name="new_password"
                  placeholder="******"
                  notTranslatePlaceholder
                  type="password"
                  icon="key"
                  size="lg"
                  onChange={setPasswordValue}
                />
                <Input
                  validations={validations}
                  validationStatus={validationStatus}
                  setValidationStatus={setValidationStatus}
                  label="form.PasswordRepeat.new"
                  name="new_password2"
                  placeholder="******"
                  notTranslatePlaceholder
                  type="password"
                  icon="key"
                  size="lg"
                  onChange={setPassword2Value}
                />
                <ErrorAlert errors={errors} />
                <Alert color="warning" className="text-center">
                  <I18N id="form.changePassword.alert" />
                </Alert>
                <div className="text-center">
                  <Button color="primary" size="lg" type="submit">
                    <I18N id="form.changePassword.btn" />
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

export default ChangePasswordView;
