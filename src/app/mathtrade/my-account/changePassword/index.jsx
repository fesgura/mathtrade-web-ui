import { Form, InputContainer, Label, Input } from "@/components/form";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import Button from "@/components/button";
import Modal from "@/components/modal";
import I18N from "@/i18n";
import useChangePassword from "./useChangePassword";
import SuccessAlert from "@/components/successAlert";

const ChangePassword = () => {
  const {
    open,
    toggleOpen,
    validations,
    onSubmit,
    loading,
    error,
    showSuccess,
  } = useChangePassword();

  return (
    <>
      <button
        className="text-xs text-danger underline hover:text-red-900"
        onClick={toggleOpen}
      >
        <I18N id="form.changePassword.btn" />
      </button>
      <Modal isOpen={open} onClose={toggleOpen} size="sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-3">
            <I18N id="form.changePassword.title" />
          </h2>
        </div>
        <Form validations={validations} onSubmit={onSubmit}>
          <fieldset>
            <InputContainer validate="old_password">
              <Label text="form.Password.old" name="old_password" required />
              <Input
                name="old_password"
                type="password"
                placeholder="********"
                noTranslatePlaceholder
                autocomplete="password"
                ariaLabel="form.Password.old"
                icon="password"
              />
            </InputContainer>
            <hr className="mb-3 border-gray-300" />
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
          {showSuccess ? (
            <SuccessAlert text="form.changePassword.success" />
          ) : null}
          <div className="text-center py-3">
            <Button ariaLabel="form.changePassword.btn">
              <I18N id="form.changePassword.btn" />
            </Button>
          </div>
        </Form>
        <LoadingBox loading={loading} />
      </Modal>
    </>
  );
};
export default ChangePassword;
