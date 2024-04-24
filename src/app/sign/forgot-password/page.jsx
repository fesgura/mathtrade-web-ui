"use client";
import { Form, InputContainer, Label, Input } from "@/components/form";
import I18N from "@/i18n";
import useForgotPassword from "./useForgotPassword";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import Question from "@/components/question";
import { PUBLIC_ROUTES } from "@/config";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_CLIENT_KEY } from "@/config";
import Button from "@/components/button";

const ForgotPasswordPage = () => {
  const { step, validations, onSubmit, loading, error } = useForgotPassword();

  return (
    <div>
      {step === 0 ? (
        <>
          <div className="text-center">
            <h1 className="text-3xl  font-bold mb-3">
              <I18N id="forgotPassword.title" />
            </h1>
            <p className="mb-5 text-gray-400">
              <I18N id="forgotPassword.help" />
            </p>
          </div>
          <Form validations={validations} onSubmit={onSubmit}>
            <fieldset>
              <InputContainer validate="target">
                <Label text="form.Email" name="target" required />
                <Input
                  name="target"
                  type="email"
                  placeholder="form.Email.placeholder"
                  autocomplete="username"
                  ariaLabel="form.Email"
                  icon="email"
                />
              </InputContainer>
            </fieldset>
            <ErrorAlert error={error} />
            <div className="text-center py-3">
              <Button ariaLabel="forgotPassword.btn">
                <I18N id="forgotPassword.btn" />
              </Button>
            </div>
          </Form>
          <hr className="my-5" />
          <div className="text-center">
            <Button
              tag="link"
              href={PUBLIC_ROUTES.SIGN_IN.path}
              color="cancel"
              sm
              outline
              ariaLabel="btn.Cancel"
            >
              <I18N id="btn.Cancel" />
            </Button>
          </div>
          <LoadingBox loading={loading} />
        </>
      ) : (
        <div className="text-center">
          <h3 className="text-3xl  font-bold mb-3">
            <I18N id="forgotPassword.title2" />
          </h3>

          <p className="mb-5 text-gray-600">
            <I18N id="forgotPassword.ok1" />
          </p>
          <p className="mb-5 text-gray-600">
            <I18N id="forgotPassword.ok2" />
          </p>
          <hr className="my-5" />
          <Button
            tag="link"
            href={PUBLIC_ROUTES.SIGN_IN.path}
            color="secondary"
            ariaLabel="btn.Enter"
          >
            <I18N id="btn.Enter" />
          </Button>
        </div>
      )}
    </div>
  );
};

const GoogleContextProvider = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey={GOOGLE_RECAPTCHA_CLIENT_KEY}
    language="es"
  >
    <ForgotPasswordPage />
  </GoogleReCaptchaProvider>
);
export default GoogleContextProvider;
