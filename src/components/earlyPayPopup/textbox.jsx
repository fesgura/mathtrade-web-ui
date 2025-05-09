import I18N from "@/i18n";
import { EARLY_PAY_VALUE } from "@/config/earlyPayValue";

const TextBox = () => {
  return (
    <>
      <p className="mb-4 text-center text-balance">
        <I18N id="EarlyPay.text.1" values={[EARLY_PAY_VALUE]} />
      </p>
      <p className="mb-4 text-center text-balance">
        <I18N id="EarlyPay.text.2" />
      </p>
      <div className="mb-4 bg-primary/10 border border-primary p-4 rounded-lg text-center font-bold text-balance">
        <I18N id="EarlyPay.text.3" />
      </div>
    </>
  );
};

export default TextBox;
