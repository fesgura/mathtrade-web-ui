"use client";
import {
  Form,
  InputContainer,
  Label,
  Input,
  Checkbox,
} from "@/components/form";
import I18N from "@/i18n";
import useSignUp from "./useSignUp";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { GOOGLE_RECAPTCHA_CLIENT_KEY } from "@/config";
import { PUBLIC_ROUTES } from "@/config";
import ErrorAlert from "@/components/errorAlert";
import { LoadingBox } from "@/components/loading";
import Button from "@/components/button";
import HelpContext from "@/components/help-context";
import { rulebookPDFurl } from "@/config/rulebook";

const baseURL = process.env.BASE_URL;

const pausedSite = process.env.PAUSED_SITE;

const SignUpPage = () => {
  const {
    validations,
    formatTypes,
    onSubmit,
    loading,
    errorRegister,
    errorBGG,
    isSuccess,
    dataInitial,
  } = useSignUp();

  return (
    <div className="pt-xs-5 pb-xs-4 px-xs-6 p-4">
      {isSuccess ? (
        <div className="text-center fade-in">
          <h2 className="text-3xl font-bold mb-3">
            <I18N id="register.ReadyTitle" />
          </h2>
          <p className="mb-5 text-gray-800">
            <I18N id="register.ReadySubtitle" />
          </p>
          <Button
            tag="link"
            href={PUBLIC_ROUTES.SIGN_IN.path}
            ariaLabel="btn.Enter"
          >
            <I18N id="btn.Enter" />
          </Button>
        </div>
      ) : (
        <>
          <div className="text-center">
            <h1 className="text-3xl  font-bold mb-3">
              <I18N id="register.Title" />
            </h1>
            <p className="mb-5 text-gray-400">
              <I18N id="register.Subtitle" />
            </p>
          </div>
          {pausedSite === "yes" ? (
            <div className="text-center text-teal-600 font-bold mb-5 border border-teal-600 rounded-lg p-3">
              <I18N id="paused.site" />
            </div>
          ) : null}
          <Form
            validations={validations}
            formatTypes={formatTypes}
            onSubmit={onSubmit}
            showTopAlert
          >
            <fieldset>
              <legend className="text-center py-4 font-bold block w-full border-t border-t-gray-200">
                <I18N id="register.EnterData" />
              </legend>
              <InputContainer validate="email" className="mb-1">
                <Label text="form.Email" name="email" required />
                <Input
                  data={dataInitial}
                  name="email"
                  type="email"
                  placeholder="form.Email.placeholder"
                  ariaLabel="form.Email"
                  icon="email"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <p className="text-xs text-gray-500 text-center mb-5">
                <I18N id="form.Email.help" />
              </p>
              <InputContainer validate="referral_code" className="mb-1">
                <Label text="form.ReferralCode" name="referral_code" required />
                <Input
                  data={dataInitial}
                  name="referral_code"
                  placeholder="form.ReferralCode.placeholder"
                  ariaLabel="form.ReferralCode"
                  icon="password"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <p className="text-xs text-gray-500 text-center mb-5">
                <I18N id="form.ReferralCode.help" />
              </p>
            </fieldset>
            <fieldset>
              <legend className="text-center py-4 font-bold block w-full border-t border-t-gray-200">
                <I18N id="register.AccountData" />
              </legend>
              <InputContainer validate="first_name">
                <Label text="form.FirstName" name="first_name" required />
                <Input
                  name="first_name"
                  placeholder="form.FirstName.placeholder"
                  ariaLabel="form.FirstName"
                  icon="user"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <InputContainer validate="last_name">
                <Label text="form.LastName" name="last_name" required />
                <Input
                  name="last_name"
                  placeholder="form.LastName.placeholder"
                  ariaLabel="form.LastName"
                  icon="user"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <InputContainer validate="phone">
                <Label text="form.Phone" name="phone" required />
                <Input
                  name="phone"
                  type="tel"
                  placeholder="form.Phone.placeholder"
                  ariaLabel="form.Phone"
                  icon="phone"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <InputContainer className="mb-1">
                <Label text="form.Telegram.user" name="telegram" />
                <Input
                  name="telegram"
                  placeholder="form.Telegram.user.placeholder"
                  ariaLabel="form.Telegram.user"
                  icon="telegram"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <p className="text-xs text-gray-700 text-center mb-5 text-balance">
                <I18N id="form.Telegram.ad" />
              </p>
            </fieldset>
            <fieldset>
              <legend className="text-center py-4 font-bold block w-full border-t border-t-gray-200">
                <I18N id="register.BGGdata" />
              </legend>
              <InputContainer
                validate="bgg_user"
                error={errorBGG}
                className="mb-1"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Label text="form.BGGuser" name="bgg_user" required />
                  <HelpContext id="forWhatIsThis.bgg_user" />
                </div>
                <Input
                  name="bgg_user"
                  placeholder="form.BGGuser.placeholder"
                  ariaLabel="form.BGGuser"
                  icon="bgg"
                  disabled={pausedSite === "yes"}
                />
              </InputContainer>
              <p className="text-xs text-gray-500 text-center mb-5">
                <I18N id="form.BGGuser.help" />
              </p>
            </fieldset>
            <hr className="mb-5" />
            <InputContainer validate="terms_acceptance" className="mb-6">
              <Checkbox
                name="terms_acceptance"
                required
                ariaLabel="title.TyC"
                disabled={pausedSite === "yes"}
              >
                <I18N id="accept.TyC1" />
                <a
                  href={PUBLIC_ROUTES.TERMS_CONDITIONS.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary-hover"
                >
                  <I18N id="title.TyC" />
                </a>
                <I18N id="accept.TyC2" />
                <a
                  href={baseURL + rulebookPDFurl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary-hover"
                >
                  <I18N id="title.Rulebook" />
                </a>
                <I18N id="accept.TyC3" />
              </Checkbox>
            </InputContainer>
            <ErrorAlert error={errorRegister} />
            <div className="text-center mb-5">
              <Button ariaLabel="btn.SignUp" disabled={pausedSite === "yes"}>
                <I18N id="btn.SignUp" />
              </Button>
            </div>
          </Form>
          <hr className="my-5" />
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-4">
              <I18N id="register.AlreadyHaveAccount" />
            </p>
            <Button
              tag="link"
              href={PUBLIC_ROUTES.SIGN_IN.path}
              outline
              sm
              color="secondary"
              ariaLabel="btn.Enter"
            >
              <I18N id="btn.Enter" />
            </Button>
          </div>
        </>
      )}
      <LoadingBox loading={loading} />
    </div>
  );
};

const GoogleContextProvider = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey={GOOGLE_RECAPTCHA_CLIENT_KEY}
    language="es"
  >
    <SignUpPage />
  </GoogleReCaptchaProvider>
);

export default GoogleContextProvider;
