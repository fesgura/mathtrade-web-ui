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
import { Suspense } from "react";

const pausedSite = process.env.PAUSED_SITE;

const SignInContent = () => {
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
          {pausedSite === "yes" ? (
            <div className="text-center text-teal-600 font-bold mb-5 border border-teal-600 rounded-lg p-3">
              <I18N id="paused.site" />
            </div>
          ) : null}
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
                  disabled={pausedSite === "yes"}
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
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
            </fieldset>
            {
              <div className="text-center pt-1 mb-6 text-xs">
                {pausedSite !== "yes" ? (
                  <Alink href={PUBLIC_ROUTES.FORGOT_PASSWORD.path}>
                    <I18N id="sign.ForgotPassword" />
                  </Alink>
                ) : null}
              </div>
            }
            <ErrorAlert error={error} />

            <div className="text-center mb-5">
              <Button ariaLabel="btn.Enter" disabled={pausedSite === "yes"}>
                <I18N id="btn.Enter" />
              </Button>
            </div>
          </Form>
          <hr className="my-5" />
          {pausedSite !== "yes" ? (
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
          ) : null}
          <LoadingBox loading={loading} />
        </>
      )}
    </div>
  );
};

const SignInPage = () => {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
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
