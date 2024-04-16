import { Form, InputContainer, Label, Input } from "@/components/form";
import I18N from "@/i18n";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import useChangePassword from "./useChangePassword";
import Button from "@/components/button";

const ChangePassword = ({
  setChangePasswordRequiredToken,
  token,
  old_password,
}) => {
  const { step, validations, onSubmit, loading, error } = useChangePassword(
    token,
    old_password
  );

  return step === 0 ? (
    <>
      <div className="text-center mb-4">
        <h2 className="text-3xl font-bold mb-3">
          <I18N id="form.changePassword.title" />
        </h2>
        <p className="mb-5 text-gray-600">
          <I18N id="form.changePassword.login.help" />
        </p>
      </div>
      <Form validations={validations} onSubmit={onSubmit}>
        <fieldset>
          <InputContainer validate="new_password">
            <Label text="form.Password.new" name="new_password" required />
            <Input
              name="new_password"
              type="password"
              placeholder="********"
              noTranslatePlaceholder
              autocomplete="new-password"
              ariaLabel="form.Password.new"
              icon="password"
            />
          </InputContainer>
          <InputContainer validate="new_password2" className="mb-4">
            <Label
              text="form.PasswordRepeat.new"
              name="new_password2"
              required
            />
            <Input
              name="new_password2"
              type="password"
              placeholder="********"
              noTranslatePlaceholder
              autocomplete="new-password"
              ariaLabel="form.PasswordRepeat.new"
              icon="password"
            />
          </InputContainer>
        </fieldset>
        <ErrorAlert error={error} />
        <div className="text-center py-3">
          <Button ariaLabel="form.changePassword.btn">
            <I18N id="form.changePassword.btn" />
          </Button>
        </div>
      </Form>
      <LoadingBox loading={loading} />
    </>
  ) : (
    <div className="text-center mb-4">
      <h2 className="mb-3">
        <I18N id="changePassword.ReadyTitle" />
      </h2>
      <p className="muted">
        <I18N id="changePassword.ReadyHelp" />
      </p>
      <Button
        color="secondary"
        onClick={() => {
          setChangePasswordRequiredToken(null);
        }}
      >
        <I18N id="btn.Enter" />
      </Button>
    </div>
  );
};
export default ChangePassword;
