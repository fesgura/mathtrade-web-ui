import I18N from "@/i18n";

// Google lets us hide the floating reCAPTCHA badge (src/styles/common.scss)
// as long as every form that uses it shows this notice instead.
const RecaptchaNotice = () => (
  <p className="text-center text-xs text-gray-500 mt-2 mb-3 text-balance">
    <I18N id="recaptcha.notice" />
  </p>
);

export default RecaptchaNotice;
