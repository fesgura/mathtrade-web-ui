import { useState, useEffect } from "react";
import { Form, Input } from "components/form";
import { Button, Alert } from "reactstrap";
import { LoadingBox } from "components/loading";
import ErrorAlert from "components/errorAlert";
import I18N from "i18n";

const ChangePasswordView = ({
  setIsOpenModalPassword,
  onSubmit,
  errors,
  loading,
}) => {
  const [validationStatus, setValidationStatus] = useState({});

  const [passwordValue, setPasswordValue] = useState("");
  const [password2Value, setPassword2Value] = useState("");

  const validations = {
    old_password: ["required"],
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
    <div className="relative py-3 px-4">
      <div className="text-center mb-4">
        <h4>
          <I18N id="form.changePassword.title" />
        </h4>
      </div>
      <Form
        validations={validations}
        validationStatus={validationStatus}
        setValidationStatus={setValidationStatus}
        onSubmit={onSubmit}
        format={(dataToSend) => {
          delete dataToSend.new_password2;
          return dataToSend;
        }}
      >
        <p className="muted text-center">
          <I18N id="form.changePassword.help" />
        </p>
        <Input
          validations={validations}
          validationStatus={validationStatus}
          setValidationStatus={setValidationStatus}
          label="form.Password.old"
          placeholder="******"
          notTranslatePlaceholder
          name="old_password"
          type="password"
          icon="key"
        />
        <hr />
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
          onChange={setPassword2Value}
        />

        <ErrorAlert errors={errors} />
        <Alert color="warning" className="text-center">
          <I18N id="form.changePassword.alert" />
        </Alert>
        <div className="text-center">
          <Button
            className="me-2"
            color="link"
            outline
            onClick={() => {
              setIsOpenModalPassword(false);
            }}
          >
            <I18N id="btn.Cancel" />
          </Button>
          <Button color="secondary" type="submit">
            <I18N id="form.changePassword.btn" />
          </Button>
        </div>
      </Form>
      {loading ? <LoadingBox /> : null}
    </div>
  );
};
export default ChangePasswordView;
