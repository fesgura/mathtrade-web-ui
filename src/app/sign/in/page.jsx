"use client";
import { Form, InputContainer, Label, Input } from "@/components/form";
import I18N from "@/i18n";
import useSignIn from "./useSignIn";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_CLIENT_KEY } from "@/config";
import { PUBLIC_ROUTES } from "@/config";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import ChangePassword from "./changePassword";
import Button from "@/components/button";
import Alink from "@/components/link";

/*
lwvaxyuinmpttxsmmv@tpwlb.com
Enero1986

lwvaxyuinmpttxsmmv@tpwlb.com

pablo.david.cazorla@gmail.com
Abril0204

taco.GATO.1812
*/

const SignInPage = () => {
  const {
    validations,
    onSubmit,
    loading,
    error,
    setChangePasswordRequiredToken,
    changePasswordRequiredToken,
    old_password,
  } = useSignIn();

  return (
    <div>
      {changePasswordRequiredToken ? (
        <ChangePassword
          setChangePasswordRequiredToken={setChangePasswordRequiredToken}
          token={changePasswordRequiredToken}
          old_password={old_password}
        />
      ) : (
        <>
          <div className="text-center pb-3">
            <h1 className="text-3xl  font-bold mb-3">
              <I18N id="sign.Title" />
            </h1>
            <p className="text-gray-400">
              <I18N id="sign.instruction" />
            </p>
          </div>
          <Form validations={validations} onSubmit={onSubmit}>
            <fieldset>
              <InputContainer validate="email">
                <Label text="form.Email" name="email" required />
                <Input
                  name="email"
                  type="email"
                  placeholder="form.Email.placeholder"
                  autocomplete="username"
                  ariaLabel="form.Email"
                  icon="email"
                />
              </InputContainer>
              <InputContainer validate="password" className="mb-0">
                <Label text="form.Password" name="password" required />
                <Input
                  name="password"
                  type="password"
                  placeholder="********"
                  noTranslatePlaceholder
                  autocomplete="password"
                  ariaLabel="form.Password"
                  icon="password"
                />
              </InputContainer>
            </fieldset>
            <div className="text-center pt-1 mb-6 text-xs">
              <Alink href={PUBLIC_ROUTES.FORGOT_PASSWORD.path}>
                <I18N id="sign.ForgotPassword" />
              </Alink>
            </div>
            <ErrorAlert error={error} />
            <div className="text-center mb-5">
              <Button ariaLabel="btn.Enter">
                <I18N id="btn.Enter" />
              </Button>
            </div>
          </Form>
          <hr className="my-5" />
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-4">
              <I18N id="sign.IfDontCreateAccount" />
            </p>
            <Button
              tag="link"
              outline
              sm
              color="secondary"
              href={PUBLIC_ROUTES.REGISTER.path}
              ariaLabel="btn.Register"
            >
              <I18N id="btn.Register" />
            </Button>
          </div>
          <LoadingBox loading={loading} />
        </>
      )}
    </div>
  );
};

const GoogleContextProvider = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey={GOOGLE_RECAPTCHA_CLIENT_KEY}
    language="es"
  >
    <SignInPage />
  </GoogleReCaptchaProvider>
);

export default GoogleContextProvider;
